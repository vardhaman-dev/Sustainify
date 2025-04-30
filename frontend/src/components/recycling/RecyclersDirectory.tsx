
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Recycle, Map, Search } from "lucide-react";
import LocationMap from "../listing/LocationMap";

interface RecyclerNGO {
  id: string;
  name: string;
  type: "recycler" | "ngo";
  address: string;
  phone: string;
  acceptedItems: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  distance?: number;
  operating_hours?: string;
}

// Mock data for recyclers and NGOs
const mockRecyclers: RecyclerNGO[] = [
  {
    id: "r1",
    name: "GreenTech Recyclers",
    type: "recycler",
    address: "123 Eco Street, Mumbai, Maharashtra",
    phone: "+91 9876543210",
    acceptedItems: ["electronics", "plastics", "metals"],
    coordinates: {
      lat: 19.076,
      lng: 72.877
    },
    rating: 4.8,
    operating_hours: "Mon-Sat: 9am - 6pm"
  },
  {
    id: "r2",
    name: "EcoReclaim Center",
    type: "recycler",
    address: "456 Earth Avenue, Delhi, Delhi",
    phone: "+91 9876543211",
    acceptedItems: ["paper", "cardboard", "glass", "metals"],
    coordinates: {
      lat: 28.614,
      lng: 77.209
    },
    rating: 4.5,
    operating_hours: "Mon-Sun: 8am - 8pm"
  },
  {
    id: "n1",
    name: "GreenEarth Foundation",
    type: "ngo",
    address: "789 Hope Lane, Bangalore, Karnataka",
    phone: "+91 9876543212",
    acceptedItems: ["clothing", "furniture", "books", "toys"],
    coordinates: {
      lat: 12.972,
      lng: 77.594
    },
    rating: 4.9,
    operating_hours: "Mon-Fri: 10am - 5pm"
  },
  {
    id: "n2",
    name: "Better Tomorrow NGO",
    type: "ngo",
    address: "101 Charity Road, Chennai, Tamil Nadu",
    phone: "+91 9876543213",
    acceptedItems: ["clothing", "household", "school supplies"],
    coordinates: {
      lat: 13.067,
      lng: 80.237
    },
    rating: 4.7,
    operating_hours: "Mon-Sat: 9am - 4pm"
  }
];

interface RecyclersDirectoryProps {
  type?: "recycler" | "ngo" | "all";
}

const RecyclersDirectory = ({ type = "all" }: RecyclersDirectoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecycler, setSelectedRecycler] = useState<RecyclerNGO | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Filter recyclers/NGOs based on type and search query
  const filteredRecyclers = mockRecyclers.filter(recycler => {
    const matchesType = type === "all" || recycler.type === type;
    const matchesSearch = recycler.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recycler.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recycler.acceptedItems.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesSearch;
  });
  
  // Get user location and calculate distances
  useState(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userPos);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  });
  
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };
  
  const getRecyclerTypeLabel = (type: "recycler" | "ngo") => {
    return type === "recycler" ? "Recycling Center" : "Non-Profit Organization";
  };
  
  const handleSelectRecycler = (recycler: RecyclerNGO) => {
    // Calculate distance if we have user location
    if (userLocation) {
      recycler.distance = calculateDistance(
        userLocation.lat, userLocation.lng,
        recycler.coordinates.lat, recycler.coordinates.lng
      );
    }
    setSelectedRecycler(recycler);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gradient">
          {type === "recycler" ? "Recycling Centers" : 
           type === "ngo" ? "Donation Centers" : 
           "Recycling & Donation Centers"}
        </h2>
        <p className="text-muted-foreground">
          Find the nearest places to recycle items or donate them to those in need
        </p>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search by name, location or accepted items..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Directory List */}
        <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto p-1">
          {filteredRecyclers.length > 0 ? (
            filteredRecyclers.map(recycler => (
              <Card 
                key={recycler.id} 
                className={`transition-all hover:shadow-md cursor-pointer border-l-4 ${
                  selectedRecycler?.id === recycler.id 
                    ? recycler.type === "recycler" 
                      ? "border-l-green-500" 
                      : "border-l-amber-500" 
                    : "border-l-transparent"
                }`}
                onClick={() => handleSelectRecycler(recycler)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{recycler.name}</h3>
                      <p className="text-sm text-muted-foreground">{recycler.address}</p>
                    </div>
                    <Badge 
                      className={recycler.type === "recycler" ? "bg-green-500" : "bg-amber-500"}
                    >
                      {getRecyclerTypeLabel(recycler.type)}
                    </Badge>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">Accepts:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {recycler.acceptedItems.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                    <span>{recycler.operating_hours}</span>
                    <span>Rating: {recycler.rating}/5</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No centers found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
        
        {/* Map & Details */}
        <div className="lg:col-span-2">
          {selectedRecycler ? (
            <Card>
              <CardHeader className={`p-4 ${
                selectedRecycler.type === "recycler" ? "bg-green-50" : "bg-amber-50"
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedRecycler.name}</h3>
                    <p className="text-sm">{getRecyclerTypeLabel(selectedRecycler.type)}</p>
                  </div>
                  {selectedRecycler.distance && (
                    <Badge variant="outline" className="bg-white/50">
                      {selectedRecycler.distance.toFixed(1)} km away
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="space-y-6">
                  {/* Contact info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Number:</p>
                      <p className="font-medium">{selectedRecycler.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Operating Hours:</p>
                      <p className="font-medium">{selectedRecycler.operating_hours}</p>
                    </div>
                  </div>
                  
                  {/* Accepted Items */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Accepted Items:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedRecycler.acceptedItems.map((item, index) => (
                        <Badge key={index} variant="outline" className="capitalize">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Map */}
                  <LocationMap 
                    lat={selectedRecycler.coordinates.lat}
                    lng={selectedRecycler.coordinates.lng}
                    title={selectedRecycler.name}
                    address={selectedRecycler.address}
                    isNGO={selectedRecycler.type === "ngo"}
                    isRecycler={selectedRecycler.type === "recycler"}
                  />
                  
                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 eco-gradient hover-scale">
                      Call Now
                    </Button>
                    <Button variant="outline" className="flex-1 hover-scale">
                      <Map className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-muted/20 rounded-lg border border-muted p-8 h-full flex flex-col items-center justify-center text-center">
              <Recycle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Select a Center</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Click on a recycling center or NGO from the list to view its details and location map.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecyclersDirectory;
