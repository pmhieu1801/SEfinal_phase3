using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineElectronicsStoreAPI.Data;
using OnlineElectronicsStoreAPI.Models;

namespace OnlineElectronicsStoreAPI.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _db;
        public ProductRepository(ApplicationDbContext db) => _db = db;

        public Task<List<Product>> GetAllAsync() =>
            _db.Products.AsNoTracking().ToListAsync();

        public Task<Product?> GetByIdAsync(int id) =>
            _db.Products.FirstOrDefaultAsync(p => p.Id == id);

        public async Task AddAsync(Product product)
        {
            await _db.Products.AddAsync(product);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Product product)
        {
            _db.Products.Update(product);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var p = await _db.Products.FindAsync(id);
            if (p != null)
            {
                _db.Products.Remove(p);
                await _db.SaveChangesAsync();
            }
        }

        public Task<Product?> FindByNameAsync(string name) =>
            _db.Products.FirstOrDefaultAsync(p => p.Name == name);
    }
}