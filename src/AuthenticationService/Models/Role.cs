using Microsoft.AspNetCore.Identity;

namespace AuthenticationService.Models
{
    public class Role  : IdentityRole
    {
        public int Index { get; set; }
        public Role() : base() { }

        public Role(string roleName) : base(roleName) { }

        public Role(string roleName, int index) : base(roleName)
        {
            Index = index;
        }
    }
}
