type AnalyticsProperties = Record<string, boolean | number | string | null | undefined>;
type PostHogClient = typeof import("posthog-js").default;

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";
const POSTHOG_DASHBOARD_URL = import.meta.env.VITE_POSTHOG_DASHBOARD_URL || "";

export const analyticsStatus = {
  dashboardUrl: POSTHOG_DASHBOARD_URL,
  enabled: Boolean(POSTHOG_KEY),
  host: POSTHOG_HOST,
  provider: "PostHog"
};

let posthogClient: Promise<PostHogClient> | null = null;

if (POSTHOG_KEY) {
  posthogClient = import("posthog-js").then(({ default: posthog }) => {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      autocapture: false,
      capture_pageview: false,
      persistence: "localStorage"
    });

    return posthog;
  });
}

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (!analyticsStatus.enabled) {
    return;
  }

  void posthogClient?.then((posthog) => {
    posthog.capture(eventName, {
      app: "swedencivicsprep",
      environment: import.meta.env.MODE,
      ...compactProperties(properties)
    });
  });
}

export function trackPageView(routeName: string, properties: AnalyticsProperties = {}) {
  trackEvent("page_viewed", {
    route: routeName,
    path: window.location.hash || "#/",
    ...properties
  });
}

function compactProperties(properties: AnalyticsProperties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
}
