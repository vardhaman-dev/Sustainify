
import { useState, useEffect } from "react";
import ListingCard from "../common/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { getFeaturedListings } from "@/services/mockData";

const FeaturedListings = () => {
  const [filter, setFilter] = useState<"all" | "sell" | "rent">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(""); 
  
  // Use mockData service to get listings
  const mockListings = getFeaturedListings(12);
  
  // Increase all prices by 150
  const listingsWithIncreasedPrices = mockListings.map(listing => ({
    ...listing,
    price: listing.price + 150
  }));
  
  // Filter by type, search query, and location
  const filteredListings = listingsWithIncreasedPrices.filter(listing => {
    const matchesType = filter === "all" || listing.type === filter;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !location || listing.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesType && matchesSearch && matchesLocation;
  });
  
  // Sort to get featured items first, then by date for non-featured items
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Handle URL parameter for scrolling
  useEffect(() => {
    // Check for scrollToFeatured parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('scrollToFeatured') === 'true') {
      // Remove the parameter without reloading the page
      window.history.replaceState({}, document.title, window.location.pathname);
      // Scroll to featured section
      setTimeout(() => {
        const element = document.getElementById('featured-listings');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  return (
    <div className="py-6" id="featured-listings">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Listings</h2>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All
          </Button>
          <Button 
            variant={filter === "sell" ? "default" : "outline"}
            onClick={() => setFilter("sell")}
            size="sm"
          >
            For Sale
          </Button>
          <Button 
            variant={filter === "rent" ? "default" : "outline"}
            onClick={() => setFilter("rent")}
            size="sm"
          >
            For Rent
          </Button>
        </div>
      </div>
      
      {/* Search and Location filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            type="text"
            placeholder="Search listings..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative sm:w-1/3">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            type="text"
            placeholder="Filter by location..." 
            className="pl-10" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedListings.length > 0 ? (
          sortedListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No listings found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
                setLocation("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedListings;
