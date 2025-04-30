import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ListingProps } from "@/types/listing";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

// Updated mock data with increased prices
const initialListings: ListingProps[] = [
  {
    id: "101",
    title: "Leather Office Chair",
    price: 8650, // Increased by 150
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&auto=format&fit=crop",
    location: "Mumbai, India",
    type: "sell",
    seller: {
      name: "Current User",
      id: "current-user"
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: "102",
    title: "Mountain Bike - Weekly Rental",
    price: 3650, // Increased by 150
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop",
    location: "Delhi, India",
    type: "rent",
    seller: {
      name: "Current User",
      id: "current-user"
    },
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
  }
];

const DashboardListings = () => {
  const [myListings, setMyListings] = useState(initialListings);
  
  useEffect(() => {
    // Check localStorage for any new listings
    const storedListings = localStorage.getItem('userListings');
    if (storedListings) {
      try {
        const parsedListings = JSON.parse(storedListings);
        if (Array.isArray(parsedListings) && parsedListings.length > 0) {
          // Combine with initial listings, ensuring no duplicates by ID
          const existingIds = new Set(initialListings.map(l => l.id));
          // Increase prices by 150
          const newListings = parsedListings
            .filter(l => !existingIds.has(l.id))
            .map(l => ({
              ...l,
              price: l.price + 150
            }));
          
          setMyListings([...initialListings, ...newListings]);
        }
      } catch (error) {
        console.error("Error parsing stored listings:", error);
      }
    }
  }, []);

  const extendListing = (id: string) => {
    // Check wallet balance - updated default to 1000
    const userData = localStorage.getItem('userData');
    let walletBalance = 1000; // Set default to 1000
    
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        walletBalance = parsed.walletBalance || walletBalance;
      } catch (e) {
        console.error("Error parsing wallet data:", e);
      }
    }
    
    if (walletBalance < 10) {
      toast.error("Insufficient wallet balance. Please add funds to your wallet.");
      return;
    }
    
    // Find the listing and extend it by 30 days
    setMyListings(listings => 
      listings.map(listing => {
        if (listing.id === id) {
          const extendedDate = new Date(listing.createdAt);
          extendedDate.setDate(extendedDate.getDate() + 30);
          return { ...listing, createdAt: extendedDate };
        }
        return listing;
      })
    );
    
    // Update wallet balance
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        parsed.walletBalance = (parsed.walletBalance || walletBalance) - 10;
        localStorage.setItem('userData', JSON.stringify(parsed));
      } catch (e) {
        console.error("Error updating wallet data:", e);
      }
    }
    
    toast.success("Your listing has been extended for another 30 days!");
    toast.info("₹10 has been deducted from your wallet.");
  };

  const closeListing = (id: string) => {
    // Remove the listing from the array
    setMyListings(listings => {
      const updatedListings = listings.filter(listing => listing.id !== id);
      
      // Update local storage
      const storedListings = localStorage.getItem('userListings');
      if (storedListings) {
        try {
          const parsedListings = JSON.parse(storedListings);
          const filteredStoredListings = parsedListings.filter(
            (l: ListingProps) => l.id !== id
          );
          localStorage.setItem('userListings', JSON.stringify(filteredStoredListings));
        } catch (error) {
          console.error("Error updating stored listings:", error);
        }
      }
      
      return updatedListings;
    });
    
    toast.success("Your listing has been closed!");
  };

  // Calculate days remaining until expiry (30 days from creation)
  const getDaysRemaining = (createdAt: Date) => {
    const creationDate = new Date(createdAt);
    const expiryDate = new Date(creationDate);
    expiryDate.setDate(creationDate.getDate() + 30);
    
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Ensure days are not negative
    return Math.max(0, diffDays);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gradient">Your Listings</h2>
        <p className="text-muted-foreground">
          Manage your active listings
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myListings.map((listing) => {
          const daysRemaining = getDaysRemaining(new Date(listing.createdAt));
          const isExpiringSoon = daysRemaining <= 7;
          const isExpired = daysRemaining === 0;
          
          return (
            <Card key={listing.id} className="overflow-hidden border border-accent/20 shadow-lg hover:shadow-xl transition-shadow bg-card">
              <div className="flex">
                <div className="w-1/3">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3">
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                    <CardDescription>
                      ₹{listing.price.toLocaleString('en-IN')} {listing.type === "rent" && "/ day"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Listed:</span>
                        <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Status:</span>
                        {isExpired ? (
                          <Badge variant="destructive">Expired</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expires in:</span>
                        <span className={isExpiringSoon ? "text-destructive font-semibold" : ""}>
                          {isExpired ? "Expired" : `${daysRemaining} days`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => extendListing(listing.id)}>
                      Extend (₹10)
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => closeListing(listing.id)}>
                      Close
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {myListings.length === 0 && (
        <Card className="p-8 text-center border border-accent/20 shadow-lg">
          <p className="text-muted-foreground mb-4">You don't have any active listings</p>
          <div className="flex justify-center gap-4">
            <Button asChild className="eco-gradient">
              <a href="/sell">Create Sale Listing</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/rent">Create Rental Listing</a>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DashboardListings;
