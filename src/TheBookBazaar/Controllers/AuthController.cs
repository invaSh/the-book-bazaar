﻿using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TheBookBazaar.Application.Auth;
using TheBookBazaar.DTOs;
using TheBookBazaar.Services;
namespace TheBookBazaar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly TokenService _tokenService;

        public AuthController(IMediator mediator, TokenService tokenService)
        {
            _mediator = mediator;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(Register.Command command)
        {
            var user = await _mediator.Send(command);
            var tokens = await _tokenService.GenerateTokens(user);
            Response.Cookies.Append("token", tokens.AccessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(
                   Environment.GetEnvironmentVariable("Jwt__AccessTokenExpiryMinutes")))
            });
            Response.Cookies.Append("refresh", tokens.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(
                   Environment.GetEnvironmentVariable("Jwt__RefreshTokenExpiryDays")))
            });
            return StatusCode(201, new { AccessToken = tokens.AccessToken });
        }

        [HttpPost("sign-in")]
        public async Task<ActionResult> SignIn(SignIn.Command command)
        {
            var user = await _mediator.Send(command);
            var tokens = await _tokenService.GenerateTokens(user);
            Response.Cookies.Append("token", tokens.AccessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(
               Environment.GetEnvironmentVariable("Jwt__AccessTokenExpiryMinutes")))
            });
            Response.Cookies.Append("refresh", tokens.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(
                   Environment.GetEnvironmentVariable("Jwt__RefreshTokenExpiryDays")))
            });

            return StatusCode(200, new { AccessToken = tokens.AccessToken });
        }


        [HttpPost("sign-out")]
        public async Task<IActionResult> Logout()
        {
            Console.WriteLine($"================================>Deleting refresh token...");
            var refreshToken = Request.Cookies["refresh"];
            Console.WriteLine($"================================>Refresh token: {refreshToken}");
            if (!string.IsNullOrEmpty(refreshToken))
            {
                await _tokenService.DeleteSession(refreshToken);
                Response.Cookies.Delete("refresh");
            }
            Console.WriteLine($"=========================>Cookie after deletion: {Request.Cookies["refresh"]}");
            return Ok("Sign out successful!");
        }


        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(Refresh.Query query)
        {
            var refreshToken = Request.Cookies["refresh"];
            if (refreshToken == null) return Unauthorized(new { message = "Refresh token null, Please log in again!" });

            var verifyToken = await _tokenService.VerifyRefreshToken(refreshToken);
            if (verifyToken == null) return Unauthorized(new { message = "Verify token null, Please log in again!" });

            if (verifyToken.Expires < DateTime.UtcNow) return Unauthorized(new { message = "Your session has expired. Please log in again." });

            query.VerifyToken = verifyToken;
            var user = await _mediator.Send(query);

            var accessToken = _tokenService.GenerateAccessToken(user.User, user.Roles);

            return Ok(new { AccessToken = accessToken });
        }

        [HttpPost("select-activity/{activity}")]
        public async Task<IActionResult> SelectActivity(int activity)
        {
            var tokens = await _mediator.Send(new SelectActivity.Command
            {
                ActivityIndex = activity,
                UserPrincipal = User
            });

            Response.Cookies.Append("refresh", tokens.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(
                    Convert.ToDouble(Environment.GetEnvironmentVariable("Jwt__RefreshTokenExpiryDays")))
            });

            return Ok(new { tokens.AccessToken });
        }


    }
}
