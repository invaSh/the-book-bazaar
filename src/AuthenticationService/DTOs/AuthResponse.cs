﻿using AuthenticationService.Models;

namespace AuthenticationService.DTOs
{
    public class AuthResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
