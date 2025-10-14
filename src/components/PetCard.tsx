import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  age: number;
  image: string;
  type: string;
}

const PetCard = ({ id, name, breed, age, image, type }: PetCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
   
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
              isFavorite ? "fill-secondary text-secondary" : "text-muted-foreground"
            }`}
          />
        </button>
        <Badge className="absolute top-3 left-3 bg-primary">{type}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm">{breed}</p>
        <p className="text-muted-foreground text-sm">{age} {age === 1 ? 'year' : 'years'} old</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/pet/${id}`} className="w-full">
          <Button variant="secondary" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
