using System;
using System.Threading.Tasks;
using Moq;
using Xunit;
using OnlineElectronicsStoreAPI.Models;
using OnlineElectronicsStoreAPI.Repositories;
using OnlineElectronicsStoreAPI.Services;

namespace OnlineElectronicsStore.Tests.Services
{
    public class ProductServiceTests
    {
        [Fact]
        public async Task CreateProduct_ShouldThrow_WhenNameEmpty()
        {
            var repoMock = new Mock<IProductRepository>();
            var service = new ProductService(repoMock.Object);

            await Assert.ThrowsAsync<ArgumentException>(() => service.CreateProductAsync(new Product { Name = "", Price = 10M }));
        }

        [Fact]
        public async Task CreateProduct_ShouldCallRepo_WhenValid()
        {
            var repoMock = new Mock<IProductRepository>();
            repoMock.Setup(r => r.FindByNameAsync(It.IsAny<string>())).ReturnsAsync((Product?)null);
            repoMock.Setup(r => r.AddAsync(It.IsAny<Product>())).Returns(Task.CompletedTask);

            var service = new ProductService(repoMock.Object);

            var p = new Product { Name = "X", Price = 10M };
            var result = await service.CreateProductAsync(p);

            repoMock.Verify(r => r.AddAsync(p), Times.Once);
            Assert.Equal("X", result.Name);
        }

        [Fact]
        public async Task UpdateProduct_ShouldThrow_WhenPriceNegative()
        {
            var repoMock = new Mock<IProductRepository>();
            var service = new ProductService(repoMock.Object);

            await Assert.ThrowsAsync<ArgumentException>(() => service.UpdateProductAsync(new Product { Id = 1, Name = "A", Price = -5M }));
        }
    }
}