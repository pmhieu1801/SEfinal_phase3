using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace OnlineElectronicsStore.Desktop
{
    public class LoginResult
    {
        public bool Success { get; set; }
        public string Token { get; set; }
        public string Error { get; set; }
    }

    public class ApiClient
    {
        private readonly HttpClient _client;
        public string BaseUrl { get; set; } = "http://localhost:5000/api/Auth/";

        public ApiClient()
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri(BaseUrl);
        }

        public async Task<LoginResult> LoginAsync(string email, string password)
        {
            try
            {
                // Defensive: backend auth endpoint may not exist; handle errors gracefully
                var resp = await _client.PostAsJsonAsync("login", new { email, password });
                if (!resp.IsSuccessStatusCode)
                {
                    return new LoginResult { Success = false, Error = $"Status {resp.StatusCode}" };
                }
                var data = await resp.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
                string token = "";
                if (data.TryGetProperty("token", out var tokenProp))
                {
                    token = tokenProp.GetString() ?? "";
                }
                if (!string.IsNullOrEmpty(token)) _client.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                return new LoginResult { Success = true, Token = token };
            }
            catch (Exception ex)
            {
                return new LoginResult { Success = false, Error = ex.Message };
            }
        }

        public async Task<List<ProductDto>> GetProductsAsync()
        {
            try
            {
                var resp = await _client.GetFromJsonAsync<List<ProductDto>>("/api/Products"); // hoặc "/api/products" nếu route backend
                return resp ?? new List<ProductDto>();
            }
            catch
            {
                return new List<ProductDto>();
            }
        }
    }
}
