﻿namespace AuthenticationService.DTOs
{
    public class SignUpRequest
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string FullName { get; set; }
    }
}
