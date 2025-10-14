import { useState } from "react";
import PetCard from "@/components/PetCard";
import PetFilterBar from "@/components/PetFilterBar";

const PetListPage = () => {
  const [filters, setFilters] = useState({ type: "", breed: "", maxAge: "" });

  // Mock pets data - in real app, fetch from API
  const mockPets = [
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
    {
      id: "4",
      name: "Bella",
      breed: "Siamese Cat",
      age: 2,
      type: "Cat",
      image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500",
    },
    {
      id: "5",
      name: "Rocky",
      breed: "German Shepherd",
      age: 4,
      type: "Dog",
      image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=500",
    },
    {
      id: "6",
      name: "Whiskers",
      breed: "Maine Coon",
      age: 1,
      type: "Cat",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500",
    },
  ];

  const handleFilterChange = (newFilters: { type: string; breed: string; maxAge: string }) => {
    setFilters(newFilters);
    // In real app, this would trigger an API call with filters
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Available Pets for Adoption</h1>
          <p className="text-muted-foreground text-lg">
            Find your perfect companion from our available pets
          </p>
        </div>

        <PetFilterBar onFilterChange={handleFilterChange} />

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockPets.map((pet) => (
            <PetCard key={pet.id} {...pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetListPage;
