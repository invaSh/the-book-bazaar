using Microsoft.AspNetCore.Identity;

namespace TheBookBazaar.Domain
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }
    }
}
