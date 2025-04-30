
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink, Search } from "lucide-react";

interface Facility {
  id: string;
  name: string;
  type: "recycle" | "ngo";
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website?: string;
  materials?: string[];
  description: string;
}

// Mock data - would come from API in real app
const mockFacilities: Facility[] = [
  {
    id: "r1",
    name: "GreenCycle Processing Center",
    type: "recycle",
    address: "123 Eco Way",
    city: "Portland",
    state: "OR",
    zipCode: "97201",
    phone: "(503) 555-1234",
    website: "https://example.com/greencycle",
    materials: ["plastic", "paper", "electronics", "glass", "metal"],
    description: "Full-service recycling center accepting a wide variety of materials including electronics and hazardous waste."
  },
  {
    id: "r2",
    name: "Metal Recyclers Inc.",
    type: "recycle",
    address: "456 Industrial Blvd",
    city: "Portland",
    state: "OR",
    zipCode: "97203",
    phone: "(503) 555-5678",
    materials: ["metal", "appliances", "automotive"],
    description: "Specializing in metal recycling including appliances, car parts, and industrial scrap."
  },
  {
    id: "r3",
    name: "TechRecycle Solutions",
    type: "recycle",
    address: "789 Tech Park Drive",
    city: "Beaverton",
    state: "OR",
    zipCode: "97005",
    phone: "(503) 555-9012",
    website: "https://example.com/techrecycle",
    materials: ["electronics", "batteries", "computers", "mobile phones"],
    description: "Focused on responsible recycling of electronic waste and data destruction services."
  },
  {
    id: "n1",
    name: "Second Chance Foundation",
    type: "ngo",
    address: "101 Hope Street",
    city: "Portland",
    state: "OR",
    zipCode: "97204",
    phone: "(503) 555-3456",
    website: "https://example.com/secondchance",
    description: "Supporting homeless individuals with clothing, furniture, and household item donations."
  },
  {
    id: "n2",
    name: "Community Resource Center",
    type: "ngo",
    address: "202 Community Lane",
    city: "Portland",
    state: "OR",
    zipCode: "97205",
    phone: "(503) 555-7890",
    description: "Helping low-income families with furniture, appliances, and essential household items."
  },
  {
    id: "n3",
    name: "Global Education Initiative",
    type: "ngo",
    address: "303 Learning Way",
    city: "Portland",
    state: "OR",
    zipCode: "97206",
    phone: "(503) 555-0123",
    website: "https://example.com/globaledu",
    description: "Collecting books, school supplies, and educational materials for underprivileged schools worldwide."
  }
];

interface FacilityListProps {
  type: "recycle" | "ngo";
}

const FacilityList = ({ type }: FacilityListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const facilities = mockFacilities.filter(facility => 
    facility.type === type && 
    (searchTerm === "" || 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (facility.materials && facility.materials.some(m => 
        m.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    )
  );
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {type === "recycle" ? "Recycling Centers" : "Donation Centers (NGOs)"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {type === "recycle" 
            ? "Find recycling centers near you for responsible disposal of items." 
            : "Discover NGOs accepting donations to help those in need."
          }
        </p>
        
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${type === "recycle" ? "recycling centers" : "NGOs"}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {facilities.map((facility) => (
            <Card key={facility.id}>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold">{facility.name}</h3>
                {facility.materials && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {facility.materials.map((material) => (
                      <span 
                        key={material}
                        className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {facility.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p>{facility.address}</p>
                      <p>{facility.city}, {facility.state} {facility.zipCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p>{facility.phone}</p>
                  </div>
                  {facility.website && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={facility.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit Website
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="h-64 md:h-96 rounded-lg bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Map will be displayed here</p>
      </div>
    </div>
  );
};

export default FacilityList;
