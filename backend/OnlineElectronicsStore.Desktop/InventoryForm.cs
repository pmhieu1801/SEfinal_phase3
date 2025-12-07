using System;
using System.ComponentModel;
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
                // Gọi API lấy danh sách sản phẩm
                var products = await _api.GetProductsAsync();

                // Debug: Hiển thị số lượng sản phẩm lấy được từ API
                MessageBox.Show("Số lượng sản phẩm lấy được từ API: " + (products?.Count ?? 0));

                // Bind dữ liệu vào DataGridView
                _grid.DataSource = new BindingList<ProductDto>(products);
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
