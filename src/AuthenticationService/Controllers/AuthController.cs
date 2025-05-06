using AuthenticationService.Data;
using AuthenticationService.Models;
using AuthenticationService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AuthController(TokenService tokenService, UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration config)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
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

            Response.Cookies.Append("jwt", refreshToken, new CookieOptions
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
        public IActionResult Logout()
        {
            Response.Cookies.Delete("refreshToken");
            return Ok();
        }


        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["jwt"];
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

    }
}
