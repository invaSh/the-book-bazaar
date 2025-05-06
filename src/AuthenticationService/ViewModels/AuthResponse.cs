using AuthenticationService.Models;

namespace AuthenticationService.ViewModels
{
    public class AuthResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
