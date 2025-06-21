using AuthenticationService.Data;
using AuthenticationService.Models;
using AuthenticationService.Services;
using AuthenticationService.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using AuthenticationService.Migrations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace AuthenticationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<Role> _roleManager;

        public AuthController(TokenService tokenService, UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration config, RoleManager<Role> roleManager)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> SignUp(SignUpRequest req)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var emailCheck = await _userManager.FindByEmailAsync(req.Email);
            if (emailCheck != null) return BadRequest("Email is taken!");
            var nameCheck = await _userManager.FindByNameAsync(req.UserName);
            if (nameCheck != null) return BadRequest("Username is taken!");
            if (req.Password != req.ConfirmPassword) return BadRequest("Passwords do not match!");

            var user = new User
            {
                UserName = req.UserName,
                FullName = req.Email,
                Email = req.Email,
            };

            var result = await _userManager.CreateAsync(user, req.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var tokens = await _tokenService.GenerateTokens(user);

            Response.Cookies.Append("token", tokens.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(
                    Environment.GetEnvironmentVariable("Jwt__RefreshTokenExpiryDays")))
            });

            return Ok(new { AccessToken = tokens.AccessToken });
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignIn (LoginRequest req)
        {
            var user = await _userManager.FindByEmailAsync(req.Email);

            if(user == null) return Unauthorized("Invalid credentials!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, req.Password, false);

            if (!result.Succeeded) return Unauthorized("Invalid credentials!");

            var tokens = await _tokenService.GenerateTokens(user);

            var refreshToken = tokens.RefreshToken;
            var accessToken = tokens.AccessToken;

            Response.Cookies.Append("token", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(
                    Environment.GetEnvironmentVariable("Jwt__RefreshTokenExpiryDays")))
            }); 

            return Ok(new { AccessToken = accessToken });
        }

        [HttpPost("sign-out")]
        public async Task<IActionResult> Logout()
        {
            Console.WriteLine($"================================>Deleting refresh token...");
            var refreshToken = Request.Cookies["token"];
            Console.WriteLine($"================================>Refresh token: {refreshToken}");
            if (!string.IsNullOrEmpty(refreshToken))
            {
                await _tokenService.DeleteSession(refreshToken);
                Response.Cookies.Delete("token");
            }
            Console.WriteLine($"=========================>Cookie after deletion: {Request.Cookies["token"]}");
            return Ok("Sign out successful!");
        }


        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["token"];
            if (refreshToken == null) return Unauthorized( new { message = "Refresh token null, Please log in again!"});

            var verifyToken = await _tokenService.VerifyRefreshToken(refreshToken);
            if (verifyToken == null) return Unauthorized(new { message = "Verify token null, Please log in again!" });

            if (verifyToken.Expires < DateTime.UtcNow) return Unauthorized(new { message = "Your session has expired. Please log in again." });

            var user = await _userManager.FindByIdAsync(verifyToken.UserId);
            if (user == null) return Unauthorized(new { message = "User null, Please log in again!" });
            var roles = await _userManager.GetRolesAsync(user);

            var accessToken = _tokenService.GenerateAccessToken(user, roles);

            return Ok(new { AccessToken = accessToken });
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("select-activity/{activity}")]
        public async Task<IActionResult> SelectActivity(int activity)
        {
            var user = await _userManager.GetUserAsync(User);

            var role = _roleManager.Roles.FirstOrDefault(r => r.Index == activity);
            if (role == null) return BadRequest("Something went wrong.");
            await _userManager.AddToRoleAsync(user, role.Name);
            return Ok(user);
        }
    }
}
