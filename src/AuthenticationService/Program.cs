using AuthenticationService.Data;
using AuthenticationService.Models;
using AuthenticationService.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(o =>
{
    o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3001") 
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
builder.Services.AddScoped<TokenService>();


var envPath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", "..", ".env"));

DotNetEnv.Env.Load(envPath);

builder.Configuration.AddEnvironmentVariables();

// Debug: Is ENV var even loaded?
Console.WriteLine("From Environment.GetEnvironmentVariable:");
Console.WriteLine("Jwt__SecretKey: " + Environment.GetEnvironmentVariable("Jwt__SecretKey"));

// Debug: Is it inside builder.Configuration?
Console.WriteLine("From builder.Configuration:");
Console.WriteLine("Jwt__SecretKey: " + builder.Configuration["Jwt__SecretKey"]);

var jwtSettings = builder.Configuration;

//if (string.IsNullOrWhiteSpace(jwtSettings["Jwt__SecretKey"]))
//    throw new Exception("Missing Jwt__SecretKey from configuration.");

//if (string.IsNullOrWhiteSpace(jwtSettings["Jwt__ValidIssuer"]))
//    throw new Exception("Missing Jwt__ValidIssuer from configuration.");

//if (string.IsNullOrWhiteSpace(jwtSettings["Jwt__ValidAudience"]))
//    throw new Exception("Missing Jwt__ValidAudience from configuration.");


builder.Services.AddAuthentication(o =>
{
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Environment.GetEnvironmentVariable("Jwt__ValidIssuer"),
            ValidAudience = Environment.GetEnvironmentVariable("Jwt__ValidAudience"),
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("Jwt__SecretKey")))

        };
    });

builder.Services.AddAuthorization();
builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await Seed.SeedRoles(services);
    Console.WriteLine("Successfully seeded!..........");

}

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
