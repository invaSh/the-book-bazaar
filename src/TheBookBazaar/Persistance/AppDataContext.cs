using Microsoft.EntityFrameworkCore;
using TheBookBazaar.Domain;

namespace TheBookBazaar.Persistance
{
    public class AppDataContext : DbContext
    {
        public AppDataContext(DbContextOptions<AppDataContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Marketplace> Marketplaces { get; set; }
    }
}
