# DigitalM deployment and verification guide

This guide documents a safe release flow for the existing `my-project/`, `admin/`, and `server/` applications. It assumes the existing Ubuntu VPS deployment pattern uses Nginx, Certbot, PM2, and a Node.js API. Verify the actual paths, process names, domains and ports on the server before running commands.

## 1. Pre-deployment checks

1. Confirm the intended branch/commit and review the diff.
2. SSH into the VPS and inspect the current deployment before changing anything:
   ```bash
   cd /var/www/DigitalM
   git status --short
   git branch --show-current
   git log -5 --oneline
   pm2 list
   sudo nginx -T
   ```
3. Back up the current deployment configuration and database using the established backup process.
4. Never paste real secrets into GitHub, documentation, chat, or terminal screenshots.

## 2. Environment variables

Create private environment files on the server from the checked-in example templates. At minimum, review:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET` (long, random, private value)
- `ADMIN_SETUP_KEY` (one-time initial administrator setup secret; rotate/remove after use)
- `CORS_ORIGINS` (comma-separated exact trusted frontend origins)
- `VITE_API_URL` for each Vite build, if the frontend is served separately from the API
- email provider settings before enabling email notifications or password resets

Vite variables prefixed with `VITE_` are embedded in the client bundle and must never contain secrets.

## 3. Configure administrator credentials and seed starter content

- Set `ADMIN_EMAIL` to the intended administrator account.
- Generate a bcrypt hash for a strong password in a trusted shell. This prompts without echoing the password; copy only the resulting hash into the private ADMIN_PASSWORD_HASH environment variable:

```bash
read -s -p "Initial admin password: " ADMIN_INITIAL_PASSWORD; echo
export ADMIN_INITIAL_PASSWORD
node -e "require('bcryptjs').hash(process.env.ADMIN_INITIAL_PASSWORD, 12).then(console.log)"
unset ADMIN_INITIAL_PASSWORD
```

Avoid putting plaintext credentials in source control, shared logs or shell command arguments.
- Generate a long random JWT secret, for example with `openssl rand -base64 48`, and store it as JWT_SECRET. Restart the API after updating the environment.
- After verifying the MongoDB URI and taking a backup, run `npm run seed` once from `server/`. The seed command inserts starter services and editorial articles only when those collections are empty; it skips non-empty collections. Review all starter content in the admin UI before treating it as approved publication copy.
- Configure SMTP values if email notifications are required. Contact records are still saved when SMTP is not configured, but the API logs that notifications are unavailable.

## 4. Build and lint

Run in each project directory:
```bash
cd /var/www/DigitalM/my-project
npm ci
npm run lint
npm run build

cd /var/www/DigitalM/admin
npm ci
npm run lint
npm run build

cd /var/www/DigitalM/server
npm ci
npm test --if-present
```
Because this repair reconciles dependency manifests from two previously conflicting versions, run `npm install` once in each project directory and review/commit the regenerated `package-lock.json` files before production. After the manifests and lockfiles match, use `npm ci` for repeatable releases. Do not run `npm ci` against stale lockfiles or ignore build/lint errors.

## 5. API smoke tests

Use the actual production API origin and never send real customer data during smoke tests:
```bash
curl -i https://api2.webzoneo.com/api/health
```
For protected routes, confirm an unauthenticated request returns `401` or `403`. For contact submissions, use a dedicated test address and confirm a persisted record plus configured notification delivery. Do not consider a `201` response alone proof that email delivery worked.

### Public API proxy

If the public frontend and API share the same domain, the Webzoneo public site's Nginx server block must proxy API paths to the Express process (verify the actual upstream port and preserve any existing location directives):

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

The admin frontend can use the same proxy if it is served from the same origin; otherwise set its public `VITE_API_URL` to the API origin and ensure that origin is included in `CORS_ORIGINS`. The Vite configs proxy `/api` to local port 5000 during development.

## 6. Deploy frontend

Build the Vite apps and deploy their `dist/` directories using the existing Nginx site configuration. Confirm SPA fallback routing is configured for React Router direct URL visits. Check that the admin app is served only on the intended admin domain and that API CORS allows only trusted origins.

## 7. Deploy API with PM2

Use the real PM2 process name found by `pm2 list`; do not assume it. Review environment values before restarting:
```bash
pm2 describe <actual-api-process-name>
pm2 restart <actual-api-process-name> --update-env
pm2 logs <actual-api-process-name> --lines 100
```
Use the project's established PM2 ecosystem configuration if present. Do not start a second duplicate API process on the same port.

## 8. Nginx and TLS

Before reloading:
```bash
sudo nginx -t
sudo systemctl reload nginx
sudo certbot certificates
```
Do not edit or renew certificates blindly. Verify the active server blocks for the public site, admin domain and API domain, including upstream ports and SSL certificate names.

### Dynamic sitemap routing

The public frontend includes a static sitemap fallback. The API also generates `/sitemap.xml` from active services and published articles. To keep new CMS content in the sitemap, add an exact-match Nginx location in the **Webzoneo public site's** server block before reloading:

```nginx
location = /sitemap.xml {
    proxy_pass http://127.0.0.1:5000/sitemap.xml;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

Use the actual API upstream port and validate with `sudo nginx -t`. Confirm `https://webzoneo.com/sitemap.xml` returns XML containing the current published article and active service URLs. The API's `PUBLIC_SITE_URL` must match the canonical public domain.

## 9. Post-deploy smoke test

- Homepage and service/blog URLs load directly, not only via homepage navigation.
- Browser console has no fatal errors and Network tab shows no failed required requests.
- Contact form shows success only after the API accepts the submission; invalid requests show an error.
- Admin pages redirect unauthenticated visitors to login.
- API rejects missing/invalid credentials on protected operations.
- Blog/service/portfolio changes persist after refresh and appear publicly only when published.
- Sitemap and robots rules return HTTP 200 and contain the correct canonical domain.
- Review PM2 logs and Nginx error logs.
- Record the deployed commit SHA and rollback plan.

## 10. Rollback

If the smoke tests fail, restore the previously known-good frontend build and API release using the deployment's established release mechanism. Restore database backups only if a migration/data change requires it and the restore has been reviewed. Never run destructive database commands as a generic rollback.
