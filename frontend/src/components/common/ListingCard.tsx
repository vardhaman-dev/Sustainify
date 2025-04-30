
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export interface ListingProps {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  type: "sell" | "rent" | "recycle" | "donate";
  featured?: boolean;
  seller: {
    name: string;
    id: string;
  };
  createdAt: Date;
  coordinates?: {
    lat: number;
    lng: number;
  };
  impactMetrics?: {
    carbonSaved: number;
    wasteDiverted: number;
  };
}

interface ListingCardProps {
  listing: ListingProps;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const { id, title, price, image, location, type, featured, seller, coordinates } = listing;
  const [distance, setDistance] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Get user's geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userPos);
        
        // Calculate distance if listing has coordinates
        if (coordinates) {
          const dist = calculateDistance(
            userPos.lat, userPos.lng,
            coordinates.lat, coordinates.lng
          );
          setDistance(dist);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, [coordinates]);

  // Haversine formula to calculate distance between two points on Earth
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  };

  const getTypeLabel = () => {
    switch(type) {
      case "sell": return "For Sale";
      case "rent": return "For Rent";
      case "recycle": return "Recycling";
      case "donate": return "Donation";
      default: return "Listing";
    }
  };

  const getTypeColor = () => {
    switch(type) {
      case "sell": return "bg-eco-medium text-white"; // Added text-white
      case "rent": return "bg-eco-water text-white"; // Added text-white
      case "recycle": return "bg-green-500 text-white"; // Added text-white
      case "donate": return "bg-amber-500 text-white"; // Added text-white
      default: return "bg-eco-medium text-white"; // Added text-white
    }
  };

  return (
    <Link to={`/listing/${id}`}>
      <Card className="listing-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {featured && (
            <Badge className="absolute top-2 right-2 bg-eco-dark text-white" variant="secondary">
              Featured
            </Badge>
          )}
          <Badge 
            className={`absolute top-2 left-2 ${getTypeColor()}`}
            variant="secondary"
          >
            {getTypeLabel()}
          </Badge>
          
          {listing.impactMetrics && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 flex justify-between">
              <Badge variant="outline" className="bg-green-500/20 text-white border-green-300 text-xs">
                <span>-{listing.impactMetrics.carbonSaved}kg CO₂</span>
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          {(type === "sell" || type === "rent") && (
            <p className="text-lg font-bold">₹{price.toLocaleString('en-IN')} 
              {type === "rent" && <span className="text-sm font-normal">/day</span>}
            </p>
          )}
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <p className="line-clamp-1">{location}</p>
            </div>
            
            {distance !== null && (
              <Badge variant="outline" className="bg-muted/30 text-xs">
                {distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance}km`}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="px-4 py-2 border-t bg-muted/30 flex justify-between">
          <p className="text-xs text-muted-foreground">By {seller.name}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(listing.createdAt).toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListingCard;
