
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { ListingProps } from "@/types/listing";

interface ListingHeaderProps {
  listing: ListingProps;
}

const ListingHeader = ({ listing }: ListingHeaderProps) => {
  const getTypeLabel = () => {
    switch(listing.type) {
      case "sell": return "For Sale";
      case "rent": return "For Rent";
      case "recycle": return "Recycling";
      case "donate": return "Donation";
      default: return "Listing";
    }
  };

  const getTypeColor = () => {
    switch(listing.type) {
      case "sell": return "bg-eco-medium text-white"; // Added text-white
      case "rent": return "bg-eco-water text-white"; // Added text-white
      case "recycle": return "bg-green-500 text-white"; // Added text-white
      case "donate": return "bg-amber-500 text-white"; // Added text-white
      default: return "bg-eco-medium text-white"; // Added text-white
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Badge variant={listing.type === "recycle" || listing.type === "donate" ? "default" : "outline"} 
          className={listing.type === "recycle" || listing.type === "donate" ? getTypeColor() : ""}>
          {getTypeLabel()}
        </Badge>
        {listing.featured && <Badge className="bg-eco-dark text-white">Featured</Badge>}
      </div>
      <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>{listing.location}</span>
      </div>
    </div>
  );
};

export default ListingHeader;
