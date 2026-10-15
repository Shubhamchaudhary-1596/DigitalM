# Webzoneo website and content platform

This repository contains the public Webzoneo website, an administrator dashboard, and an Express/MongoDB API.

## Repository layout

- `my-project/` — public React/Vite website, service pages, editorial pages and contact form.
- `admin/` — separate authenticated dashboard for blog posts, services, portfolio case studies and contact enquiries.
- `server/` — Express API, MongoDB persistence, configured administrator login, public content endpoints and protected content-management endpoints.
- `docs/END_TO_END_AUDIT.md` — issue discovery method, findings, fix rationale and verification checklist.
- `docs/DEPLOYMENT.md` — environment setup, build, deployment, smoke-test and rollback instructions.

## Local development

Use Node.js 20 or newer and a reachable MongoDB instance.

1. Install dependencies in each project directory:
   ```bash
   cd server && npm install
   cd ../my-project && npm install
   cd ../admin && npm install
   ```
2. Copy each `.env.example` to a private `.env` file as appropriate. Never commit real secrets. Set `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` and `CORS_ORIGINS` in the server environment. Set `VITE_API_URL` in each frontend if the API is not reverse-proxied under the same origin.
3. Run the starter seed once from `server/` after checking the database and taking a backup:
   ```bash
   npm run seed
   ```
   It only inserts starter services/articles when the corresponding collections are empty. Review content before publication.
4. Start the API with `cd server && npm run dev`, the public site with `cd my-project && npm run dev`, and the dashboard with `cd admin && npm run dev`.
5. The dashboard login uses the configured `ADMIN_EMAIL` and bcrypt hash. Public registration and password reset are not enabled.

## Checks

- `cd server && npm test` — validator unit tests.
- `cd my-project && npm run lint && npm run build`
- `cd admin && npm run lint && npm run build`

A CI workflow is included in `.github/workflows/ci.yml`. Do not merge or deploy until CI and the production smoke-test checklist pass.

## Important release notes

- Do not deploy directly to the live VPS from an unreviewed branch.
- Contact enquiries are stored in MongoDB; SMTP notification delivery requires the SMTP environment variables.
- The admin API protects blog/service writes and the contact inbox with a signed, expiring JWT.
- Password reset requires a separate secure reset-token and email workflow and is intentionally unavailable until implemented.
- Keep verified business contact details, customer testimonials and case-study evidence accurate; do not publish unsupported metrics.
