
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { getListingById } from "@/services/mockData";
import { ListingProps } from "@/types/listing";
import AIDescriptionAnalyzer from "./AIDescriptionAnalyzer";
import LocationMap from "./LocationMap";
import ImageCarousel from "./ImageCarousel";
import SellerCard from "./SellerCard";
import ListingHeader from "./ListingHeader";

interface ListingDetailProps {
  id: string;
}

const ListingDetail = ({ id }: ListingDetailProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState<ListingProps | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          setIsLoggedIn(parsedData.isLoggedIn || false);
        } catch (e) {
          console.error("Error parsing user data:", e);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus();
    // Listen for login status changes
    window.addEventListener('loginStatusChanged', checkLoginStatus);
    
    return () => {
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, []);
  
  // Load listing data
  useEffect(() => {
    // First check local storage for user listings
    const checkUserListings = () => {
      const userListings = localStorage.getItem('userListings');
      if (userListings) {
        try {
          const parsedListings = JSON.parse(userListings);
          const foundListing = parsedListings.find((l: any) => l.id === id);
          if (foundListing) {
            // Convert date string to Date object
            if (typeof foundListing.createdAt === 'string') {
              foundListing.createdAt = new Date(foundListing.createdAt);
            }
            // Add 150 to the price
            foundListing.price = foundListing.price + 150;
            return foundListing;
          }
        } catch (e) {
          console.error("Error parsing user listings:", e);
        }
      }
      return null;
    };
    
    // Simulate API call with delay
    setIsLoading(true);
    setTimeout(() => {
      // First check user's own listings
      const userListing = checkUserListings();
      
      if (userListing) {
        setListing(userListing);
      } else {
        // If not found in user listings, check mock API data
        const fetchedListing = getListingById(id);
        if (fetchedListing) {
          // Add 150 to the price for mock data listings too
          fetchedListing.price = fetchedListing.price + 150;
          setListing(fetchedListing);
        } else {
          toast.error("Listing not found");
          navigate("/");
        }
      }
      setIsLoading(false);
    }, 500);
  }, [id, navigate]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted/50 rounded w-1/3"></div>
          <div className="h-64 bg-muted/50 rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-6 bg-muted/50 rounded w-1/2"></div>
              <div className="h-4 bg-muted/50 rounded w-1/4"></div>
              <div className="h-20 bg-muted/50 rounded"></div>
            </div>
            <div>
              <div className="h-40 bg-muted/50 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!listing) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold">Listing not found</h2>
        <p className="text-muted-foreground mt-2">
          The listing you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="mt-4">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }
  
  // Combine main image with additional images
  const allImages = listing.additionalImages 
    ? [listing.image, ...listing.additionalImages]
    : [listing.image];

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ListingHeader listing={listing} />
          
          {/* Image Carousel */}
          <ImageCarousel images={allImages} title={listing.title} />
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">
                {listing.description}
              </p>
            </div>
            
            {listing.description && listing.keywords && (
              <AIDescriptionAnalyzer 
                description={listing.description} 
                keywords={listing.keywords}
              />
            )}
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              {listing.coordinates ? (
                <LocationMap 
                  lat={listing.coordinates.lat} 
                  lng={listing.coordinates.lng}
                  title={listing.title}
                  address={listing.location}
                />
              ) : (
                <div className="h-64 rounded-md bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Location information unavailable</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <SellerCard 
            price={listing.price} 
            type={listing.type} 
            createdAt={listing.createdAt}
            seller={listing.seller}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
