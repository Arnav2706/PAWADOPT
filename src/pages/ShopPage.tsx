import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock products data
  const mockProducts = [
    {
      id: "1",
      name: "Premium Dog Food",
      price: 45.99,
      category: "Food",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500",
    },
    {
      id: "2",
      name: "Cat Scratching Post",
      price: 29.99,
      category: "Toys",
      image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500",
    },
    {
      id: "3",
      name: "Pet Bed Cushion",
      price: 39.99,
      category: "Beds",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500",
    },
    {
      id: "4",
      name: "Interactive Dog Toy",
      price: 19.99,
      category: "Toys",
      image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=500",
    },
    {
      id: "5",
      name: "Cat Litter Box",
      price: 34.99,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=500",
    },
    {
      id: "6",
      name: "Pet Grooming Kit",
      price: 49.99,
      category: "Grooming",
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=500",
    },
  ];

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Pet Supplies Shop</h1>
            <p className="text-muted-foreground text-lg">
              Everything your pet needs, all in one place
            </p>
          </div>
          <Link to="/cart">
            <Button variant="secondary" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Go to Cart
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
