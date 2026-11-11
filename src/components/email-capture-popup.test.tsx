import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  activeEmailCaptureVariant,
  EMAIL_CAPTURE_SESSION_KEY,
  EMAIL_CAPTURE_STORAGE_KEY,
  isEmailCaptureExcluded,
  isEmailCaptureSuppressed,
} from "@/config/email-capture";
import { siteConfig } from "@/config/site";
import { fixedBottomBannerHeight } from "@/lib/email-capture-placement";
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
  sessionStorage.clear();
  setScroll(0, 800, 5000);
  Reflect.deleteProperty(window, "gtag");
  Reflect.deleteProperty(window, "dataLayer");
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it("enables only the newsletter card, even if the promo switch is also on", () => {
  expect(activeEmailCaptureVariant()).toBe("newsletter");
  expect(
    activeEmailCaptureVariant({
      newsletterEnabled: true,
      upsellEnabled: true,
    }),
  ).toBe("newsletter");
  expect(
    activeEmailCaptureVariant({
      newsletterEnabled: false,
      upsellEnabled: true,
    }),
  ).toBe("upsell");
  expect(
    activeEmailCaptureVariant({
      newsletterEnabled: false,
      upsellEnabled: false,
    }),
  ).toBeNull();
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

it("hides a dismissal or a submission for 30 days", () => {
  const now = Date.parse("2026-11-11T12:00:00Z");
  const recent = now - 29 * 86400000;
  const expired = now - 31 * 86400000;
  expect(
    isEmailCaptureSuppressed({ status: "dismissed", at: recent }, now),
  ).toBe(true);
  expect(
    isEmailCaptureSuppressed({ status: "dismissed", at: expired }, now),
  ).toBe(false);
  expect(
    isEmailCaptureSuppressed({ status: "submitted", at: recent }, now),
  ).toBe(true);
  expect(
    isEmailCaptureSuppressed({ status: "submitted", at: expired }, now),
  ).toBe(false);
});

it("opens after about half the page is scrolled", () => {
  render(<EmailCapturePopup />);
  expect(screen.queryByRole("dialog")).toBeNull();
  setScroll(390, 800, 1800);
  fireEvent.scroll(window);
  expect(screen.queryByRole("dialog")).toBeNull();
  setScroll(400, 800, 1800);
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

it("saves the address through the email capture route and emits one event", async () => {
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
    "/api/email-capture",
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

it("shows at most once in a session", () => {
  const first = render(<EmailCapturePopup />);
  setScroll(900, 800, 1800);
  fireEvent.scroll(window);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(sessionStorage.getItem(EMAIL_CAPTURE_SESSION_KEY)).toBe("1");
  first.unmount();
  render(<EmailCapturePopup />);
  fireEvent.scroll(window);
  expect(screen.queryByRole("dialog")).toBeNull();
});

it("links the campaign card to the pricing offer", () => {
  render(<EmailCapturePopup variant="upsell" />);
  setScroll(900, 800, 1800);
  fireEvent.scroll(window);
  const link = screen.getByRole("link", { name: "See pricing" });
  expect(link).toHaveAttribute("href", "/pricing?ref=email-capture");
  expect(screen.getByRole("dialog")).toHaveAttribute("data-variant", "upsell");
  expect(screen.getByRole("dialog")).toHaveTextContent("Get 63% off now");
  expect(screen.queryByLabelText("Email address")).toBeNull();
  fireEvent.click(link);
  expect(
    JSON.parse(localStorage.getItem(EMAIL_CAPTURE_STORAGE_KEY) ?? "{}").status,
  ).toBe("submitted");
});

it("stacks the card above a fixed bottom banner", () => {
  const banner = document.createElement("div");
  banner.dataset.bottomBanner = "";
  banner.style.position = "fixed";
  banner.style.height = "64px";
  banner.style.width = "1000px";
  document.body.append(banner);
  vi.spyOn(banner, "getBoundingClientRect").mockReturnValue({
    x: 0,
    y: 736,
    top: 736,
    left: 0,
    right: 1000,
    bottom: 800,
    width: 1000,
    height: 64,
    toJSON: () => ({}),
  });
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: 1000,
  });
  expect(fixedBottomBannerHeight()).toBe(64);
  render(<EmailCapturePopup />);
  setScroll(900, 800, 1800);
  fireEvent.scroll(window);
  expect(screen.getByRole("dialog")).toHaveStyle({ bottom: "84px" });
  banner.remove();
});

it("does not load the card on an excluded page", async () => {
  route.value = "/pricing";
  render(<EmailCaptureSlot />);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(21_000);
  });
  expect(screen.queryByRole("dialog")).toBeNull();
});
