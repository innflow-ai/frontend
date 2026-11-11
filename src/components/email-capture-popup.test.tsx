import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  EMAIL_CAPTURE_STORAGE_KEY,
  isEmailCaptureExcluded,
  isEmailCaptureSuppressed,
} from "@/config/email-capture";
import { siteConfig } from "@/config/site";
import { EmailCapturePopup } from "./email-capture-popup";
import { EmailCaptureSlot } from "./email-capture-slot";

const route = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({
  usePathname: () => route.value,
}));

function setScroll(scrollY: number, innerHeight: number, scrollHeight: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: scrollY,
  });
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: innerHeight,
  });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: scrollHeight,
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  route.value = "/";
  localStorage.clear();
  setScroll(0, 800, 5000);
  Reflect.deleteProperty(window, "gtag");
  Reflect.deleteProperty(window, "dataLayer");
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it("stays off pricing, login, signup, legal, and checkout paths", () => {
  expect(isEmailCaptureExcluded("/pricing")).toBe(true);
  expect(isEmailCaptureExcluded("/pricing/")).toBe(true);
  expect(isEmailCaptureExcluded("/login")).toBe(true);
  expect(isEmailCaptureExcluded("/signup/start")).toBe(true);
  expect(isEmailCaptureExcluded("/legal/privacy-policy")).toBe(true);
  expect(isEmailCaptureExcluded("/plans/checkout")).toBe(true);
  expect(isEmailCaptureExcluded("/")).toBe(false);
  expect(isEmailCaptureExcluded("/products/platform")).toBe(false);
});

it("hides a dismissal for 14 days and a submission for good", () => {
  const now = Date.parse("2026-11-11T12:00:00Z");
  expect(
    isEmailCaptureSuppressed(
      { status: "dismissed", at: now - 13 * 86400000 },
      now,
    ),
  ).toBe(true);
  expect(
    isEmailCaptureSuppressed(
      { status: "dismissed", at: now - 15 * 86400000 },
      now,
    ),
  ).toBe(false);
  expect(isEmailCaptureSuppressed({ status: "submitted", at: 0 }, now)).toBe(
    true,
  );
});

it("opens after about half the page is scrolled", () => {
  render(<EmailCapturePopup />);
  expect(screen.queryByRole("dialog")).toBeNull();
  setScroll(440, 800, 1800);
  fireEvent.scroll(window);
  expect(screen.queryByRole("dialog")).toBeNull();
  setScroll(450, 800, 1800);
  fireEvent.scroll(window);
  expect(
    screen.getByRole("dialog", { name: "A note when it matters." }),
  ).toBeInTheDocument();
  expect(screen.getByLabelText("Email address")).toBeInTheDocument();
});

it("opens after 20 seconds when the page has not been scrolled", () => {
  render(<EmailCapturePopup />);
  act(() => {
    vi.advanceTimersByTime(19_999);
  });
  expect(screen.queryByRole("dialog")).toBeNull();
  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

it("remembers a dismissal and restores focus on Escape", () => {
  render(
    <>
      <button type="button">Page action</button>
      <EmailCapturePopup />
    </>,
  );
  setScroll(900, 800, 1800);
  fireEvent.scroll(window);
  const pageAction = screen.getByRole("button", { name: "Page action" });
  pageAction.focus();
  const email = screen.getByLabelText("Email address");
  email.focus();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("dialog")).toBeNull();
  const stored = JSON.parse(
    localStorage.getItem(EMAIL_CAPTURE_STORAGE_KEY) ?? "{}",
  );
  expect(stored.status).toBe("dismissed");
  expect(pageAction).toHaveFocus();
});

it("saves the address through the newsletter route and emits one event", async () => {
  const fetchMock = vi.fn().mockResolvedValue(Response.json({ success: true }));
  vi.stubGlobal("fetch", fetchMock);
  const gtag = vi.fn();
  Object.assign(window, { gtag });
  render(<EmailCapturePopup />);
  setScroll(900, 800, 1800);
  fireEvent.scroll(window);
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "person@example.com" },
  });
  fireEvent.submit(
    screen.getByRole("dialog").querySelector("form") as HTMLFormElement,
  );
  await act(async () => {
    await Promise.resolve();
  });
  expect(fetchMock).toHaveBeenCalledWith(
    "/api/newsletter",
    expect.objectContaining({ method: "POST" }),
  );
  expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
    email: "person@example.com",
  });
  expect(gtag).toHaveBeenCalledTimes(1);
  expect(gtag).toHaveBeenCalledWith("event", "email_capture_submitted", {
    send_to: siteConfig.analytics.googleAnalyticsId,
  });
  expect(
    JSON.parse(localStorage.getItem(EMAIL_CAPTURE_STORAGE_KEY) ?? "{}").status,
  ).toBe("submitted");
  expect(screen.getByRole("status")).toHaveTextContent("You’re on the list.");
});

it("does not emit the event when signup fails", async () => {
  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockResolvedValue(
        Response.json(
          { error: "Enter a valid email address." },
          { status: 400 },
        ),
      ),
  );
  const gtag = vi.fn();
  Object.assign(window, { gtag });
  render(<EmailCapturePopup />);
  setScroll(900, 800, 1800);
  fireEvent.scroll(window);
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "person@example.com" },
  });
  fireEvent.submit(
    screen.getByRole("dialog").querySelector("form") as HTMLFormElement,
  );
  await act(async () => {
    await Promise.resolve();
  });
  expect(gtag).not.toHaveBeenCalled();
  expect(screen.getByRole("status")).toHaveTextContent(
    "Enter a valid email address.",
  );
  expect(localStorage.getItem(EMAIL_CAPTURE_STORAGE_KEY)).toBeNull();
});

it("does not load the card on an excluded page", async () => {
  route.value = "/pricing";
  render(<EmailCaptureSlot />);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(21_000);
  });
  expect(screen.queryByRole("dialog")).toBeNull();
});
