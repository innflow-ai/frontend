type SessionStatus = {
  authenticated?: unknown;
  redirectTo?: unknown;
};

export function isMarketingHostname(
  hostname: string,
  marketingOrigin: string,
): boolean {
  try {
    const configuredHostname = new URL(marketingOrigin).hostname;
    const apexHostname = configuredHostname.replace(/^www\./, "");

    return hostname === apexHostname || hostname === `www.${apexHostname}`;
  } catch {
    return false;
  }
}

export function resolveAuthenticatedRedirect(
  data: SessionStatus,
  appOrigin: string,
): string | null {
  if (data.authenticated !== true || typeof data.redirectTo !== "string") {
    return null;
  }

  try {
    const allowedOrigin = new URL(appOrigin).origin;
    const destination = new URL(data.redirectTo, `${allowedOrigin}/`);

    if (
      destination.origin !== allowedOrigin ||
      destination.username ||
      destination.password
    ) {
      return null;
    }

    return destination.toString();
  } catch {
    return null;
  }
}
