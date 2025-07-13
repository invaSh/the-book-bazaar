using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TheBookBazaar.Domain;
using TheBookBazaar.Persistance;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<AuthDataContext>(o =>
{
    o.UseNpgsql(builder.Configuration.GetConnectionString("AuthConnection"));
});

builder.Services.AddIdentity<AppUser, AppRole>()
.AddEntityFrameworkStores<AuthDataContext>()
.AddDefaultTokenProviders();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    await Seed.SeedAsync(scope.ServiceProvider);
}

app.Run();
