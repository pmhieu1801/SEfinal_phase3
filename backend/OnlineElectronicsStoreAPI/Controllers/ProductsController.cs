using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineElectronicsStoreAPI.Data;
using OnlineElectronicsStoreAPI. DTOs;
using OnlineElectronicsStoreAPI.Models;

namespace OnlineElectronicsStoreAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductsController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Get all products
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
    {
        var products = await _context.Products
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Brand = p.Brand,
                Price = p.Price,
                OriginalPrice = p.OriginalPrice,
                Category = p.Category,
                Description = p.Description,
                ImageUrl = p. ImageUrl,
                Stock = p.Stock,
                Rating = p.Rating,
                ReviewCount = p.ReviewCount,
                IsFeatured = p.IsFeatured
            })
            .ToListAsync();

        return Ok(products);
    }

    /// <summary>
    /// Get product by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _context.Products. FindAsync(id);

        if (product == null)
        {
            return NotFound(new { message = $"Product with ID {id} not found" });
        }

        var productDto = new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Brand = product.Brand,
            Price = product.Price,
            OriginalPrice = product.OriginalPrice,
            Category = product.Category,
            Description = product.Description,
            ImageUrl = product.ImageUrl,
            Stock = product.Stock,
            Rating = product.Rating,
            ReviewCount = product.ReviewCount,
            IsFeatured = product.IsFeatured
        };

        return Ok(productDto);
    }

    /// <summary>
    /// Get products by category
    /// </summary>
    [HttpGet("category/{category}")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByCategory(string category)
    {
        var products = await _context.Products
            .Where(p => p.Category. ToLower() == category.ToLower())
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Brand = p.Brand,
                Price = p.Price,
                OriginalPrice = p.OriginalPrice,
                Category = p.Category,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                Stock = p.Stock,
                Rating = p.Rating,
                ReviewCount = p.ReviewCount,
                IsFeatured = p.IsFeatured
            })
            .ToListAsync();

        return Ok(products);
    }

    /// <summary>
    /// Create a new product (Admin)
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct(CreateProductDto createProductDto)
    {
        var product = new Product
        {
            Name = createProductDto.Name,
            Brand = createProductDto.Brand,
            Price = createProductDto.Price,
            OriginalPrice = createProductDto. OriginalPrice,
            Category = createProductDto.Category,
            Description = createProductDto.Description,
            ImageUrl = createProductDto.ImageUrl,
            Stock = createProductDto.Stock,
            Rating = 0,
            ReviewCount = 0,
            IsFeatured = createProductDto.IsFeatured,
            CreatedAt = DateTime. UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        var productDto = new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Brand = product.Brand,
            Price = product.Price,
            OriginalPrice = product.OriginalPrice,
            Category = product.Category,
            Description = product.Description,
            ImageUrl = product.ImageUrl,
            Stock = product.Stock,
            Rating = product.Rating,
            ReviewCount = product.ReviewCount,
            IsFeatured = product.IsFeatured
        };

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, productDto);
    }

    /// <summary>
    /// Update a product (Admin)
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, CreateProductDto updateProductDto)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound(new { message = $"Product with ID {id} not found" });
        }

        product.Name = updateProductDto.Name;
        product.Brand = updateProductDto. Brand;
        product.Price = updateProductDto.Price;
        product.OriginalPrice = updateProductDto.OriginalPrice;
        product.Category = updateProductDto.Category;
        product. Description = updateProductDto.Description;
        product.ImageUrl = updateProductDto.ImageUrl;
        product.Stock = updateProductDto. Stock;
        product.IsFeatured = updateProductDto. IsFeatured;
        product.UpdatedAt = DateTime. UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Delete a product (Admin)
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound(new { message = $"Product with ID {id} not found" });
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}