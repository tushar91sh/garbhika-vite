# Garbhika frontend

React, Vite, Redux Toolkit and Tailwind. Read ../SETUP_AUTH_AND_DASHBOARDS.md for configuration, authentication flows and dashboard tabs.

```bash
npm install
npm run dev
npm run build
```

Development proxies /api to localhost:5000. For a separate production API, set VITE_API_URL to the backend origin ending in /api before building. Never put admin or Brevo credentials into frontend environment variables. Configure hosting fallback to index.html for application routes.
