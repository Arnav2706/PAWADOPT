import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import { productsAPI } from "@/lib/api";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  image: string;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.getAll();
        setProducts(data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to load products');
        toast.error('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-destructive mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-secondary hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Pet Supplies Shop</h1>
            <p className="text-muted-foreground text-lg">
              Everything your pet needs, all in one place ({products.length} products)
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
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchTerm 
                ? "No products found. Try a different search term." 
                : "No products available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;