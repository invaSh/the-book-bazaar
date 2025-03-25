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
        public AuthController(TokenService tokenService, UserManager<User> userManager, SignInManager<User> signInManager)
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

            return Ok(new
            {
                accessToken = tokens.AccessToken,
                refreshToken = tokens.RefreshToken
            });
        }
    }
}
