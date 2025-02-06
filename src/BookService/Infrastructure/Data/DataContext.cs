using BookService.Domain;
using Microsoft.EntityFrameworkCore;

namespace BookService.Infrastructure.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}
