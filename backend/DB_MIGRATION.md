# Database Migration: Switch EF Core provider to SQL Server

This document explains how to update the backend to use SQL Server (LocalDB) while keeping the SQLite option available.

## 1. Add SQL Server provider
From backend project folder:
```
cd backend/OnlineElectronicsStoreAPI
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

## 2. Update appsettings.json
Add a SQL Server connection string:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ElectronicsDb;Trusted_Connection=True;"
}
```

## 3. Program.cs (use SQL Server when DefaultConnection exists)
Replace or update DbContext registration:

```csharp
var conn = builder.Configuration.GetConnectionString("DefaultConnection");
if (!string.IsNullOrEmpty(conn))
{
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(conn));
}
else
{
    // Fallback to SQLite for dev convenience
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("SqliteConnection")));
}
```

## 4. Migrations (from backend project)
```
dotnet ef migrations add MigrateToSqlServer
dotnet ef database update
```

If you have existing migrations for SQLite, you may:
- Keep them and create new migrations, or
- Remove Migrations folder and create a new initial migration for SQL Server.

## 5. Troubleshooting
- If `dotnet ef` complains, ensure the EF Tools are installed:
  `dotnet tool install --global dotnet-ef` or `dotnet tool update --global dotnet-ef`
- Ensure you run commands in project folder where DbContext is defined.