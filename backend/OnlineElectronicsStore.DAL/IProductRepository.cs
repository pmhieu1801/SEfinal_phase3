using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineElectronicsStore.Domain.Models;

namespace OnlineElectronicsStore.DAL.Repositories
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int id);
        Task AddAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int id);
        Task<Product?> FindByNameAsync(string name);
    }
}
