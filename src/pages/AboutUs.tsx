import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users } from "lucide-react";

const AboutUs = () => {
  const team = [
    {
      name: "Arnav Kumar",
      role: "Project Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      description: "Leading the vision to connect pets with loving homes",
    },
    {
      name: "Akash Gupta",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "Building robust systems to support our mission",
    },
    {
      name: "Srijan",
      role: "Frontend Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      description: "Crafting beautiful experiences for pet lovers",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Mission Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About PawAdopt</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to give every pet a loving home and make the adoption process simple, transparent, and joyful.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center transition-all hover:shadow-hover animate-fade-in">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To connect loving families with pets in need and create lasting bonds that enrich both lives.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center transition-all hover:shadow-hover animate-fade-in">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Our Vision</h3>
              <p className="text-muted-foreground">
                A world where every pet has a safe, loving home and no animal is left behind.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center transition-all hover:shadow-hover animate-fade-in">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Our Community</h3>
              <p className="text-muted-foreground">
                Building a supportive community of pet lovers, adopters, and advocates working together.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="bg-muted rounded-2xl p-8 md:p-12 mb-20 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              PawAdopt was born from a simple observation: too many wonderful pets were waiting in shelters while families searching for companions struggled to find the right match. We knew technology could bridge this gap.
            </p>
            <p>
              Founded in 2024, we've grown from a small team of passionate pet lovers into a platform that has helped thousands of pets find their forever homes. We combine modern technology with genuine care for animals and their future families.
            </p>
            <p>
              Today, we're proud to partner with shelters and rescue organizations across the country, providing them with the tools to showcase their animals and connect with potential adopters. Every adoption through PawAdopt is a success story that motivates us to do more.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card
                key={member.name}
                className="overflow-hidden transition-all hover:shadow-hover animate-fade-in"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-secondary font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
