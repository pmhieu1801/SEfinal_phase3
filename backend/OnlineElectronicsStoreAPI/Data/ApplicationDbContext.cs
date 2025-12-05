using Microsoft.EntityFrameworkCore;
using OnlineElectronicsStoreAPI.Models;

namespace OnlineElectronicsStoreAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure decimal precision/scale to avoid SQL Server truncation warnings
        modelBuilder.Entity<Product>(eb =>
        {
            // Price and OriginalPrice are money values -> precision 12,2 (adjust if needed)
            eb.Property(p => p.Price).HasPrecision(12, 2);
            eb.Property(p => p.OriginalPrice).HasPrecision(12, 2);
            // If Rating is decimal, limit precision (e.g., 3,2 -> 0.00 - 9.99)
            if (typeof(Product).GetProperty("Rating")?.PropertyType == typeof(decimal))
            {
                eb.Property("Rating").HasPrecision(3, 2);
            }
        });

        modelBuilder.Entity<Order>(eb =>
        {
            // TotalAmount as money
            if (typeof(Order).GetProperty("TotalAmount")?.PropertyType == typeof(decimal))
            {
                eb.Property("TotalAmount").HasPrecision(12, 2);
            }
        });

        modelBuilder.Entity<OrderItem>(eb =>
        {
            // Price at time of order
            if (typeof(OrderItem).GetProperty("Price")?.PropertyType == typeof(decimal))
            {
                eb.Property("Price").HasPrecision(12, 2);
            }
        });

        // Optional: basic length constraints to avoid nvarchar(max) for common fields
        modelBuilder.Entity<User>(eb =>
        {
            eb.Property(u => u.Email).HasMaxLength(255);
            eb.Property(u => u.FullName).HasMaxLength(200);
            eb.Property(u => u.Role).HasMaxLength(50);
        });

        modelBuilder.Entity<Product>(eb =>
        {
            eb.Property(p => p.Name).HasMaxLength(255);
            eb.Property(p => p.Brand).HasMaxLength(100);
            eb.Property(p => p.Category).HasMaxLength(100);
            eb.Property(p => p.ImageUrl).HasMaxLength(1000);
        });
    }
}