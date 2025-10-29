import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  status?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
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

  // Fetch all data on mount
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

  const handleDeletePet = async (id: string) => {
    try {
      await petsAPI.delete(id);
      setPets(pets.filter(p => p.id !== id));
      toast.success("Pet deleted successfully");
    } catch (error) {
      toast.error("Failed to delete pet");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await productsAPI.delete(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
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
      change: `${pets.filter(p => p.status === 'Available').length} available`,
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
                  <Button variant="secondary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Pet
                  </Button>
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
                          No pets found
                        </TableCell>
                      </TableRow>
                    ) : (
                      pets.map((pet) => (
                        <TableRow key={pet.id}>
                          <TableCell className="font-medium">{pet.name}</TableCell>
                          <TableCell>{pet.breed}</TableCell>
                          <TableCell>{pet.age} years</TableCell>
                          <TableCell>
                            <Badge variant={pet.status === "Available" ? "default" : "secondary"}>
                              {pet.status || "Available"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeletePet(pet.id)}
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
                  <Button variant="secondary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
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
                          No products found
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
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteProduct(product.id)}
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
    </div>
  );
};

export default AdminDashboard;