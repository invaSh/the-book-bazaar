using Duende.IdentityServer.Models;

namespace IdentityService;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Email()
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("book_bazaar"),
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            new Client
            {
                ClientId = "book_bazaar_client",
                ClientName = "book_bazaar_client",
                AllowedGrantTypes = GrantTypes.Code,
                RedirectUris = { "https://localhost:5173/signin-oidc" },
                PostLogoutRedirectUris = { "https://localhost:5173/" },
                AllowedCorsOrigins = { "https://localhost:5173" },
                AllowedScopes = { "openid", "profile", "email", "book_bazaar" },
                ClientSecrets = { new Secret("secret".Sha256()) },
                RequirePkce = true,
            }
        };
}
