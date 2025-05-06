using AuthenticationService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationService.Data
{
    public class Seed
    {
        public static async Task SeedRoles(IServiceProvider serviceProvider)
        {
            Console.WriteLine("Starting seed..........");
            using var scope = serviceProvider.CreateScope();

            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
            var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();

            var roles = new (string Name, int Index, string Email, string UserName, string FullName)[]
            {
                ("Admin", 1, "admin@tbb.com", "tbb_admin", "Administrator"),
                ("TechSupport", 2, "support@tbb.com", "tbb_support", "Tech Support"),
                ("Agent", 3, "agent@tbb.com", "tbb_agent", "Agent User"),
                ("Merchant", 4, "merchant@tbb.com", "tbb_merchant", "Merchant User"),
                ("User", 5, "user@tbb.com", "tbb_user", "Regular User")
            };

            foreach (var role in roles)
            {
                var roleExists = await roleManager.RoleExistsAsync(role.Name);

                if (!roleExists)
                {
                    var newRole = new Role
                    {
                        Name = role.Name,
                        NormalizedName = role.Name.ToUpper(),
                        Index = role.Index
                    };

                    var roleResult = await roleManager.CreateAsync(newRole);

                    if (roleResult.Succeeded)
                    {
                        Console.WriteLine($"Created role: {role.Name} with index: {role.Index}");
                    }
                    else
                    {
                        Console.WriteLine($"Failed to create role {role.Name}:");
                        foreach (var error in roleResult.Errors)
                        {
                            Console.WriteLine($"- {error.Description}");
                        }
                    }
                }
                else
                {
                    Console.WriteLine($"Role {role.Name} already exists");
                }

                var userExists = await userManager.FindByEmailAsync(role.Email);
                if (userExists == null)
                {
                    var newUser = new User
                    {
                        Email = role.Email,
                        UserName = role.UserName,
                        FullName = role.FullName,
                        EmailConfirmed = true,
                    };

                    var userResult = await userManager.CreateAsync(newUser, "Password@123");

                    if (userResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(newUser, role.Name);
                        Console.WriteLine($"User {role.UserName} created and added to {role.Name} role.");
                    }
                    else
                    {
                        Console.WriteLine($"Failed to create user {role.UserName}:");
                        foreach (var error in userResult.Errors)
                        {
                            Console.WriteLine($"- {error.Description}");
                        }
                    }
                }
                else
                {
                    Console.WriteLine($"User {role.UserName} already exists.");
                }
            }
        }
    }
}
