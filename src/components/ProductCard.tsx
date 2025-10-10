import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from wishlist" : "Added to wishlist");
  };

  const addToCart = () => {
    // In a real app, this would add to cart state/context
    toast.success(`${name} added to cart!`);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-hover animate-fade-in">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={name}
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
