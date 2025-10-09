import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PetFilterBarProps {
  onFilterChange: (filters: { type: string; breed: string; maxAge: string }) => void;
}

const PetFilterBar = ({ onFilterChange }: PetFilterBarProps) => {
  const handleTypeChange = (type: string) => {
    onFilterChange({ type, breed: "", maxAge: "" });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-card mb-8">
      <h3 className="font-semibold text-lg mb-4">Filter Pets</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="type" className="mb-2 block">Pet Type</Label>
          <Select onValueChange={handleTypeChange}>
            <SelectTrigger id="type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="breed" className="mb-2 block">Breed</Label>
          <Input
            id="breed"
            placeholder="Search by breed..."
            onChange={(e) => onFilterChange({ type: "", breed: e.target.value, maxAge: "" })}
          />
        </div>

        <div>
          <Label htmlFor="age" className="mb-2 block">Max Age (years)</Label>
          <Input
            id="age"
            type="number"
            placeholder="e.g., 5"
            min="0"
            onChange={(e) => onFilterChange({ type: "", breed: "", maxAge: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default PetFilterBar;
