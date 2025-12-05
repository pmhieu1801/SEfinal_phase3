using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OnlineElectronicsStoreAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext: use SQL Server when DefaultConnection is present, otherwise fall back to InMemory
var defaultConn = builder.Configuration.GetConnectionString("DefaultConnection");
if (!string.IsNullOrWhiteSpace(defaultConn))
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(defaultConn));
}
else
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseInMemoryDatabase("OnlineElectronicsStoreDB"));
}

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Ensure database is ready but DO NOT seed data (use existing data in SQL Server)
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    try
    {
        // Try apply migrations if present; if migration fails or none exist, ensure database created.
        try
        {
            context.Database.Migrate();
            logger.LogInformation("Applied EF migrations (if any).");
        }
        catch (Exception migrateEx)
        {
            logger.LogWarning(migrateEx, "Migrations failed or not present - falling back to EnsureCreated.");
            context.Database.EnsureCreated();
        }

        logger.LogInformation("Database initialization completed. Seeding is disabled - using existing data.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while initializing the database.");
    }
}

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();
app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();