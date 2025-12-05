# OnlineElectronicsStore Desktop (scaffold)

This is a lightweight WinForms scaffold that demonstrates login and fetching products from the API.

## Requirements
- Visual Studio 2022
- .NET 9.0 Runtime / SDK
- Backend API running at http://localhost:5000

## How to run
1. Open solution in Visual Studio 2022.
2. Right-click `OnlineElectronicsStore.Desktop` and Set as Startup Project.
3. Run (F5). The Login form will open.
4. Configure API base URL: edit `ApiClient.BaseUrl` in `ApiClient.cs`.

Notes:
- This scaffold expects an `/api/auth/login` endpoint. If your backend doesn't implement auth, login will likely return error; the UI is defensive.
- Inventory form fetches `/api/products`. Ensure backend is running.