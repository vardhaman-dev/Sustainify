
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ImagePlus, X, Upload, AlertCircle } from "lucide-react";
import { ListingProps } from "@/types/listing";
import ListingSubmissionSuccess from "./ListingSubmissionSuccess";

interface ListingFormProps {
  type: "sell" | "rent" | "recycle" | "donate";
}

const placeholderImages = [
  "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591370569489-a3aaec66df63?w=800&auto=format&fit=crop"
];

const ListingForm = ({ type }: ListingFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    minDuration: "1",
    keywords: "",
    contactNumber: "",
    location: ""
  });
  const navigate = useNavigate();
  
  // Get wallet balance from localStorage
  const [walletBalance, setWalletBalance] = useState(25000);
  
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed.walletBalance) {
          setWalletBalance(parsed.walletBalance);
        }
      } catch (e) {
        console.error("Error parsing wallet data:", e);
      }
    }

    // Get user's location for distance calculations
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        // Default to Mumbai coordinates if location not available
        setUserLocation({ lat: 19.076, lng: 72.8777 });
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Limit to 5 images total
      if (selectedImages.length + newFiles.length > 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }
      
      // Create preview URLs for new files
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      
      setSelectedImages([...selectedImages, ...newFiles]);
      setPreviewUrls([...previewUrls, ...newUrls]);
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    const newUrls = [...previewUrls];
    
    // Release the object URL to prevent memory leaks
    URL.revokeObjectURL(newUrls[index]);
    
    newImages.splice(index, 1);
    newUrls.splice(index, 1);
    
    setSelectedImages(newImages);
    setPreviewUrls(newUrls);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title.trim()) {
      toast.error("Please enter a title for your listing");
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error("Please provide a description");
      return;
    }
    
    if ((type === "sell" || type === "rent") && !formData.price) {
      toast.error(`Please enter a ${type === "rent" ? "rental" : "sale"} price`);
      return;
    }
    
    if (!formData.location.trim()) {
      toast.error("Please enter your location");
      return;
    }
    
    // If no images selected, use placeholder image
    const finalPreviewUrls = previewUrls.length > 0 ? 
      previewUrls : 
      [placeholderImages[Math.floor(Math.random() * placeholderImages.length)]];
    
    // Get the subscription fee (no longer charged upfront)
    const totalFee = isFeatured ? getFeaturedFee() : 0;
    
    // Check if user has enough balance
    if (walletBalance < totalFee) {
      toast.error("Insufficient wallet balance. Please add funds to your wallet.");
      return;
    }
    
    setIsLoading(true);

    // Calculate carbon impact metrics
    const carbonSaved = Math.floor(Math.random() * 20) + 1; // 1-20kg
    const wasteDiverted = Math.floor(Math.random() * 10) + 1; // 1-10kg

    // Create random coordinates near user's location if we have them
    const randomOffset = () => (Math.random() - 0.5) * 0.05; // ~5km max offset
    const coordinates = {
      lat: userLocation.lat + randomOffset(),
      lng: userLocation.lng + randomOffset()
    };

    // Create a new listing object
    const newListing: ListingProps = {
      id: `listing-${Date.now()}`,
      title: formData.title,
      price: parseFloat(formData.price) || 0,
      image: finalPreviewUrls[0], // Use first image as main image
      additionalImages: finalPreviewUrls.slice(1),
      location: formData.location,
      type: type,
      featured: isFeatured,
      seller: {
        name: "Current User", // This would come from user profile
        id: "current-user",
        phone: formData.contactNumber
      },
      createdAt: new Date(),
      description: formData.description,
      keywords: formData.keywords.split(',').map(k => k.trim()),
      coordinates: coordinates,
      impactMetrics: {
        carbonSaved: carbonSaved,
        wasteDiverted: wasteDiverted
      }
    };

    // Process the listing
    setTimeout(() => {
      try {
        // Save to localStorage
        const existingListings = localStorage.getItem('userListings');
        let updatedListings = [];
        
        if (existingListings) {
          try {
            updatedListings = JSON.parse(existingListings);
            if (!Array.isArray(updatedListings)) {
              updatedListings = [];
            }
          } catch (e) {
            console.error("Error parsing existing listings:", e);
            updatedListings = [];
          }
        }
        
        updatedListings.push(newListing);
        localStorage.setItem('userListings', JSON.stringify(updatedListings));
        
        // Update wallet balance
        const userData = localStorage.getItem('userData');
        if (userData) {
          try {
            const parsed = JSON.parse(userData);
            parsed.walletBalance = (parsed.walletBalance || walletBalance) - totalFee;
            localStorage.setItem('userData', JSON.stringify(parsed));
          } catch (e) {
            console.error("Error updating wallet data:", e);
          }
        }
        
        setIsLoading(false);
        setIsSubmitted(true);
        
      } catch (error) {
        console.error("Error saving listing:", error);
        setIsLoading(false);
        toast.error("There was an error publishing your listing. Please try again.");
      }
    }, 1500);
  };

  // Calculate listing fee based on type and featured status
  const getListingFee = () => {
    // Updated business model - no upfront listing fees
    return 0;
  };

  const getFeaturedFee = () => {
    if (type === "sell") {
      return 1250; // Updated from 250 to 1250 (increased by 1000)
    } else {
      return 1225; // Updated from 225 to 1225 (increased by 1000)
    }
  };

  const totalFee = isFeatured ? getFeaturedFee() : 0;

  const getFormTitle = () => {
    switch (type) {
      case "sell": return "List an Item for Sale";
      case "rent": return "List an Item for Rent";
      case "recycle": return "Submit Item for Recycling";
      case "donate": return "Donate an Item to NGOs";
      default: return "Create Listing";
    }
  };

  const getButtonText = () => {
    switch (type) {
      case "sell": return isLoading ? "Processing..." : "Publish Sale Listing";
      case "rent": return isLoading ? "Processing..." : "Publish Rental Listing";
      case "recycle": return isLoading ? "Processing..." : "Submit Recycling Request";
      case "donate": return isLoading ? "Processing..." : "Publish Donation Listing";
      default: return isLoading ? "Processing..." : "Publish Listing";
    }
  };

  if (isSubmitted) {
    return <ListingSubmissionSuccess type={type} title={formData.title} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold mb-6 text-gradient animate-fade-in">
          {getFormTitle()}
        </h2>

        <div className="space-y-4">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <Label htmlFor="title" className="text-base">Title*</Label>
            <Input 
              id="title"
              value={formData.title}
              onChange={handleInputChange} 
              placeholder="Enter a descriptive title"
              className="mt-1"
              required
            />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Label htmlFor="description" className="text-base">Description*</Label>
            <Textarea 
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your item in detail (condition, features, history, etc.)"
              className="mt-1 min-h-32"
              required
            />
          </div>

          {(type === "sell" || type === "rent") && (
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Label htmlFor="price" className="text-base">Price (₹)*</Label>
              <Input 
                id="price"
                type="number" 
                value={formData.price}
                onChange={handleInputChange}
                placeholder={type === "rent" ? "Rental price per day" : "Selling price"}
                className="mt-1"
                min="0"
                required
              />
              {type === "rent" && (
                <div className="mt-2">
                  <Label htmlFor="minDuration" className="text-sm">Minimum rental duration (days)</Label>
                  <Input 
                    id="minDuration"
                    type="number" 
                    value={formData.minDuration}
                    onChange={handleInputChange}
                    className="mt-1"
                    min="1"
                  />
                </div>
              )}
            </div>
          )}

          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Label htmlFor="location" className="text-base">Location*</Label>
            <Input 
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, State"
              className="mt-1"
              required
            />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Label htmlFor="contactNumber" className="text-base">Contact Number</Label>
            <Input 
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="Your contact number (optional)"
              className="mt-1"
            />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Label htmlFor="keywords" className="text-base">Keywords</Label>
            <Input 
              id="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="Separate keywords with commas (e.g., vintage, wooden, handmade)"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Keywords help buyers find your item more easily
            </p>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <Label className="text-base mb-2 block">Images</Label>
            
            <div className="mt-2 flex flex-wrap gap-4">
              {/* Image preview cards */}
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-accent/20">
                    <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {/* Add image button */}
              {previewUrls.length < 5 && (
                <label className="cursor-pointer">
                  <div className="w-24 h-24 rounded-lg border-2 border-dashed border-accent/40 flex flex-col items-center justify-center hover:border-accent/70 transition-colors">
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">Add image</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    multiple
                  />
                </label>
              )}
            </div>
            
            {previewUrls.length === 0 && (
              <div className="mt-2 p-3 border border-amber-200 bg-amber-50 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">No images uploaded</p>
                  <p className="text-xs mt-0.5">A placeholder image will be used if you don't upload any photos. For better visibility, we recommend adding at least one image.</p>
                </div>
              </div>
            )}
          </div>

          {(type === "sell" || type === "rent") && (
            <Card className="p-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={isFeatured} 
                  onCheckedChange={(checked) => setIsFeatured(checked === true)}
                />
                <div>
                  <Label 
                    htmlFor="featured" 
                    className="text-base font-medium cursor-pointer"
                  >
                    Feature this listing
                    <Badge className="ml-2 bg-eco-medium">+ ₹{getFeaturedFee()}</Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Featured listings appear at the top of search results and get 5x more views
                  </p>
                </div>
              </div>
            </Card>
          )}
          
          <div className="pt-4 animate-fade-in" style={{ animationDelay: "0.9s" }}>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  {getButtonText()}
                </>
              ) : (
                getButtonText()
              )}
            </Button>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              {totalFee > 0 ? (
                <p>Total fee: ₹{totalFee} (will be deducted from your wallet)</p>
              ) : (
                <p>Listing is free! Commission applies only when item is sold.</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListingForm;
