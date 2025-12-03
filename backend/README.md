# Online Electronics Store - Backend API

## 🚀 Tech Stack
- ASP.NET Core 8.0 Web API
- Entity Framework Core (InMemory Database)
- Swagger/OpenAPI
- C# 12

## 📋 Prerequisites
- Visual Studio 2022 (Community, Professional, or Enterprise)
- . NET 8.0 SDK
- Git

## 🛠️ Setup Instructions

### 1. Open in Visual Studio 2022
1. Open Visual Studio 2022
2. Click **File > Open > Project/Solution**
3. Navigate to `backend/OnlineElectronicsStoreAPI/OnlineElectronicsStoreAPI.csproj`
4. Click **Open**

### 2.  Restore NuGet Packages
Visual Studio will automatically restore packages.  If not:
- Right-click on Solution in Solution Explorer
- Click **Restore NuGet Packages**

### 3. Run the API
- Press **F5** or click **Run** button
- Browser will open automatically to Swagger UI
- Default URL: `https://localhost:7001/swagger` or `http://localhost:5000/swagger`

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)
- `GET /api/products/category/{category}` - Filter by category

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/{id}/status` - Update order status
- `GET /api/orders/user/{userId}` - Get user orders

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login
- `GET /api/users/{id}` - Get user profile

## 🔧 Configuration

### CORS
Frontend React app is allowed from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (Create React App default)

### Database
Using **InMemory Database** for development.  Data resets on restart.

To switch to SQL Server later, update `Program.cs`:
```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

## 🧪 Testing with Swagger
1. Run the API (F5)
2. Open Swagger UI in browser
3.  Expand any endpoint
4. Click **Try it out**
5. Fill in parameters
6. Click **Execute**
7. See response below

## 🔗 Connect Frontend
Update your React app's API base URL:

```typescript
// In your React app
const API_BASE_URL = "http://localhost:5000/api";

// Example: Fetch products
const response = await fetch(`${API_BASE_URL}/products`);
const products = await response.json();
```

## 📦 Project Structure
```
backend/
└── OnlineElectronicsStoreAPI/
    ├── Controllers/          # API Controllers
    ├── Models/              # Database models
    ├── DTOs/                # Data Transfer Objects
    ├── Data/                # DbContext
    ├── Services/            # Business logic
    ├── Program.cs           # App configuration
    └── appsettings.json     # Configuration
```

## 🐛 Troubleshooting

### Port already in use
Edit `Properties/launchSettings.json` and change port numbers. 

### CORS errors
Make sure frontend URL is added to CORS policy in `Program.cs`. 

### Swagger not showing
Check that you're accessing `/swagger` endpoint, not root `/`.

## 📚 Learn More
- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Swagger/OpenAPI](https://swagger.io/specification/)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)