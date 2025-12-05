using System;
using System.Windows.Forms;

namespace OnlineElectronicsStore.Desktop
{
    public partial class LoginForm : Form
    {
        private readonly ApiClient _apiClient;
        public LoginForm()
        {
            InitializeComponent();
            _apiClient = new ApiClient();
        }

        private TextBox txtEmail;
        private TextBox txtPassword;
        private Button btnLogin;

        private void InitializeComponent()
        {
            this.txtEmail = new TextBox() { PlaceholderText = "Email", Width = 250, Top = 10, Left = 10 };
            this.txtPassword = new TextBox() { PlaceholderText = "Password", UseSystemPasswordChar = true, Width = 250, Top = 40, Left = 10 };
            this.btnLogin = new Button() { Text = "Login", Top = 80, Left = 10 };
            this.btnLogin.Click += BtnLogin_Click;
            this.ClientSize = new System.Drawing.Size(280, 130);
            this.Controls.Add(txtEmail);
            this.Controls.Add(txtPassword);
            this.Controls.Add(btnLogin);
            this.Text = "AWE Desktop - Login";
        }

        private async void BtnLogin_Click(object sender, EventArgs e)
        {
            btnLogin.Enabled = false;
            try
            {
                var email = txtEmail.Text.Trim();
                var password = txtPassword.Text.Trim();
                var result = await _apiClient.LoginAsync(email, password);
                if (result.Success)
                {
                    MessageBox.Show("Login success!");
                    var main = new InventoryForm(_apiClient);
                    main.Show();
                    this.Hide();
                }
                else
                {
                    MessageBox.Show("Login failed: " + result.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
            finally
            {
                btnLogin.Enabled = true;
            }
        }
    }
}