import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MapPin, Calendar, Ruler, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { petsAPI, adoptionAPI } from "@/lib/api";

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  type: string;
  gender?: string;
  size?: string;
  location?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
}

const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    contact: "", 
    reason: "" 
  });

  // Placeholder image for pets without images
  const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500';

  // Fetch pet details from API
  useEffect(() => {
    const fetchPet = async () => {
      if (!id) {
        toast.error('No pet ID provided');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        console.log('Fetching pet with ID:', id);
        const data = await petsAPI.getById(id);
        console.log('Pet data received:', data);
        
        if (!data) {
          toast.error('Pet not found');
          setLoading(false);
          return;
        }
        
        // Normalize the image field (handle both 'image' and 'imageUrl')
        const normalizedPet = {
          ...data,
          image: data.image || data.imageUrl || PLACEHOLDER_IMAGE
        };
        
        setPet(normalizedPet);
      } catch (error: any) {
        console.error('Error fetching pet:', error);
        const errorMessage = error.message || 'Failed to load pet details';
        toast.error(errorMessage);
        
        // Don't set pet to null on error - let the component show error state
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pet) {
      toast.error('Pet information not available');
      return;
    }

    try {
      setSubmitting(true);
      await adoptionAPI.create({
        petId: pet.id,
        name: formData.name,
        contact: formData.contact,
        reason: formData.reason,
        status: "Pending",
      });
      
      toast.success(`Your adoption request for ${pet.name} has been submitted! We'll contact you soon.`);
      setFormData({ name: "", contact: "", reason: "" });
    } catch (error: any) {
      console.error('Error submitting adoption request:', error);
      toast.error(error.message || 'Failed to submit adoption request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Pet Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The pet you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/adopt")} variant="secondary">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Adoption Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/adopt")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Pets
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Pet Image and Info */}
          <div>
            <div className="relative rounded-2xl overflow-hidden mb-6 animate-fade-in">
              <img
                src={pet.image || PLACEHOLDER_IMAGE}
                alt={pet.name}
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                }}
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-semibold">{pet.age} {pet.age === 1 ? 'year' : 'years'}</p>
                  </div>
                </CardContent>
              </Card>
              
              {pet.size && (
                <Card>
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Ruler className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Size</p>
                      <p className="font-semibold">{pet.size}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {pet.location && (
                <Card>
                  <CardContent className="p-4 flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold text-sm">{pet.location}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {pet.gender && (
                <Card>
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-semibold">{pet.gender}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Pet Details and Adoption Form */}
          <div>
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold mb-2">{pet.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                {pet.breed} • {pet.type}
              </p>
              {pet.description && (
                <p className="text-foreground leading-relaxed">{pet.description}</p>
              )}
            </div>

            <Card className="animate-scale-in">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Adopt {pet.name}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact (Email or Phone) *</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason">Why do you want to adopt {pet.name}? *</Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) =>
                        setFormData({ ...formData, reason: e.target.value })
                      }
                      rows={4}
                      required
                      disabled={submitting}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Adoption Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailPage;