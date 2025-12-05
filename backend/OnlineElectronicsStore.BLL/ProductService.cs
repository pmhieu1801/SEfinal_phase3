using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineElectronicsStore.Domain.Models;
using OnlineElectronicsStore.DAL.Repositories;

namespace OnlineElectronicsStore.BLL.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;
        public ProductService(IProductRepository repo) => _repo = repo;

        public Task<List<Product>> GetProductsAsync() => _repo.GetAllAsync();

        public Task<Product?> GetProductAsync(int id) => _repo.GetByIdAsync(id);

        public async Task<Product> CreateProductAsync(Product product)
        {
            if (product == null) throw new ArgumentNullException(nameof(product));
            if (string.IsNullOrWhiteSpace(product.Name))
                throw new ArgumentException("Product name is required", nameof(product.Name));
            if (product.Price < 0) throw new ArgumentException("Price must be >= 0", nameof(product.Price));
            var exists = await _repo.FindByNameAsync(product.Name);
            if (exists != null) throw new InvalidOperationException("Product with the same name already exists");

            await _repo.AddAsync(product);
            return product;
        }

        public async Task UpdateProductAsync(Product product)
        {
            if (product == null) throw new ArgumentNullException(nameof(product));
            if (product.Price < 0) throw new ArgumentException("Price must be >= 0", nameof(product.Price));
            await _repo.UpdateAsync(product);
        }

        public Task DeleteProductAsync(int id) => _repo.DeleteAsync(id);
    }
}
