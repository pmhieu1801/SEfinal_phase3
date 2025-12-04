using Microsoft.EntityFrameworkCore;
using OnlineElectronicsStoreAPI.Data;
using OnlineElectronicsStoreAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext with InMemory database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("OnlineElectronicsStoreDB"));

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

// Seed database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.EnsureCreated();

    if (!context.Products.Any())
    {
        var sampleProducts = new List<Product>
        {
            new Product
            {
                Name = "MacBook Pro 16",
                Brand = "Apple",
                Price = 2499.99m,
                OriginalPrice = 2799.99m,
                Category = "Laptops",
                Description = "Powerful laptop with M3 Pro chip, 16GB RAM, 512GB SSD",
                ImageUrl = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
                Stock = 15,
                Rating = 4.9,
                ReviewCount = 234,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "iPhone 15 Pro",
                Brand = "Apple",
                Price = 999.99m,
                Category = "Smartphones",
                Description = "Latest iPhone with A17 Pro chip and 256GB storage",
                ImageUrl = "https://images.unsplash.com/photo-1592286927505-bf92e143e9d6?w=400",
                Stock = 30,
                Rating = 4.8,
                ReviewCount = 512,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "AirPods Pro",
                Brand = "Apple",
                Price = 249.99m,
                OriginalPrice = 279.99m,
                Category = "Audio",
                Description = "Active noise cancellation with spatial audio",
                ImageUrl = "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400",
                Stock = 50,
                Rating = 4.7,
                ReviewCount = 892,
                IsFeatured = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Dell XPS 15",
                Brand = "Dell",
                Price = 1799.99m,
                Category = "Laptops",
                Description = "Premium ultrabook with 4K OLED display and Intel i7",
                ImageUrl = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
                Stock = 12,
                Rating = 4.6,
                ReviewCount = 156,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Samsung Galaxy S24",
                Brand = "Samsung",
                Price = 899.99m,
                Category = "Smartphones",
                Description = "Flagship smartphone with Snapdragon 8 Gen 3",
                ImageUrl = "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
                Stock = 25,
                Rating = 4.7,
                ReviewCount = 423,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Sony WH-1000XM5",
                Brand = "Sony",
                Price = 399.99m,
                OriginalPrice = 449.99m,
                Category = "Audio",
                Description = "Premium noise cancelling headphones",
                ImageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                Stock = 40,
                Rating = 4.9,
                ReviewCount = 678,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "iPad Pro 12.9",
                Brand = "Apple",
                Price = 1099.99m,
                Category = "Tablets",
                Description = "M2 chip with Liquid Retina XDR display",
                ImageUrl = "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
                Stock = 20,
                Rating = 4.8,
                ReviewCount = 345,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Logitech MX Master 3S",
                Brand = "Logitech",
                Price = 99.99m,
                Category = "Accessories",
                Description = "Wireless ergonomic mouse with 8K DPI",
                ImageUrl = "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
                Stock = 60,
                Rating = 4.7,
                ReviewCount = 789,
                IsFeatured = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Samsung Odyssey G9",
                Brand = "Samsung",
                Price = 1299.99m,
                OriginalPrice = 1599.99m,
                Category = "Monitors",
                Description = "49-inch ultra-wide curved gaming monitor",
                ImageUrl = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
                Stock = 8,
                Rating = 4.8,
                ReviewCount = 234,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Nintendo Switch OLED",
                Brand = "Nintendo",
                Price = 349.99m,
                Category = "Gaming",
                Description = "7-inch OLED gaming console",
                ImageUrl = "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400",
                Stock = 35,
                Rating = 4.6,
                ReviewCount = 567,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Canon EOS R6 Mark II",
                Brand = "Canon",
                Price = 2499.99m,
                Category = "Cameras",
                Description = "Full-frame mirrorless camera with 4K video",
                ImageUrl = "https://images.unsplash.com/photo-1606980395156-2e63190625ed?w=400",
                Stock = 6,
                Rating = 4.9,
                ReviewCount = 123,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Keychron K2 Pro",
                Brand = "Keychron",
                Price = 109.99m,
                Category = "Accessories",
                Description = "Wireless mechanical keyboard with RGB",
                ImageUrl = "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
                Stock = 45,
                Rating = 4.5,
                ReviewCount = 432,
                IsFeatured = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        context.Products.AddRange(sampleProducts);
        context.SaveChanges();

        Console.WriteLine("Seeded 12 products to database");
    }
    else
    {
        Console.WriteLine($"Database already contains {context.Products.Count()} products");
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