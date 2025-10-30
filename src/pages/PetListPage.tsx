import { useState, useEffect } from "react";
import PetCard from "@/components/PetCard";
import PetFilterBar from "@/components/PetFilterBar";
import { petsAPI } from "@/lib/api";
import { toast } from "sonner";

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  type: string;
  image?: string;
  imageUrl?: string;
}

const PetListPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [filters, setFilters] = useState({ type: "", breed: "", maxAge: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pets from API on component mount
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const data = await petsAPI.getAll();
        console.log('Pets fetched:', data);
        
        // Normalize image field for all pets
        const normalizedPets = (data || []).map(pet => ({
          ...pet,
          image: pet.image || pet.imageUrl || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500'
        }));
        
        setPets(normalizedPets);
        setFilteredPets(normalizedPets);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching pets:', err);
        setError(err.message || 'Failed to load pets');
        toast.error('Failed to load pets. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Apply filters whenever filters or pets change
  useEffect(() => {
    let filtered = [...pets];

    // Filter by type
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(
        pet => pet.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Filter by breed
    if (filters.breed) {
      filtered = filtered.filter(
        pet => pet.breed.toLowerCase().includes(filters.breed.toLowerCase())
      );
    }

    // Filter by max age
    if (filters.maxAge) {
      const maxAge = parseInt(filters.maxAge);
      if (!isNaN(maxAge)) {
        filtered = filtered.filter(pet => pet.age <= maxAge);
      }
    }

    setFilteredPets(filtered);
  }, [filters, pets]);

  const handleFilterChange = (newFilters: { type: string; breed: string; maxAge: string }) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading pets...</p>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Available Pets for Adoption</h1>
          <p className="text-muted-foreground text-lg">
            Find your perfect companion from our {pets.length} available pets
          </p>
        </div>

        <PetFilterBar onFilterChange={handleFilterChange} />

        {filteredPets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No pets found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetListPage;