using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TheBookBazaar.Domain;

namespace TheBookBazaar.Persistance
{
    public class AuthDataContext : IdentityDbContext<AppUser>
    {
        public AuthDataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppRole>()
                .HasIndex(r => r.Index)
                .IsUnique();
        }

    }
}
