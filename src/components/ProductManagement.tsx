import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Product } from '../types/product';
import { toast } from 'sonner@2.0.3';

interface ProductManagementProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onAddProduct: (product: Product) => void;
}

export function ProductManagement({ products, onUpdateProduct, onDeleteProduct, onAddProduct }: ProductManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    category: '',
    image: '',
    rating: 5,
    reviews: 0,
    inStock: true,
    description: '',
    specs: [],
    stockQuantity: 0,
  });

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddDialog = () => {
    setFormData({
      name: '',
      price: 0,
      originalPrice: 0,
      category: '',
      image: '',
      rating: 5,
      reviews: 0,
      inStock: true,
      description: '',
      specs: [],
      stockQuantity: 0,
    });
    setEditingProduct(null);
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (product: Product) => {
    setFormData(product);
    setEditingProduct(product);
    setIsAddDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.category || formData.price === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingProduct) {
      // Update existing product
      onUpdateProduct({ ...editingProduct, ...formData } as Product);
      toast.success('Product updated successfully');
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name || '',
        price: formData.price || 0,
        originalPrice: formData.originalPrice,
        category: formData.category || '',
        image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        rating: formData.rating || 5,
        reviews: formData.reviews || 0,
        inStock: formData.inStock ?? true,
        description: formData.description || '',
        specs: formData.specs || [],
        stockQuantity: formData.stockQuantity || 0,
        badge: formData.badge,
      };
      onAddProduct(newProduct);
      toast.success('Product added successfully');
    }
    
    setIsAddDialogOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    onDeleteProduct(id);
    toast.success('Product deleted successfully');
  };

  const handleSpecsChange = (value: string) => {
    const specs = value.split('\n').filter(s => s.trim() !== '');
    setFormData({ ...formData, specs });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>Manage your store's product inventory</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenAddDialog} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                  <DialogDescription>
                    {editingProduct ? 'Update product information' : 'Add a new product to your inventory'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="originalPrice">Original Price</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.originalPrice || ''}
                        onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || undefined })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g., Laptops, Audio"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stockQuantity">Stock Quantity</Label>
                      <Input
                        id="stockQuantity"
                        type="number"
                        value={formData.stockQuantity || 0}
                        onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Product description"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="specs">Specifications (one per line)</Label>
                    <Textarea
                      id="specs"
                      value={(formData.specs || []).join('\n')}
                      onChange={(e) => handleSpecsChange(e.target.value)}
                      placeholder="Intel Core i7&#10;16GB RAM&#10;512GB SSD"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="badge">Badge</Label>
                      <Input
                        id="badge"
                        value={formData.badge || ''}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value || undefined })}
                        placeholder="e.g., New, Sale, Popular"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <Switch
                        id="inStock"
                        checked={formData.inStock}
                        onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
                      />
                      <Label htmlFor="inStock">In Stock</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProduct}>
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Products Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div>
                            <p className="line-clamp-1">{product.name}</p>
                            {product.badge && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div>
                          <p>${product.price.toFixed(2)}</p>
                          {product.originalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              ${product.originalPrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={
                          (product.stockQuantity || 0) === 0 ? 'text-red-600' :
                          (product.stockQuantity || 0) < 10 ? 'text-orange-600' :
                          'text-green-600'
                        }>
                          {product.stockQuantity || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.inStock ? 'default' : 'secondary'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleOpenEditDialog(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
