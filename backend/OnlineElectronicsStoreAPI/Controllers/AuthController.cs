using Microsoft.AspNetCore.Mvc;
using OnlineElectronicsStore.Domain.Models; // hoặc namespace phù hợp với User

namespace OnlineElectronicsStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest req)
        {
            // Đoạn này bạn nên check với DB thực tế. Đây chỉ là ví dụ hardcode:
            if (req.Email == "datpai@awe.staff.org.au" && req.Password == "123")
            {
                return Ok(new { message = "Login successful", token = "fake-token" });
            }
            return Unauthorized(new { message = "Invalid credentials" });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
}