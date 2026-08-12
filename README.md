# swedencivicsprep

## Analytics setup

The app has PostHog event tracking wired behind Vite environment variables.
Tracking stays disabled until `VITE_POSTHOG_KEY` is set.

For Vercel, add:

```text
VITE_POSTHOG_KEY=your_posthog_project_key
VITE_POSTHOG_HOST=https://eu.i.posthog.com
VITE_POSTHOG_DASHBOARD_URL=https://eu.posthog.com/project/...
```

The hidden admin preview is available at `/#/admin`. It uses a lightweight
static password gate for now, so do not put private analytics API keys in the
frontend.
