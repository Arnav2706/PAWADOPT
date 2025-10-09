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

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Pets",
      value: "24",
      icon: Dog,
      change: "+3 this week",
    },
    {
      title: "Products",
      value: "156",
      icon: ShoppingBag,
      change: "+12 this month",
    },
    {
      title: "Orders",
      value: "89",
      icon: Package,
      change: "23 pending",
    },
    {
      title: "Adoption Requests",
      value: "47",
      icon: Users,
      change: "15 pending",
    },
  ];

  const mockPets = [
    { id: "1", name: "Max", breed: "Golden Retriever", age: 2, status: "Available" },
    { id: "2", name: "Luna", breed: "Persian Cat", age: 1, status: "Available" },
    { id: "3", name: "Charlie", breed: "Labrador", age: 3, status: "Adopted" },
  ];

  const mockProducts = [
    { id: "1", name: "Premium Dog Food", price: "$45.99", stock: 50 },
    { id: "2", name: "Cat Scratching Post", price: "$29.99", stock: 30 },
    { id: "3", name: "Pet Bed Cushion", price: "$39.99", stock: 25 },
  ];

  const mockOrders = [
    { id: "ORD-001", customer: "John Doe", total: "$89.97", status: "Completed" },
    { id: "ORD-002", customer: "Jane Smith", total: "$45.99", status: "Pending" },
    { id: "ORD-003", customer: "Bob Johnson", total: "$129.98", status: "Shipped" },
  ];

  const mockAdoptions = [
    { id: "1", petName: "Max", applicant: "Sarah Williams", status: "Pending" },
    { id: "2", petName: "Luna", applicant: "Michael Brown", status: "Approved" },
    { id: "3", petName: "Rocky", applicant: "Emma Davis", status: "Under Review" },
  ];

  const handleDelete = (type: string, id: string) => {
    toast.success(`${type} deleted successfully`);
  };

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
                    {mockPets.map((pet) => (
                      <TableRow key={pet.id}>
                        <TableCell className="font-medium">{pet.name}</TableCell>
                        <TableCell>{pet.breed}</TableCell>
                        <TableCell>{pet.age} years</TableCell>
                        <TableCell>
                          <Badge
                            variant={pet.status === "Available" ? "default" : "secondary"}
                          >
                            {pet.status}
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
                              onClick={() => handleDelete("Pet", pet.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
                    {mockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.stock} units</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete("Product", product.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.total}</TableCell>
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
                    ))}
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
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAdoptions.map((adoption) => (
                      <TableRow key={adoption.id}>
                        <TableCell className="font-medium">{adoption.petName}</TableCell>
                        <TableCell>{adoption.applicant}</TableCell>
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
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm">
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
