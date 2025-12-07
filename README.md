# AWE Electronics Store (SEfinal_phase3)

AWE Electronics Store is a modern e-commerce platform for electronics. This repository contains:
- Frontend (TypeScript, React, CSS)
- Backend (C#, ASP.NET Core)
- Desktop client (C# WinForms)
- Database/Migration resources

## Technologies Used

- **Frontend**: TypeScript, React, CSS, HTML
- **Backend**: C#, ASP.NET Core Web API
- **Desktop Client**: C# WinForms
- **Database**: InMemory (development), SQL Server (optional)

## Getting Started

### Requirements

- Node.js (for frontend)
- .NET **9.0 SDK** (for backend & desktop client)
- npm (for frontend dependencies)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/pmhieu1801/SEfinal_phase3.git
cd SEfinal_phase3
```

#### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

#### 3. Run backend API

- Open `backend/OnlineElectronicsStoreAPI.sln` in Visual Studio
- Press **F5** to start the ASP.NET Core API

#### 4. Start Frontend (React)

```bash
cd frontend
npm run dev
```
- Default URL: [http://localhost:5173](http://localhost:5173) or [http://localhost:3000](http://localhost:3000)

#### 5. Start Desktop Client (Optional)

- Open `backend/OnlineElectronicsStore.Desktop/` in Visual Studio
- Build and run the WinForms project for desktop management

## API Base URL

Set API calls in frontend to:

```
http://localhost:5000/api
```

## Features

- Modern online electronics shopping experience
- Staff/Customer role support
- Product management (CRUD for staff)
- Order management and history
- Loyalty program and points
- Secure login system (JWT)
- Inventory view (Backend & Desktop client)
- Responsive UI for both store users and staff (admin dashboard)

## Folder Structure

```
SEfinal_phase3/
├── backend/                  # Backend API, desktop client, domain/BLL/DAL projects
│   ├── OnlineElectronicsStoreAPI       # ASP.NET Core API
│   ├── OnlineElectronicsStore.Desktop  # WinForms Desktop Client
│   ├── OnlineElectronicsStore.*        # DAL, BLL, Domain
│   ├── README.md
│   └── DB_MIGRATION.md
├── frontend/                 # Frontend (React, TypeScript)
├── src/                      # Source code (frontend)
├── README.md                 # Main project README
```

## Contributing

Feel free to open issues or submit pull requests. All contributions are welcome!

## License

This project is provided for study and demonstration purposes. Please see [`LICENSE`](LICENSE) if available.

## Authors

- pmhieu1801 and contributors