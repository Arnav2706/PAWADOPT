import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MapPin, Calendar, Ruler, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", contact: "", reason: "" });

  // Mock pets database - in real app, fetch from API based on ID
  const allPets = {
    "1": {
      id: "1",
      name: "Max",
      breed: "Golden Retriever",
      age: 2,
      type: "Dog",
      gender: "Male",
      size: "Large",
      location: "Bangalore, India",
      description:
        "Max is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He's great with kids and other pets. Max is fully vaccinated and house-trained. He's looking for an active family who can give him plenty of exercise and love.",
      image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
    },
    "2": {
      id: "2",
      name: "Luna",
      breed: "Persian Cat",
      age: 1,
      type: "Cat",
      gender: "Female",
      size: "Medium",
      location: "Mumbai, India",
      description:
        "Luna is a beautiful Persian cat with a calm and affectionate personality. She loves to cuddle and enjoys quiet environments. Luna is perfect for apartment living and gets along well with gentle children. She's been spayed and is up to date on all vaccinations.",
      image: "https://unsplash.com/photos/white-and-gray-long-fur-cat-AGehl6k8xVo",
    },
    "3": {
      id: "3",
      name: "Charlie",
      breed: "Labrador",
      age: 3,
      type: "Dog",
      gender: "Male",
      size: "Large",
      location: "Delhi, India",
      description:
        "Charlie is a loyal and intelligent Labrador who loves swimming and outdoor activities. He's well-trained, obedient, and excellent with children of all ages. Charlie would thrive in an active household with a backyard where he can play and explore.",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
    },
    "4": {
      id: "4",
      name: "Bella",
      breed: "Siamese Cat",
      age: 2,
      type: "Cat",
      gender: "Female",
      size: "Small",
      location: "Pune, India",
      description:
        "Bella is a vocal and social Siamese cat who loves attention and interaction. She's very intelligent and enjoys playing with toys. Bella forms strong bonds with her family and will follow you around the house. She's perfect for someone who wants an engaging and talkative companion.",
      image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800",
    },
    "5": {
      id: "5",
      name: "Rocky",
      breed: "German Shepherd",
      age: 4,
      type: "Dog",
      gender: "Male",
      size: "Large",
      location: "Hyderabad, India",
      description:
        "Rocky is a confident and courageous German Shepherd with excellent guard dog instincts. He's loyal, protective, and incredibly smart. Rocky needs an experienced owner who can provide firm but loving leadership. He's great with family but needs proper socialization with strangers.",
      image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=800",
    },
    "6": {
      id: "6",
      name: "Whiskers",
      breed: "Maine Coon",
      age: 1,
      type: "Cat",
      gender: "Male",
      size: "Large",
      location: "Chennai, India",
      description:
        "Whiskers is a majestic Maine Coon with a gentle giant personality. Despite his large size, he's incredibly gentle and playful. He loves interactive toys and enjoys the company of both humans and other pets. Whiskers' fluffy coat requires regular grooming to keep it in top condition.",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800",
    },
  };

  // Get the specific pet based on ID from URL
  const pet = id ? allPets[id as keyof typeof allPets] : null;

  // If pet not found, show error
  if (!pet) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Pet Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The pet you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/adopt")} variant="secondary">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Adoption Page
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Your adoption request for ${pet.name} has been sent! We'll contact you soon.`);
    setFormData({ name: "", contact: "", reason: "" });
  };

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
                src={pet.image}
                alt={pet.name}
                className="w-full h-[500px] object-cover"
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
              <Card>
                <CardContent className="p-4 flex items-center space-x-3">
                  <Ruler className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-semibold">{pet.size}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold text-sm">{pet.location}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-semibold">{pet.gender}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pet Details and Adoption Form */}
          <div>
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold mb-2">{pet.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                {pet.breed} • {pet.type}
              </p>
              <p className="text-foreground leading-relaxed">{pet.description}</p>
            </div>

            <Card className="animate-scale-in">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Adopt {pet.name}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact (Email or Phone)</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason">Why do you want to adopt {pet.name}?</Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) =>
                        setFormData({ ...formData, reason: e.target.value })
                      }
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Submit Adoption Request
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