using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class RegisterDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    [Required]
    [MaxLength(100)]
    public   string Username { get; set; } =string.Empty;
    [Required]
    [StringLength(8,MinimumLength =4)]
    public  string Password {get; set;} = string.Empty;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
   
}
