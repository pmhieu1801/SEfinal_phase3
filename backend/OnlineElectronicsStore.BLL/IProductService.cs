using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineElectronicsStore.Domain.Models;

namespace OnlineElectronicsStore.BLL.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetProductsAsync();
        Task<Product?> GetProductAsync(int id);
        Task<Product> CreateProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(int id);
    }
}
