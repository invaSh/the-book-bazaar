using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TheBookBazaar.Domain;

namespace TheBookBazaar.Persistance
{
    public class Seed
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
            var context = scope.ServiceProvider.GetRequiredService<AuthDataContext>();

            await context.Database.MigrateAsync(); 

            var roles = new (string Name, int Index, string Email, string UserName, string FullName)[]
            {
            ("Admin", 1, "admin@tbb.com", "tbb_admin", "Administrator"),
            ("Merchant", 2, "merchant@tbb.com", "tbb_merchant", "Merchant User"),
            ("User", 3, "user@tbb.com", "tbb_user", "Regular User")
            };

            foreach (var (name, index, email, username, fullName) in roles)
            {
                var role = await roleManager.FindByNameAsync(name);
                if (role == null)
                {
                    role = new AppRole
                    {
                        Name = name,
                        NormalizedName = name.ToUpper(),
                        Index = index
                    };
                    await roleManager.CreateAsync(role);
                }

                var user = await userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    user = new AppUser
                    {
                        UserName = username,
                        NormalizedUserName = username.ToUpper(),
                        Email = email,
                        NormalizedEmail = email.ToUpper(),
                        FullName = fullName,
                        EmailConfirmed = true
                    };

                    var result = await userManager.CreateAsync(user, "Tbb@1234");

                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, name);
                    }
                    else
                    {
                        throw new Exception($"Failed to create user {username}: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                    }
                }
            }
        }
    }
}
