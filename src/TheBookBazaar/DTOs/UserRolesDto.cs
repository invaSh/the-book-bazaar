using TheBookBazaar.Domain;

namespace TheBookBazaar.DTOs
{
    public class UserRolesDto
    {
        public AppUser User { get; set; }
        public List<string> Roles { get; set; }
    }
}
