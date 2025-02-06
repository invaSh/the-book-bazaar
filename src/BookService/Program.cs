using BookService.Persistance;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

  builder.Services.AddDbContext<DataContext>( o=>
  {
      o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
  });

var app = builder.Build();


app.UseHttpsRedirection();

app.Run();
 