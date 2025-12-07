# Backend – AWE Electronics Store

This README describes the backend of the AWE Electronics Store system.

## Technologies

- ASP.NET Core Web API (.NET **9.0**)
- InMemory Db (dev) / SQL Server (optional)
- C# (DAL, BLL, Domain)
- Swagger UI for API testing
- Desktop client (WinForms)

## Structure

- **OnlineElectronicsStoreAPI**: Main API project
- **OnlineElectronicsStore.Desktop**: Desktop management app
- **OnlineElectronicsStore.Domain/BLL/DAL**: Layered architecture
- **tests**: Backend tests

## Getting Started

### Prerequisites

- [.NET **9.0 SDK**](https://dotnet.microsoft.com/download/dotnet/9.0)
- Visual Studio 2022+ (recommended)

### Running the API

1. Open `OnlineElectronicsStoreAPI.sln` in Visual Studio.
2. Run (F5) to start the backend server.
3. Swagger UI available at: `http://localhost:5000/swagger`

### CORS

Frontend React app is allowed from:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (CRA)

### Database

- **InMemory Database** is used for rapid development. Data resets on restart.
- To use SQL Server, change in `Program.cs`:
  ```csharp
  builder.Services.AddDbContext<ApplicationDbContext>(options =>
      options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
  ```

### API Endpoints

- Product operations
- Order management
- User authentication (JWT)
- Staff/admin functions

## API Documentation

- Test endpoints via Swagger at `/swagger`
- Sample API call from frontend:
  ```typescript
  const API_BASE_URL = "http://localhost:5000/api";
  const response = await fetch(`${API_BASE_URL}/products`);
  const products = await response.json();
  ```

## Desktop Client

- Open `OnlineElectronicsStore.Desktop` in Visual Studio.
- Windows Forms app for product management, inventory, orders.

## Migrations

See [`DB_MIGRATION.md`](DB_MIGRATION.md) for migration details and manual steps.

## Contributing

Backend contributions are welcome! Follow standard .NET and C# best practices.

## License

See main project license.