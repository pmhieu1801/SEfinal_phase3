using Microsoft.AspNetCore. Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineElectronicsStoreAPI. Data;
using OnlineElectronicsStoreAPI.DTOs;
using OnlineElectronicsStoreAPI.Models;

namespace OnlineElectronicsStoreAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrdersController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Get all orders
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .Select(o => new OrderDto
            {
                Id = o.Id,
                UserId = o. UserId,
                OrderDate = o.OrderDate,
                Status = o.Status,
                TotalAmount = o.TotalAmount,
                ShippingAddress = o.ShippingAddress,
                CustomerName = o.CustomerName,
                CustomerEmail = o. CustomerEmail,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product != null ? oi.Product.Name : "",
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }). ToList()
            })
            .ToListAsync();

        return Ok(orders);
    }

    /// <summary>
    /// Get order by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o. OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
        {
            return NotFound(new { message = $"Order with ID {id} not found" });
        }

        var orderDto = new OrderDto
        {
            Id = order.Id,
            UserId = order.UserId,
            OrderDate = order.OrderDate,
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            ShippingAddress = order.ShippingAddress,
            CustomerName = order. CustomerName,
            CustomerEmail = order.CustomerEmail,
            OrderItems = order.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductName = oi.Product != null ? oi.Product.Name : "",
                Quantity = oi.Quantity,
                Price = oi.Price
            }). ToList()
        };

        return Ok(orderDto);
    }

    /// <summary>
    /// Get orders by user ID
    /// </summary>
    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrdersByUser(string userId)
    {
        var orders = await _context. Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .Select(o => new OrderDto
            {
                Id = o.Id,
                UserId = o.UserId,
                OrderDate = o.OrderDate,
                Status = o.Status,
                TotalAmount = o.TotalAmount,
                ShippingAddress = o.ShippingAddress,
                CustomerName = o. CustomerName,
                CustomerEmail = o.CustomerEmail,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi. Product != null ? oi.Product.Name : "",
                    Quantity = oi.Quantity,
                    Price = oi. Price
                }).ToList()
            })
            .ToListAsync();

        return Ok(orders);
    }

    /// <summary>
    /// Create a new order
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto createOrderDto)
    {
        // Calculate total amount
        decimal totalAmount = 0;
        var orderItems = new List<OrderItem>();

        foreach (var item in createOrderDto. OrderItems)
        {
            var product = await _context.Products.FindAsync(item.ProductId);
            if (product == null)
            {
                return BadRequest(new { message = $"Product with ID {item.ProductId} not found" });
            }

            if (product.Stock < item.Quantity)
            {
                return BadRequest(new { message = $"Insufficient stock for product {product.Name}" });
            }

            var orderItem = new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                Price = product.Price
            };

            totalAmount += product.Price * item.Quantity;
            orderItems.Add(orderItem);

            // Update stock
            product. Stock -= item.Quantity;
        }

        var order = new Order
        {
            UserId = createOrderDto. UserId,
            OrderDate = DateTime.UtcNow,
            Status = "Pending",
            TotalAmount = totalAmount,
            ShippingAddress = createOrderDto.ShippingAddress,
            CustomerName = createOrderDto.CustomerName,
            CustomerEmail = createOrderDto. CustomerEmail,
            CustomerPhone = createOrderDto.CustomerPhone,
            OrderItems = orderItems
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        var orderDto = new OrderDto
        {
            Id = order.Id,
            UserId = order.UserId,
            OrderDate = order.OrderDate,
            Status = order.Status,
            TotalAmount = order. TotalAmount,
            ShippingAddress = order.ShippingAddress,
            CustomerName = order.CustomerName,
            CustomerEmail = order.CustomerEmail,
            OrderItems = order.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductName = _context.Products.Find(oi.ProductId)?.Name ?? "",
                Quantity = oi. Quantity,
                Price = oi.Price
            }).ToList()
        };

        return CreatedAtAction(nameof(GetOrder), new { id = order. Id }, orderDto);
    }

    /// <summary>
    /// Update order status (Admin)
    /// </summary>
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
    {
        var order = await _context.Orders. FindAsync(id);

        if (order == null)
        {
            return NotFound(new { message = $"Order with ID {id} not found" });
        }

        var validStatuses = new[] { "Pending", "Processing", "Shipped", "Delivered", "Cancelled" };
        if (!validStatuses.Contains(status))
        {
            return BadRequest(new { message = "Invalid status.  Valid values: Pending, Processing, Shipped, Delivered, Cancelled" });
        }

        order.Status = status;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}