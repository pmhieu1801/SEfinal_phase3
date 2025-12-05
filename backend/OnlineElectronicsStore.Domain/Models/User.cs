namespace OnlineElectronicsStore.Domain.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string. Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public string Role { get; set; } = "Customer"; // Customer, Admin
    public DateTime CreatedAt { get; set; }
}
