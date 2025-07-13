using Microsoft.AspNetCore.Identity;

namespace TheBookBazaar.Domain
{
    public class AppRole : IdentityRole
    {
        public int Index { get; set; }
    }
}
