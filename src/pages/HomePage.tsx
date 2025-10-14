import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag, BookOpen, ArrowRight } from "lucide-react";
import PetCard from "@/components/PetCard";
import heroImage from "@/assets/hero-pets.jpg";

const HomePage = () => {
  // Mock featured pets data
  const featuredPets = [
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
      image: "https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc2lhbiUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    },
    {
      id: "3",
      name: "Charlie",
      breed: "Labrador",
      age: 3,
      type: "Dog",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500",
    },
  ];

  const breedInfo = [
    {
      name: "Labrador Retriever",
      temperament: "Friendly, Active, Outgoing",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    },
    {
      name: "Persian Cat",
      temperament: "Calm, Affectionate, Gentle",
      image: "https://images.unsplash.com/photo-1573865526739-10c1d3a1e83e?w=400",
    },
    {
      name: "Golden Retriever",
      temperament: "Intelligent, Friendly, Devoted",
      image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Find Your Perfect Pet Companion
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Give a loving home to a pet in need. Browse our available pets and find your new best friend today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/adopt">
                  <Button variant="hero" size="lg">
                    Adopt Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/guide">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src={heroImage}
                alt="Happy pets"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center transition-all hover:shadow-hover">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Adopt with Love</h3>
              <p className="text-muted-foreground">
                Browse hundreds of pets waiting for their forever home
              </p>
            </CardContent>
          </Card>

          <Card className="text-center transition-all hover:shadow-hover">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Shop Pet Supplies</h3>
              <p className="text-muted-foreground">
                Everything your pet needs, from food to toys
              </p>
            </CardContent>
          </Card>

          <Card className="text-center transition-all hover:shadow-hover">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Buyer Guides</h3>
              <p className="text-muted-foreground">
                Learn about different breeds and pet care tips
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Pets</h2>
          <p className="text-muted-foreground text-lg">
            Meet some of our adorable pets waiting for adoption
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredPets.map((pet) => (
            <PetCard key={pet.id} {...pet} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/adopt">
            <Button variant="secondary" size="lg">
              View All Pets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Breed Guide Preview */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">First-Time Buyer Guide</h2>
            <p className="text-muted-foreground text-lg">
              Learn about popular breeds and find the perfect match
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {breedInfo.map((breed) => (
              <Card key={breed.name} className="overflow-hidden transition-all hover:shadow-hover">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{breed.name}</h3>
                  <p className="text-muted-foreground">{breed.temperament}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/guide">
              <Button variant="secondary" size="lg">
                Read Full Guide
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
