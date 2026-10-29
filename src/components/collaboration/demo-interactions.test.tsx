import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ChannelButton,
  ChannelHeading,
  ChannelMessages,
  ChatDemo,
  DemoComposer,
  EmailPreview,
} from "./demo-interactions";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("local HTML demo interactions", () => {
  it("keeps messages when the scroll panel is hidden and never sends them to a service", () => {
    const request = vi.fn();
    vi.stubGlobal("fetch", request);
    const { rerender } = render(
      <div hidden={false}>
        <DemoComposer label="iMessage" imessage />
      </div>,
    );
    expect(
      screen.getByRole("button", { name: "Add message to iMessage demo" }),
    ).toBeDisabled();
    fireEvent.change(screen.getByRole("textbox", { name: "iMessage" }), {
      target: { value: "  Keep my draft  " },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Add message to iMessage demo" }),
    );
    expect(screen.getByRole("textbox", { name: "iMessage" })).toHaveValue("");
    rerender(
      <div hidden>
        <DemoComposer label="iMessage" imessage />
      </div>,
    );
    rerender(
      <div hidden={false}>
        <DemoComposer label="iMessage" imessage />
      </div>,
    );
    expect(screen.getByRole("log")).toHaveTextContent("Keep my draft");
    expect(request).not.toHaveBeenCalled();
  });

  it("changes the conversation along with the selected channel", () => {
    render(
      <ChatDemo>
        <ChannelButton channel="data-analysis">Data</ChannelButton>
        <ChannelButton channel="sales-discussion">Sales</ChannelButton>
        <h3>
          <ChannelHeading />
        </h3>
        <ChannelMessages>Original analysis conversation</ChannelMessages>
      </ChatDemo>,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Open sales-discussion channel" }),
    );
    expect(screen.getByRole("heading")).toHaveTextContent("sales-discussion");
    expect(
      screen.getByText(/Which opportunities need a follow-up/),
    ).toBeVisible();
    expect(
      screen.queryByText("Original analysis conversation"),
    ).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Open data-analysis channel" }),
    );
    expect(screen.getByText("Original analysis conversation")).toBeVisible();
  });

  it("expands and collapses the full email without navigating away", () => {
    render(
      <EmailPreview label="Read example email" body="The full message body">
        Preview
      </EmailPreview>,
    );
    const button = screen.getByRole("button", { name: "Read example email" });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("The full message body")).toBeVisible();
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("The full message body")).not.toBeInTheDocument();
  });
});
