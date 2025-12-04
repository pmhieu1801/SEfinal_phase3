# 🛒 AWE Electronics Online Store

> A modern, full-stack e-commerce platform for electronics shopping

[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Educational-green)](LICENSE)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database](#-database)
- [Test Accounts](#-test-accounts)
- [Features Walkthrough](#-features-walkthrough)
- [Troubleshooting](#-troubleshooting)
- [Development Workflow](#-development-workflow)
- [Building for Production](#-building-for-production)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

AWE Electronics Online Store is a comprehensive e-commerce platform built as a Software Engineering final project. The application features a React frontend with a .NET 9 backend, providing a complete shopping experience for electronics products.

### Key Highlights

- 📦 **12 High-Quality Products** - Curated electronics catalog
- 🛒 **Full Shopping Cart** - Add, remove, and update quantities
- 👨‍💼 **Admin Dashboard** - Complete product and order management
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 🎨 **Modern UI** - Built with Tailwind CSS and ShadCN UI

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🛍️ **Product Catalog** | Browse 12 electronics products with detailed information |
| 🖼️ **Product Images** | High-quality product images from Unsplash |
| 🛒 **Shopping Cart** | Add/remove products and update quantities |
| 👤 **User Authentication** | Login and signup functionality |
| 💳 **Checkout Flow** | Complete checkout with order confirmation |
| 👨‍💼 **Admin Dashboard** | Staff-only access for management |
| ⚙️ **Product Management** | CRUD operations for products |
| 📋 **Order Management** | View and update order statuses |
| 📊 **Statistics Dashboard** | View store analytics |
| 📱 **Responsive Design** | Mobile, tablet, and desktop support |
| 🎨 **Modern UI** | Tailwind CSS and ShadCN UI components |
| 🌓 **Dark/Light Theme** | Theme toggle support |
| 🔍 **Product Search** | Search and filter products |
| 📂 **Category Filtering** | Filter by product categories |
| ⭐ **Product Ratings** | View ratings and reviews |
| 📦 **Stock Management** | Track product inventory |

---

## 🛠️ Tech Stack

### Backend

| Technology | Description |
|------------|-------------|
| ![C#](https://img.shields.io/badge/C%23-239120?logo=csharp&logoColor=white) | Programming Language |
| ![.NET 9](https://img.shields.io/badge/.NET_9-512BD4?logo=dotnet&logoColor=white) | Framework |
| ASP.NET Core Web API | RESTful API |
| Entity Framework Core | ORM |
| In-Memory Database | Data Storage (Development) |
| Swagger/OpenAPI | API Documentation |
| CORS | Cross-Origin Resource Sharing |

### Frontend

| Technology | Description |
|------------|-------------|
| ![React](https://img.shields.io/badge/React_18-61DAFB?logo=react&logoColor=black) | UI Library |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) | Build Tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white) | Styling |
| ShadCN UI | Component Library |
| Lucide React | Icon Library |
| Sonner | Toast Notifications |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Software | Version | Download |
|----------|---------|----------|
| .NET SDK | 9.0 or later | [Download](https://dotnet.microsoft.com/download/dotnet/9.0) |
| Node.js | 18+ | [Download](https://nodejs.org/) |
| npm | Included with Node.js | - |
| Visual Studio 2022 | Latest (recommended) | [Download](https://visualstudio.microsoft.com/) |
| Git | Latest | [Download](https://git-scm.com/) |

---

## 📥 Installation

### Clone the Repository

```bash
git clone https://github.com/pmhieu1801/SEfinal_phase3.git
cd SEfinal_phase3
```

### Backend Setup

```bash
cd backend/OnlineElectronicsStoreAPI
dotnet restore
dotnet build
```

### Frontend Setup

```bash
cd ../../
npm install
```

---

## 🚀 Running the Project

### Option 1: Using Visual Studio 2022

#### Backend

1. Open `backend/OnlineElectronicsStoreAPI/OnlineElectronicsStoreAPI.sln` in Visual Studio 2022
2. Press `F5` to run with debugging (or `Ctrl+F5` without debugging)
3. Swagger UI will open at `https://localhost:5001/swagger`
4. API is available at `http://localhost:5000`

#### Frontend

Open a new terminal:

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

---

### Option 2: Using Command Line

#### Terminal 1 - Backend

```bash
cd backend/OnlineElectronicsStoreAPI
dotnet run
```

#### Terminal 2 - Frontend

```bash
npm run dev
```

---

### ✅ Verify Everything is Running

| Service | URL | Expected |
|---------|-----|----------|
| Backend API | http://localhost:5000/swagger | Swagger UI loads |
| Frontend | http://localhost:5173 | Homepage displays |
| Database | Console output | "Seeded 12 products to database" |
| Products | Frontend homepage | All 12 products display with images |

---

## 📁 Project Structure

```
SEfinal_phase3/
├── backend/
│   └── OnlineElectronicsStoreAPI/
│       ├── Controllers/          # API controllers
│       │   ├── ProductsController.cs
│       │   └── OrdersController.cs
│       ├── Models/               # Data models
│       │   ├── Product.cs
│       │   ├── Order.cs
│       │   └── User.cs
│       ├── Data/                 # Database context & seeding
│       │   └── ApplicationDbContext.cs
│       ├── DTOs/                 # Data transfer objects
│       │   ├── ProductDto.cs
│       │   └── OrderDto.cs
│       ├── Program.cs            # Application entry point
│       └── appsettings.json      # Configuration
├── src/
│   ├── components/               # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartSheet.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── ProductManagement.tsx
│   │   ├── OrderManagement.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── ui/                   # ShadCN UI components
│   ├── services/
│   │   └── api.ts                # API client
│   ├── types/
│   │   └── product.ts            # TypeScript types
│   ├── data/
│   │   └── products.ts           # Fallback product data
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Application entry
├── public/                       # Static assets
├── package.json                  # NPM dependencies
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Products

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/products` | Get all products | No |
| `GET` | `/api/products/{id}` | Get product by ID | No |
| `POST` | `/api/products` | Create new product | Admin |
| `PUT` | `/api/products/{id}` | Update product | Admin |
| `DELETE` | `/api/products/{id}` | Delete product | Admin |
| `GET` | `/api/products/category/{category}` | Get products by category | No |

#### Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/orders` | Create new order | Yes |
| `GET` | `/api/orders/{id}` | Get order by ID | Yes |
| `GET` | `/api/orders/user/{userId}` | Get user's orders | Yes |

### Swagger Documentation

Full interactive API documentation available at:

```
http://localhost:5000/swagger
```

---

## 🗄️ Database

### Configuration

| Property | Value |
|----------|-------|
| **Type** | In-Memory (Entity Framework Core) |
| **Auto-Seeding** | Yes - 12 products on startup |

### Schema

#### Products Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `name` | string | Product name |
| `brand` | string | Brand name |
| `price` | decimal | Current price |
| `originalPrice` | decimal | Original price |
| `category` | string | Product category |
| `description` | string | Product description |
| `imageUrl` | string | Image URL |
| `stock` | int | Available stock |
| `rating` | decimal | Average rating |
| `reviewCount` | int | Number of reviews |
| `isFeatured` | bool | Featured flag |
| `createdAt` | datetime | Creation timestamp |
| `updatedAt` | datetime | Update timestamp |

#### Orders Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `userId` | string | User identifier |
| `orderNumber` | string | Order number |
| `customerName` | string | Customer name |
| `customerEmail` | string | Customer email |
| `shippingAddress` | string | Shipping address |
| `totalAmount` | decimal | Order total |
| `status` | string | Order status |
| `createdAt` | datetime | Creation timestamp |

#### OrderItems Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `orderId` | int | Foreign key to Orders |
| `productId` | int | Foreign key to Products |
| `quantity` | int | Item quantity |
| `priceAtTime` | decimal | Price at purchase |

---

## 👥 Test Accounts

### Regular User

| Field | Value |
|-------|-------|
| **Email** | `user@example.com` |
| **Password** | Any password (demo mode) |
| **Access** | Shopping, checkout, order history |

### Admin/Staff

| Field | Value |
|-------|-------|
| **Email** | `admin@awe.staff.org.au` |
| **Password** | Any password (demo mode) |
| **Access** | Admin dashboard, product & order management |

> ⚠️ **Note:** Any email ending with `@awe.staff.org.au` will grant admin access.

---

## 🎯 Features Walkthrough

### Customer Flow

1. **Browse Products** - View 12 products on the homepage
2. **Filter & Search** - Use category filters or search bar
3. **View Details** - Click on a product for detailed information
4. **Add to Cart** - Select quantity and add items
5. **Review Cart** - Open cart slide-over panel
6. **Login** - Sign in to proceed with checkout
7. **Checkout** - Enter shipping information
8. **Confirmation** - View order confirmation with order number

### Admin Flow

1. **Login** - Use an email ending with `@awe.staff.org.au`
2. **Access Dashboard** - Navigate to admin dashboard
3. **Manage Products** - Add, edit, or delete products
4. **View Orders** - See all customer orders
5. **Update Status** - Change order statuses
6. **View Statistics** - Analyze store performance

---

## 🔧 Troubleshooting

### Backend Issues

#### Port 5000 Already in Use

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

**macOS/Linux:**
```bash
lsof -i :5000
kill -9 <PID>
```

#### Database Not Seeding

```bash
# Restart the application - In-Memory DB reseeds automatically
cd backend/OnlineElectronicsStoreAPI
dotnet run
```

#### .NET 9 Not Found

1. Download from: https://dotnet.microsoft.com/download/dotnet/9.0
2. Restart Visual Studio 2022
3. Verify installation:
```bash
dotnet --version
```

---

### Frontend Issues

#### Node Modules Error

```bash
rm -rf node_modules package-lock.json
npm install
```

#### Port 5173 in Use

```bash
npx kill-port 5173
```

Or change port in `vite.config.ts`:
```typescript
server: {
  port: 3000,  // Change to available port
}
```

#### Images Not Loading

1. ✅ Ensure backend is running
2. ✅ Check browser console for API errors (F12)
3. ✅ Verify API response: http://localhost:5000/api/products

#### CORS Errors

1. Verify backend CORS configuration in `Program.cs`
2. Check `API_BASE_URL` in `src/services/api.ts`

---

## 💻 Development Workflow

### Making Changes

#### Backend Changes

```bash
# Edit files in backend/OnlineElectronicsStoreAPI/
# Hot-reload in VS 2022 or restart:
cd backend/OnlineElectronicsStoreAPI
dotnet run
```

#### Frontend Changes

```bash
# Edit files in src/
# Vite hot-reloads automatically
# Changes appear instantly in browser
```

#### Database Changes

> **Note:** This project uses an In-Memory database for development. Data is automatically seeded on startup and will be reset when the application restarts.

If you switch to a persistent database (SQLite, SQL Server, etc.), you can use migrations:

```bash
# Update models in Models/
cd backend/OnlineElectronicsStoreAPI

# Add migration (requires persistent database)
dotnet ef migrations add <MigrationName>

# Apply migration
dotnet ef database update
```

---

## 📦 Building for Production

### Backend

```bash
cd backend/OnlineElectronicsStoreAPI
dotnet publish -c Release -o ./publish
```

### Frontend

```bash
npm run build
# Output: build/ folder
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly

---

## 📄 License

This project is for **educational purposes** as part of a Software Engineering final project.

---

## 📬 Contact

| | |
|---|---|
| **Author** | pmhieu1801 |
| **Repository** | [SEfinal_phase3](https://github.com/pmhieu1801/SEfinal_phase3) |
| **Issues** | [Report Issues](https://github.com/pmhieu1801/SEfinal_phase3/issues) |

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Amazing UI library
- [Microsoft .NET](https://dotnet.microsoft.com/) - Powerful framework
- [Visual Studio](https://visualstudio.microsoft.com/) - Excellent IDE
- [Unsplash](https://unsplash.com/) - Beautiful product images
- [ShadCN UI](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Vite](https://vitejs.dev/) - Fast build tool

---

<p align="center">
  Made with ❤️ for AWE Electronics
</p>
  