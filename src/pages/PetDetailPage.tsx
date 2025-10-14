import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MapPin, Calendar, Ruler } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PetDetailPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: "", contact: "", reason: "" });

  // Mock pet data - in real app, fetch from API
  const pet = {
    id: id || "1",
    name: "Max",
    breed: "Golden Retriever",
    age: 2,
    type: "Dog",
    gender: "Male",
    size: "Large",
    location: "Mumbai, India",
    description:
      "Max is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He's great with kids and other pets. Max is fully vaccinated and house-trained. He's looking for an active family who can give him plenty of exercise and love.",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, POST to /api/adoption/request
    toast.success("Your adoption request has been sent! We'll contact you soon.");
    setFormData({ name: "", contact: "", reason: "" });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
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
                    <p className="font-semibold">{pet.age} years</p>
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
