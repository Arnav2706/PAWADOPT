import { Heart } from "lucide-react";
import PetCard from "@/components/PetCard";
import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FavoritesPage = () => {
  // Mock favorites data
  const favoritePets = [
    {
      id: "1",
      name: "Max",
      breed: "Golden Retriever",
      age: 2,
      type: "Dog",
      image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500",
    },
    {
      id: "2",
      name: "Luna",
      breed: "Persian Cat",
      age: 1,
      type: "Cat",
      image: "https://images.unsplash.com/photo-1573865526739-10c1d3a1e83e?w=500",
    },
  ];

  const favoriteProducts = [
    {
      id: "1",
      name: "Premium Dog Food",
      price: 45.99,
      category: "Food",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500",
    },
    {
      id: "3",
      name: "Pet Bed Cushion",
      price: 39.99,
      category: "Beds",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-secondary fill-secondary" />
            <h1 className="text-4xl font-bold">My Favorites</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your saved pets and products
          </p>
        </div>

        <Tabs defaultValue="pets" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="pets" className="text-lg px-8">
              Favorite Pets
            </TabsTrigger>
            <TabsTrigger value="products" className="text-lg px-8">
              Favorite Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pets">
            {favoritePets.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoritePets.map((pet) => (
                  <PetCard key={pet.id} {...pet} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  No favorite pets yet. Start adding some!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="products">
            {favoriteProducts.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  No favorite products yet. Start adding some!
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FavoritesPage;
