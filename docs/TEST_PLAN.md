# Test Plan — AWE Electronics Online Store

Author: pmhieu1801  
Date: 2025-12-05  
Project: AWE Electronics Online Store

## 1. Purpose and Scope
This document provides a formal test plan and a traceability matrix linking implemented test cases back to the system use cases. Scope covers core functionality: authentication, product CRUD, cart and checkout, order processing and stock updates, admin operations, and image loading.

## 2. Test Environment
- OS: Windows 10/11 or macOS (for frontend dev)
- Backend: .NET 9, ASP.NET Core Web API
- Frontend: Node 18+, Vite (React)
- Database: SQL Server (LocalDB) or SQL Server instance
- Browser: Chrome, Firefox, Edge (latest)
- Tools: Postman, Visual Studio 2022, dotnet CLI, npm

## 3. Test Strategy
- Unit tests: xUnit, Moq, FluentAssertions (automated)
- Integration tests: manual or automated HTTP tests (optional)
- Manual acceptance tests: executed on the running system (UI + desktop)
- Regression: run unit tests and manual key flows after changes

## 4. How to run tests
- From repository root:
  - `cd backend/OnlineElectronicsStoreAPI` (if tests reference projects here)
  - `dotnet test` (runs all test projects in solution)
- Or:
  - `dotnet test ./backend/tests/OnlineElectronicsStore.Tests/OnlineElectronicsStore.Tests.csproj`

Record results in the test matrix below (`Actual Result` and `Status`).

## 5. Test Case Matrix (examples)

| ID | Use Case | Description | Precondition | Steps | Expected Result | Actual Result | Status | Notes |
|----|----------|-------------|--------------|-------|-----------------|----------------|--------|-------|
| TC01 | Web Login | User can login via web UI | Backend running, user seeded | 1. Open web UI 2. Enter valid creds 3. Submit | User logged in, token set, redirected | | | |
| TC02 | Desktop Login | Staff login via Desktop app | Backend running, user seeded | 1. Open desktop 2. Enter staff creds 3. Submit | Desktop authenticated, token stored | | | |
| TC03 | Inventory Create | Admin creates a product | Admin logged in | 1. Open admin dashboard 2. Click create 3. Submit product data | New product appears in list and DB | | | |
| TC04 | Inventory Read | Any user views product list | Backend + DB seeded | 1. Open web UI 2. View products | Product data listed with images | | | |
| TC05 | Inventory Update | Admin updates product price | Admin logged in | 1. Edit product 2. Save | Product updated in UI &amp; DB | | | |
| TC06 | Inventory Delete | Admin deletes product | Admin logged in | 1. Delete product 2. Confirm | Product removed from UI &amp; DB | | | |
| TC07 | Add to Cart &amp; Checkout | Customer purchases product reducing stock | User logged in, product in stock | 1. Add to cart 2. Checkout 3. Confirm order | Order created; stock decreased by qty | | | |
| TC08 | Order Management | Admin updates order status | Admin logged in, orders exist | 1. Open orders 2. Change status 3. Save | Order status updated | | | |
| TC09 | Image Loading | Product images load on UI | Backend running | 1. Load homepage 2. Inspect images | Images show (200 status) or fallback | | | |
| TC10 | API Health | API responds to health check | Backend running | 1. GET /swagger or /api/health | 200 OK | | | |

## 6. Mapping test cases to test types
- Unit tests: TC07 logic (stock update), TC03 business validations
- Integration/manual: TC01, TC02, TC04, TC05, TC06, TC08, TC09
- Automated scripts: API health checks

## 7. Recording Results
- Use the table above: update Actual Result and Status after test execution.
- Save logs/screenshots in `docs/test-execution/` and reference them in PRs or final report.

## 8. Responsibilities
- Developers: ensure unit tests pass and provide instructions to run them
- QA: run acceptance tests and fill test matrix
- Team lead: consolidate test evidence for final submission

## 9. Appendix
- Test case templates, sample screenshots, sample `dotnet test` output and instructions.
