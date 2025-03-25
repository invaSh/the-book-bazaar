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

            var roles = new (string Name, int Index)[]
            {
                ("Admin", 1),
                ("TechSupport", 2),
                ("Agent", 3),
                ("Merchant", 4),
                ("User", 5)
            };

            foreach (var role in roles)
            {
                var exists = await roleManager.RoleExistsAsync(role.Name);

                if (!exists)
                {
                    var newRole = new Role
                    {
                        Name = role.Name,
                        NormalizedName = role.Name.ToUpper(),
                        Index = role.Index
                    };

                    var result = await roleManager.CreateAsync(newRole);

                    if (result.Succeeded)
                    {
                        Console.WriteLine($"Created role: {role.Name} with index: {role.Index}");
                    }
                    else
                    {
                        Console.WriteLine($"Failed to create role {role.Name}:");
                        foreach (var error in result.Errors)
                        {
                            Console.WriteLine($"- {error.Description}");
                        }
                    }
                }
                else
                {
                    Console.WriteLine($"Role {role.Name} already exists");
                }
            }

            var adminEmail = "admin@tbb.com";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                var newAdmin = new User
                {
                    Email = adminEmail,
                    UserName = "tbb_admin",
                    FullName = "Administrator",
                    EmailConfirmed = true,
                };

                var result = await userManager.CreateAsync(newAdmin, "Admin@123"); 

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(newAdmin, "Admin");
                    Console.WriteLine("Admin user created and added to Admin role.");
                }
                else
                {
                    Console.WriteLine("Failed to create admin user:");
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine($"- {error.Description}");
                    }
                }
            }
            else
            {
                Console.WriteLine("Admin user already exists.");
            }
        }
    }
}
