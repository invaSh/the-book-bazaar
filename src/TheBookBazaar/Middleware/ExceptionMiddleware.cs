using System.Net;
using System.Text.Json;
using TheBookBazaar.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (StatusException ex)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)ex.Code;

            var result = JsonSerializer.Serialize(ex.Errors, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            await context.Response.WriteAsync(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception");

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var result = JsonSerializer.Serialize(new
            {
                status = "ServerError",
                error = ex.Message
            });

            await context.Response.WriteAsync(result);
        }
    }
}
