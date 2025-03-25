using Microsoft.AspNetCore.Identity;

namespace AuthenticationService.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
    }
}
