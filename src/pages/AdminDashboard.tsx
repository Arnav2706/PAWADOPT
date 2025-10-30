import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  LayoutDashboard,
  Dog,
  ShoppingBag,
  Package,
  Users,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { petsAPI, productsAPI, ordersAPI, adoptionAPI } from "@/lib/api";

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  type: string;
  gender?: string;
  description?: string;
  imageUrl?: string;
  adopted?: boolean;
  status?: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stock?: number;
}

interface Order {
  id: string;
  customer?: string;
  totalAmount: number;
  status: string;
}

interface Adoption {
  id: string;
  petId: string;
  petName?: string;
  name: string;
  contact: string;
  reason: string;
  status: string;
}

const AdminDashboard = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Delete confirmation states
  const [deleteTarget, setDeleteTarget] = useState<{type: 'pet' | 'product', id: string, name: string} | null>(null);
  
  // Form states
  const [petForm, setPetForm] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
    description: "",
    imageUrl: "",
    adopted: false
  });
  
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: ""
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [petsData, productsData, ordersData, adoptionsData] = await Promise.all([
        petsAPI.getAll().catch(() => []),
        productsAPI.getAll().catch(() => []),
        ordersAPI.getAll().catch(() => []),
        adoptionAPI.getAll().catch(() => []),
      ]);

      setPets(petsData || []);
      setProducts(productsData || []);
      setOrders(ordersData || []);
      setAdoptions(adoptionsData || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Pet form handlers
  const handleAddPet = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const petData = {
        name: petForm.name,
        type: petForm.type,
        breed: petForm.breed,
        age: parseInt(petForm.age),
        gender: petForm.gender || undefined,
        description: petForm.description || undefined,
        imageUrl: petForm.imageUrl || undefined,
        adopted: petForm.adopted
      };
      
      await petsAPI.create(petData);
      toast.success(`${petForm.name} added successfully!`);
      
      // Reset form and close modal
      setPetForm({
        name: "",
        type: "",
        breed: "",
        age: "",
        gender: "",
        description: "",
        imageUrl: "",
        adopted: false
      });
      setIsPetModalOpen(false);
      
      // Refresh pets list
      const updatedPets = await petsAPI.getAll();
      setPets(updatedPets || []);
    } catch (error: any) {
      console.error('Error adding pet:', error);
      toast.error(error.message || 'Failed to add pet');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Product form handlers
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const productData = {
        name: productForm.name,
        description: productForm.description || undefined,
        price: parseFloat(productForm.price),
        imageUrl: productForm.imageUrl || undefined
      };
      
      await productsAPI.create(productData);
      toast.success(`${productForm.name} added successfully!`);
      
      // Reset form and close modal
      setProductForm({
        name: "",
        description: "",
        price: "",
        imageUrl: ""
      });
      setIsProductModalOpen(false);
      
      // Refresh products list
      const updatedProducts = await productsAPI.getAll();
      setProducts(updatedProducts || []);
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error(error.message || 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete handlers
  const handleDeletePet = async () => {
    if (!deleteTarget || deleteTarget.type !== 'pet') return;
    
    try {
      await petsAPI.delete(deleteTarget.id);
      setPets(pets.filter(p => p.id !== deleteTarget.id));
      toast.success(`${deleteTarget.name} deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete pet");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteTarget || deleteTarget.type !== 'product') return;
    
    try {
      await productsAPI.delete(deleteTarget.id);
      setProducts(products.filter(p => p.id !== deleteTarget.id));
      toast.success(`${deleteTarget.name} deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleUpdateAdoptionStatus = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
      await adoptionAPI.updateStatus(id, status);
      setAdoptions(adoptions.map(a => 
        a.id === id ? { ...a, status } : a
      ));
      toast.success(`Adoption request ${status.toLowerCase()}`);
    } catch (error) {
      toast.error("Failed to update adoption status");
    }
  };

  const stats = [
    {
      title: "Total Pets",
      value: pets.length.toString(),
      icon: Dog,
      change: `${pets.filter(p => !p.adopted).length} available`,
    },
    {
      title: "Products",
      value: products.length.toString(),
      icon: ShoppingBag,
      change: "Active listings",
    },
    {
      title: "Orders",
      value: orders.length.toString(),
      icon: Package,
      change: `${orders.filter(o => o.status === 'Pending').length} pending`,
    },
    {
      title: "Adoption Requests",
      value: adoptions.length.toString(),
      icon: Users,
      change: `${adoptions.filter(a => a.status === 'Pending').length} pending`,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-secondary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-8 w-8 text-secondary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Management Tabs */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pets" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pets">Pets</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="adoptions">Adoptions</TabsTrigger>
              </TabsList>

              {/* Pets Tab */}
              <TabsContent value="pets">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Manage Pets</h3>
                  
                  <Dialog open={isPetModalOpen} onOpenChange={setIsPetModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Pet
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Pet</DialogTitle>
                        <DialogDescription>
                          Fill in the details to add a new pet to the adoption list
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="pet-name">Name *</Label>
                            <Input
                              id="pet-name"
                              value={petForm.name}
                              onChange={(e) => setPetForm({...petForm, name: e.target.value})}
                              placeholder="e.g., Max"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="pet-type">Type *</Label>
                            <Input
                              id="pet-type"
                              value={petForm.type}
                              onChange={(e) => setPetForm({...petForm, type: e.target.value})}
                              placeholder="e.g., Dog, Cat"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="pet-breed">Breed *</Label>
                            <Input
                              id="pet-breed"
                              value={petForm.breed}
                              onChange={(e) => setPetForm({...petForm, breed: e.target.value})}
                              placeholder="e.g., Golden Retriever"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="pet-age">Age (years) *</Label>
                            <Input
                              id="pet-age"
                              type="number"
                              value={petForm.age}
                              onChange={(e) => setPetForm({...petForm, age: e.target.value})}
                              placeholder="e.g., 2"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="pet-gender">Gender</Label>
                          <Input
                            id="pet-gender"
                            value={petForm.gender}
                            onChange={(e) => setPetForm({...petForm, gender: e.target.value})}
                            placeholder="e.g., Male, Female"
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="pet-description">Description</Label>
                          <Textarea
                            id="pet-description"
                            value={petForm.description}
                            onChange={(e) => setPetForm({...petForm, description: e.target.value})}
                            placeholder="Tell us about this pet..."
                            rows={3}
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="pet-image">Image URL</Label>
                          <Input
                            id="pet-image"
                            type="url"
                            value={petForm.imageUrl}
                            onChange={(e) => setPetForm({...petForm, imageUrl: e.target.value})}
                            placeholder="https://example.com/image.jpg"
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="pet-adopted"
                            checked={petForm.adopted}
                            onCheckedChange={(checked) => 
                              setPetForm({...petForm, adopted: checked as boolean})
                            }
                            disabled={isSubmitting}
                          />
                          <Label htmlFor="pet-adopted" className="cursor-pointer">
                            Mark as adopted
                          </Label>
                        </div>
                        
                        <div className="flex justify-end gap-3 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsPetModalOpen(false)}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </Button>
                          <Button variant="secondary" onClick={handleAddPet} disabled={isSubmitting}>
                            {isSubmitting ? "Adding..." : "Add Pet"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Breed</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No pets found. Add your first pet!
                        </TableCell>
                      </TableRow>
                    ) : (
                      pets.map((pet) => (
                        <TableRow key={pet.id}>
                          <TableCell className="font-medium">{pet.name}</TableCell>
                          <TableCell>{pet.breed}</TableCell>
                          <TableCell>{pet.age} years</TableCell>
                          <TableCell>
                            <Badge variant={pet.adopted ? "outline" : "default"}>
                              {pet.adopted ? "Adopted" : "Available"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" title="Edit">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteTarget({type: 'pet', id: pet.id, name: pet.name})}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Manage Products</h3>
                  
                  <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                          Fill in the details to add a new product to the shop
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="product-name">Product Name *</Label>
                          <Input
                            id="product-name"
                            value={productForm.name}
                            onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                            placeholder="e.g., Premium Dog Food"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="product-description">Description</Label>
                          <Textarea
                            id="product-description"
                            value={productForm.description}
                            onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                            placeholder="Describe the product..."
                            rows={3}
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="product-price">Price (Rs) *</Label>
                          <Input
                            id="product-price"
                            type="number"
                            step="0.01"
                            value={productForm.price}
                            onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                            placeholder="e.g., 45.99"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="product-image">Image URL</Label>
                          <Input
                            id="product-image"
                            type="url"
                            value={productForm.imageUrl}
                            onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})}
                            placeholder="https://example.com/product.jpg"
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div className="flex justify-end gap-3 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsProductModalOpen(false)}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </Button>
                          <Button variant="secondary" onClick={handleAddProduct} disabled={isSubmitting}>
                            {isSubmitting ? "Adding..." : "Add Product"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          No products found. Add your first product!
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>Rs {product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.stock || 'N/A'}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" title="Edit">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteTarget({type: 'product', id: product.id, name: product.name})}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <h3 className="text-lg font-semibold mb-4">View Orders</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          No orders found
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer || 'N/A'}</TableCell>
                          <TableCell>Rs {order.totalAmount?.toFixed(2) || '0.00'}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "Completed"
                                  ? "default"
                                  : order.status === "Pending"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* Adoptions Tab */}
              <TabsContent value="adoptions">
                <h3 className="text-lg font-semibold mb-4">Adoption Requests</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pet Name</TableHead>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adoptions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No adoption requests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      adoptions.map((adoption) => (
                        <TableRow key={adoption.id}>
                          <TableCell className="font-medium">
                            {adoption.petName || `Pet #${adoption.petId}`}
                          </TableCell>
                          <TableCell>{adoption.name}</TableCell>
                          <TableCell>{adoption.contact}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                adoption.status === "Approved"
                                  ? "default"
                                  : adoption.status === "Pending"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {adoption.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {adoption.status === "Pending" && (
                              <div className="flex gap-2">
                                <Button 
                                  variant="secondary" 
                                  size="sm"
                                  onClick={() => handleUpdateAdoptionStatus(adoption.id, "Approved")}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateAdoptionStatus(adoption.id, "Rejected")}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{deleteTarget?.name}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteTarget?.type === 'pet' ? handleDeletePet : handleDeleteProduct}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;