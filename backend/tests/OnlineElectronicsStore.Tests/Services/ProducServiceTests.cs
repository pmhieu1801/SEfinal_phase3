using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Moq;
using FluentAssertions;

// NOTE: Adjust these using imports and namespace to match your backend project namespace
// using OnlineElectronicsStoreAPI.Services;
// using OnlineElectronicsStoreAPI.Repositories;
// using OnlineElectronicsStoreAPI.Models;
// using OnlineElectronicsStoreAPI.DTOs;

namespace OnlineElectronicsStore.Tests.Services
{
    public class ProductServiceTests
    {
        [Fact]
        public async Task GetAll_ReturnsProducts()
        {
            // Arrange
            var mockRepo = new Mock<IProductRepository>();
            mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Product>
            {
                new Product { Id = 1, Name = "Test", Price = 10M }
            });

            // If your ProductService requires additional dependencies (mapper etc.), pass mocks or null accordingly
            var service = new ProductService(mockRepo.Object, null);

            // Act
            var result = await service.GetAllAsync();

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCountGreaterOrEqualTo(1);
        }

        [Fact]
        public async Task CreateOrder_DecreasesStock()
        {
            // Arrange
            var product = new Product { Id = 1, Name = "Item", Stock = 5, Price = 100M };
            var mockProductRepo = new Mock<IProductRepository>();
            mockProductRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(product);
            mockProductRepo.Setup(r => r.Update(It.IsAny<Product>()));

            var mockOrderRepo = new Mock<IOrderRepository>();
            mockOrderRepo.Setup(r => r.AddAsync(It.IsAny<Order>()));

            var orderService = new OrderService(mockOrderRepo.Object, mockProductRepo.Object /*, mapper */);

            // Act
            var orderDto = new CreateOrderDto
            {
                Items = new List<CreateOrderItemDto> {
                    new CreateOrderItemDto { ProductId = 1, Quantity = 2 }
                },
                Shipping = new ShippingDto { FullName = "Test", Address = "Addr", Email = "a@b.com" },
                Payment = new PaymentDto { Method = "Cash" }
            };

            await orderService.PlaceOrderAsync(orderDto);

            // Assert: Verify product update called with decreased stock
            mockProductRepo.Verify(r => r.Update(It.Is<Product>(p => p.Stock == 3)), Times.AtLeastOnce);
            mockProductRepo.Verify(r => r.GetByIdAsync(1), Times.AtLeastOnce);
        }
    }
}