# Runtime Validation Report

**Generated**: 2026-10-27  
**Target**: `C:\Projects\dvdafonso`

## Summary

| Step | Status | Exit Code | Details |
|---|---:|---:|---|
| Environment | PASS | 0 | Docker 29.8.1 and Node.js v24.19.0 available; PHP absent on host |
| Static validation | PASS | 0 | HTML validation and JavaScript syntax |
| Browser E2E | PASS | 0 | 5 tests passed in Chromium |
| PHP syntax | PASS | 0 | `php -l contact.php` passed in PHP 8.3 Docker image |
| PHP negative HTTP paths | PASS | 0 | GET 405, honeypot 400, invalid input 422 |
| PHP delivery success | UNVERIFIED | n/a | Requires Hostinger mail transport and real mailbox |
| Remote CI | PASS | 0 | `main` Validate website and CodeQL workflows passed |

## Critical Journeys Covered

1. Homepage loads with professional profile, experience and project navigation.
2. Project and notes navigation scrolls to the expected sections.
3. Portuguese/English switch changes and restores content.
4. Mobile navigation opens and reaches the contact section.
5. Contact fields validate in the browser and preserve telephone/WhatsApp paths.
6. Canonical, description and JSON-LD profile metadata are exposed.
7. PHP endpoint rejects unsupported methods, bots and invalid input.

## Test Evidence

- `tests/e2e/homepage.spec.mjs`
- `tests/e2e/language-and-responsive.spec.mjs`
- `tests/e2e/contact-and-seo.spec.mjs`
- `npm test`: 5 passed, exit code 0
- `npx html-validate@9.4.0 --config .htmlvalidate.json index.html`: exit code 0
- `node --check script.js`: exit code 0
- PHP 8.3 Docker: no syntax errors

## Known Gaps

- The local host has no PHP runtime; PHP execution was validated independently in Docker.
- The success branch of `mail()` cannot be proven without the Hostinger mail service and a real mailbox.
- DNS, SSL, FTPS deployment and the production response auto-reply require the domain to be configured at Hostinger.
- No production credentials were used or stored during validation.

## Verdict

**Overall: PASS WITH PRODUCTION SIGN-OFF REQUIRED**

The application and CI test suite pass locally and in GitHub Actions. Before declaring production complete, publish to Hostinger and perform one real contact submission, confirming both owner delivery and visitor auto-reply.
