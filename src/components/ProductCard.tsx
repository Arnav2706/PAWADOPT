import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string; // optional for safety
  imageUrl?: string; // backend field
  category?: string;
}

const ProductCard = ({ id, name, price, image, imageUrl, category }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart: addToCartContext } = useCart();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from wishlist" : "Added to wishlist");
  };

  const addToCart = () => {
    addToCartContext({ id, name, price, image: imageUrl || image, category });
    toast.success(`${name} added to cart!`);
  };

  // Use backend field (imageUrl) or fallback placeholder
  const imgSrc = imageUrl || image || "/placeholder.jpg";

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-hover animate-fade-in">
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <img
          src={imgSrc}
          alt={name}
          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 bg-card/90 rounded-full hover:bg-card transition-colors"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-secondary text-secondary" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      <CardContent className="p-4">
        {category && (
          <p className="text-xs text-muted-foreground uppercase mb-1">{category}</p>
        )}
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-secondary font-bold text-xl">Rs {price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={addToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
