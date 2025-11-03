import { Heart } from "lucide-react";
import PetCard from "@/components/PetCard";
import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavorites } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FavoritesPage = () => {
  const { getFavoritePets, getFavoriteProducts } = useFavorites();
  
  const favoritePets = getFavoritePets();
  const favoriteProducts = getFavoriteProducts();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-secondary fill-secondary" />
            <h1 className="text-4xl font-bold">My Favorites</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your saved pets and products ({favoritePets.length + favoriteProducts.length} total)
          </p>
        </div>

        <Tabs defaultValue="pets" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="pets" className="text-lg px-8">
              Favorite Pets ({favoritePets.length})
            </TabsTrigger>
            <TabsTrigger value="products" className="text-lg px-8">
              Favorite Products ({favoriteProducts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pets">
            {favoritePets.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoritePets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    id={pet.id}
                    name={pet.name}
                    breed={pet.breed || 'Unknown'}
                    age={pet.age || 0}
                    type={pet.type}
                    image={pet.image}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-4">
                  No favorite pets yet. Start adding some!
                </p>
                <Link to="/adopt">
                  <Button variant="secondary">Browse Pets</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="products">
            {favoriteProducts.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price || 0}
                    image={product.image}
                    category={product.category}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-4">
                  No favorite products yet. Start adding some!
                </p>
                <Link to="/shop">
                  <Button variant="secondary">Browse Products</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FavoritesPage;