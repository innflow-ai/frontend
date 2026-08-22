"use client";

import { useEffect } from "react";
import {
  isMarketingHostname,
  resolveAuthenticatedRedirect,
} from "@/lib/auth-redirect";

type AuthenticatedHomeRedirectProps = {
  appOrigin: string;
  marketingOrigin: string;
};

export function AuthenticatedHomeRedirect({
  appOrigin,
  marketingOrigin,
}: AuthenticatedHomeRedirectProps) {
  useEffect(() => {
    if (!isMarketingHostname(window.location.hostname, marketingOrigin)) return;

    const controller = new AbortController();

    async function redirectAuthenticatedUser() {
      try {
        const response = await fetch(
          new URL("/api/session/status", appOrigin),
          {
            cache: "no-store",
            credentials: "include",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          },
        );

        if (!response.ok) return;

        const destination = resolveAuthenticatedRedirect(
          await response.json(),
          appOrigin,
        );

        if (destination) window.location.replace(destination);
      } catch {}
    }

    void redirectAuthenticatedUser();
    return () => controller.abort();
  }, [appOrigin, marketingOrigin]);

  return null;
}
