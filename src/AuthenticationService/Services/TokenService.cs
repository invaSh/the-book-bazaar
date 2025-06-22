using AuthenticationService.Data;
using AuthenticationService.Models;
using AuthenticationService.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AuthenticationService.Services
{
    public class TokenService
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public TokenService(DataContext context, IConfiguration configuration, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<AuthResponse> GenerateTokens(User user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = await GenerateAccessToken(user, roles);
            var refreshToken = GenerateRefreshToken(user);

            var oldTokens = _context.RefreshTokens
                .Where(rt => rt.UserId == user.Id);
            _context.RefreshTokens.RemoveRange(oldTokens);
            
            var result = await _context.RefreshTokens.AddAsync(refreshToken);

            if (result == null)
            {
                throw new Exception("Refresh token is not being saved");
            }

            await _context.SaveChangesAsync();
            return new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
            };
        }

        public async Task<string> GenerateAccessToken(User user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("username", user.UserName), 
                new Claim("fullName", user.FullName) 
            };

            foreach (var roleName in roles)
            {
                var role = await _roleManager.FindByNameAsync(roleName);
                claims.Add(new Claim("role", role.Index.ToString()));
            }

            var secretKey = Environment.GetEnvironmentVariable("Jwt__SecretKey");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(Convert.ToDouble(
                Environment.GetEnvironmentVariable("Jwt__AccessTokenExpiryMinutes")));

            var token = new JwtSecurityToken(
                issuer: Environment.GetEnvironmentVariable("Jwt__ValidIssuer"),
                audience: Environment.GetEnvironmentVariable("Jwt__ValidAudience"),
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public RefreshToken GenerateRefreshToken(User user)
        {
            return new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(
                Environment.GetEnvironmentVariable("Jwt__RefreshTokenExpiryDays"))),
                Created = DateTime.UtcNow  ,
                UserId = user.Id,
                User = user
            };
        }

        public async Task<RefreshToken> VerifyRefreshToken(string refreshToken)
        {
            Console.WriteLine($"Refresh token from cookie: {refreshToken}");
            var tokenEntry = await _context.RefreshTokens.Include(x => x.User).FirstOrDefaultAsync(x => x.Token == refreshToken);
            if (tokenEntry == null) return null;
            return tokenEntry;
        }

        public async Task  DeleteSession(string refreshToken) 
        {
            var tokens = await _context.RefreshTokens
                .Where(rt => rt.Token == refreshToken)
                .ToListAsync();

            foreach (var token in tokens)
            {
                Console.WriteLine($"=========================>Token after fetcching in delete session: {token}");

            }
            if (tokens.Any())
            {
                _context.RefreshTokens.RemoveRange(tokens);
                await _context.SaveChangesAsync();
            }
        }

    }
}
