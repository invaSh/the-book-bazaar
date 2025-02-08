using InventoryService.Domain;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Infrastructure
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<InventoryItem> InventoryItems { get; set; }
        public DbSet<Book> Books { get; set; }
    }
}
