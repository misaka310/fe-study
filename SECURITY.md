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

## Private vulnerability reporting

Please report suspected vulnerabilities privately through GitHub's private vulnerability reporting form:
https://github.com/misaka310/fe-study/security/advisories/new

Do not disclose exploit details, credentials, tokens, personal data, or other sensitive information in a public issue.
We aim to acknowledge a vulnerability report within 7 days, complete the initial assessment within 30 days, and coordinate disclosure after a fix is available, normally within 90 days. If remediation needs longer, we will communicate the revised disclosure timeline through the private report.
