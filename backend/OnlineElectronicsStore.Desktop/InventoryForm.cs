using System;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace OnlineElectronicsStore.Desktop
{
    public class InventoryForm : Form
    {
        private readonly ApiClient _api;
        private DataGridView _grid;
        private Button _btnRefresh;

        public InventoryForm(ApiClient api)
        {
            _api = api;
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            this._grid = new DataGridView() { Dock = DockStyle.Top, Height = 300 };
            this._btnRefresh = new Button() { Text = "Refresh", Dock = DockStyle.Bottom };
            this._btnRefresh.Click += async (s, e) => await LoadProductsAsync();
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(_grid);
            this.Controls.Add(_btnRefresh);
            this.Text = "Inventory";
            this.Load += async (s, e) => await LoadProductsAsync();
        }

        private async Task LoadProductsAsync()
        {
            _btnRefresh.Enabled = false;
            try
            {
                var products = await _api.GetProductsAsync();
                _grid.DataSource = products;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Failed to load products: " + ex.Message);
            }
            finally
            {
                _btnRefresh.Enabled = true;
            }
        }
    }
}