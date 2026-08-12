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

To show production aggregates inside `/#/admin`, also add these server-only
Vercel environment variables:

```text
ADMIN_PASSWORD=preview-admin-2026
POSTHOG_API_HOST=https://eu.posthog.com
POSTHOG_PROJECT_ID=your_project_id
POSTHOG_PERSONAL_API_KEY=your_posthog_personal_api_key
```

`POSTHOG_PERSONAL_API_KEY` must only be used by the Vercel serverless function.
Do not prefix it with `VITE_`.
