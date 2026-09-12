import type { PostHog } from "posthog-js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  captureExperience,
  clearExperience,
  mirrorExperienceConsent,
} from "./marketing-experience-client";

const client = {
  capture: vi.fn(),
  register: vi.fn(),
  unregister: vi.fn(),
  get_distinct_id: () => "anonymous-test",
  has_opted_out_capturing: vi.fn(() => false),
};
const posthog = client as unknown as PostHog;
beforeEach(() => {
  vi.clearAllMocks();
  client.has_opted_out_capturing.mockReturnValue(false);
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 200 }));
  clearExperience(posthog);
  mirrorExperienceConsent(true);
});
afterEach(() => vi.unstubAllGlobals());
describe("exposure and consent", () => {
  it("records the displayed variant only after the signed handoff succeeds and deduplicates renders", async () => {
    await captureExperience(posthog, "new");
    await captureExperience(posthog, "new");
    expect(client.capture).toHaveBeenCalledTimes(1);
    expect(client.capture.mock.calls[0][0]).toBe("marketing_experience_viewed");
    expect(client.capture.mock.calls[0][1]).toHaveProperty(
      "$feature/marketing-experience-v1",
      "new",
    );
  });
  it("does not enroll visitors whose handoff fails", async () => {
    vi.mocked(fetch).mockResolvedValue({ status: 204 } as Response);
    await captureExperience(posthog, "control");
    expect(client.capture.mock.calls.map((call) => call[0])).toEqual([
      "marketing_experience_handoff_failed",
    ]);
  });
  it("handles withdrawal while a handoff request is pending", async () => {
    let resolve!: (value: Response) => void;
    vi.mocked(fetch).mockReturnValueOnce(
      new Promise((r) => {
        resolve = r;
      }),
    );
    const capture = captureExperience(posthog, "new");
    mirrorExperienceConsent(false);
    client.has_opted_out_capturing.mockReturnValue(true);
    resolve({ status: 200 } as Response);
    await capture;
    expect(client.capture).not.toHaveBeenCalled();
  });
});
