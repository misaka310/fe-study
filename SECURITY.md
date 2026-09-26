# Security Policy

## Supported version

Security fixes are applied to the current `main` branch and the currently published site.

## Reporting a vulnerability

Do not post credentials, tokens, private keys, personal data, or exploitable details in a public issue.

If GitHub private vulnerability reporting or the Security Advisories flow is available for this repository, use it for sensitive reports. Non-sensitive security hardening and dependency-maintenance proposals may use a normal GitHub issue.

## Secret handling

- Do not commit `.env` files, access tokens, service-account JSON, private keys, or credentials.
- `.env.example` contains placeholders only.
- Firebase Web App configuration is client-visible configuration; service-account or administrator credentials are never stored in this repository.
- Generated `public/firebase-config.json` stays untracked.
