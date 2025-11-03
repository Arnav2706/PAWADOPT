import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useCart, useFavorites } from "@/hooks/useCart";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const { addToCart: addToCartContext } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const isCurrentlyFavorite = isFavorite(id);

  const toggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFromFavorites(id);
      toast.success(`${name} removed from favorites`);
    } else {
      addToFavorites({
        id,
        name,
        type: 'product',
        image,
        price,
        category,
        itemType: 'product'
      });
      toast.success(`${name} added to favorites`);
    }
  };

  const addToCart = () => {
    addToCartContext({ id, name, price, image, category });
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
              isCurrentlyFavorite ? "fill-secondary text-secondary" : "text-muted-foreground"
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