CI/CD — Deploy to your VPS

1) Add repository secrets on GitHub

- `VPS_HOST`: your VPS IP or hostname
- `VPS_USER`: the SSH user (recommended: a non-root user with sudo; workflow supports password-based SSH)
- `VPS_PASSWORD`: the SSH password (recommended: use `VPS_SSH_KEY` instead for better security)
- Optional: `VPS_PORT` (defaults to `22`)
- Optional: `VPS_REMOTE_PATH` (defaults to `/var/www/ott-my-list-service`)

2) Branching and triggers

- The workflow triggers on pushes to the `main` branch and on pull requests targeting `main`.

3) What the workflow does

- Installs dependencies with `npm ci`
- Runs `npm run build` (TypeScript compile)
- Runs tests via `npx jest`
- If the `main` pipeline succeeds, it archives the repository, copies it to your VPS via `scp`, and runs remote commands to install dependencies, build, run database migrations (`npm run db:migrate`), run seeders (`npm run db:seed`), and restart the app with `pm2`.

4) Security notes

- Storing SSH passwords as GitHub secrets works, but using an SSH key (`VPS_SSH_KEY`) is more secure. If you prefer keys, add `VPS_SSH_KEY` as a secret and update the workflow to use it (I can do that for you).
- The workflow disables strict host key checking for convenience; you may want to pre-populate known_hosts on the runner for stricter security.

5) Example: create secrets from the command line (locally)

```bash
GITHUB_REPO=your-org/your-repo
gh secret set VPS_HOST -b"<your-vps-ip>" --repo "$GITHUB_REPO"
gh secret set VPS_USER -b"<username>" --repo "$GITHUB_REPO"
gh secret set VPS_PASSWORD -b"<password>" --repo "$GITHUB_REPO"
# optional
gh secret set VPS_PORT -b"22" --repo "$GITHUB_REPO"
gh secret set VPS_REMOTE_PATH -b"/var/www/ott-my-list-service" --repo "$GITHUB_REPO"
```

6) On the VPS

- Ensure Node.js is installed (v20+) and `pm2` is available (the workflow will install `pm2` if needed).
- Ensure the `VPS_USER` has permissions to write to `VPS_REMOTE_PATH` (or use `root`).
- Ensure your `.env` file is present in the deployment directory (the workflow does not copy it; you need to set it up manually or via another method).

7) Next steps

- Add the secrets in your repository settings, then push the branch to `main`. The workflow will run automatically.

If you want, I can update the workflow to use an SSH key (`VPS_SSH_KEY`) instead of a password—shall I do that?
