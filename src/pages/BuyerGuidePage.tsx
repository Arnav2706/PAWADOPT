import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookOpen } from "lucide-react";

const BuyerGuidePage = () => {
  const breeds = [
    {
      name: "Labrador Retriever",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
      temperament: "Friendly, Active, Outgoing",
      maintenance: "Moderate - requires daily exercise and regular grooming",
      suitableFor: "Families with children, active individuals",
      description:
        "Labrador Retrievers are one of the most popular dog breeds. They are friendly, outgoing, and active companions who have more than enough affection to go around for families looking for a medium-to-large dog. They are highly trainable and make excellent family pets.",
    },
    {
      name: "Golden Retriever",
      image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600",
      temperament: "Intelligent, Friendly, Devoted",
      maintenance: "Moderate to High - needs regular exercise and grooming",
      suitableFor: "Families, first-time dog owners",
      description:
        "Golden Retrievers are athletic, intelligent dogs. They are serious workers at hunting and field work, as guides for the blind, and in search-and-rescue. They have a gentle and loving disposition and make great family pets.",
    },
    {
      name: "Persian Cat",
      image: "https://images.unsplash.com/photo-1573865526739-10c1d3a1e83e?w=600",
      temperament: "Calm, Affectionate, Gentle",
      maintenance: "High - requires daily grooming and eye care",
      suitableFor: "Indoor living, calm households",
      description:
        "Persian cats are known for their gentle, calm nature and affectionate personality. They are typically indoor cats who prefer a serene environment. Their long, luxurious coat requires daily grooming to prevent matting.",
    },
    {
      name: "German Shepherd",
      image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600",
      temperament: "Confident, Courageous, Smart",
      maintenance: "Moderate to High - needs lots of exercise and training",
      suitableFor: "Active families, experienced dog owners",
      description:
        "German Shepherds are large, athletic dogs with noble character and high intelligence. They are extremely versatile and excel at most anything they're trained to do: guide and assistance work, police and military service, and search and rescue.",
    },
    {
      name: "Siamese Cat",
      image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600",
      temperament: "Vocal, Social, Intelligent",
      maintenance: "Low to Moderate - minimal grooming needed",
      suitableFor: "Interactive households, cat lovers",
      description:
        "Siamese cats are one of the most recognizable and beloved cat breeds. They are very vocal and will 'talk' to their owners. They are social, intelligent, and form strong bonds with their human families.",
    },
    {
      name: "Beagle",
      image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600",
      temperament: "Friendly, Curious, Merry",
      maintenance: "Low to Moderate - regular exercise needed",
      suitableFor: "Families with children, active households",
      description:
        "Beagles are small to medium-sized dogs with a great sense of smell and tracking instinct. They are merry, friendly dogs who enjoy company and are excellent with children. They need regular exercise and can be vocal.",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-10 w-10 text-secondary" />
            <h1 className="text-4xl font-bold">Pet Buyer's Guide</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn about popular breeds, their temperament, maintenance needs, and find the perfect match for your lifestyle
          </p>
        </div>

        {/* Breed Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {breeds.map((breed) => (
            <Card
              key={breed.name}
              className="overflow-hidden transition-all hover:shadow-hover animate-fade-in"
            >
              <img
                src={breed.image}
                alt={breed.name}
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-3">{breed.name}</h3>
                <div className="space-y-2 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      Temperament
                    </p>
                    <p className="text-sm">{breed.temperament}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      Maintenance
                    </p>
                    <p className="text-sm">{breed.maintenance}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      Suitable For
                    </p>
                    <p className="text-sm">{breed.suitableFor}</p>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="w-full">
                      Read More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{breed.name}</DialogTitle>
                      <DialogDescription className="text-base pt-4">
                        {breed.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 pt-2">
                      <div>
                        <p className="font-semibold text-sm text-muted-foreground mb-1">
                          Temperament
                        </p>
                        <p>{breed.temperament}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-muted-foreground mb-1">
                          Maintenance
                        </p>
                        <p>{breed.maintenance}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-muted-foreground mb-1">
                          Best Suited For
                        </p>
                        <p>{breed.suitableFor}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerGuidePage;
