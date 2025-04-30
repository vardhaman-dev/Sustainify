
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart, Phone, MessageSquare, Clock, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Seller } from "@/types/listing";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface SellerCardProps {
  price: number;
  type: "sell" | "rent" | "recycle" | "donate";
  createdAt: Date;
  seller: Seller;
  isLoggedIn?: boolean;
}

const SellerCard = ({ price, type, createdAt, seller }: SellerCardProps) => {
  const [showContact, setShowContact] = useState(false);
  const [walletBalance, setWalletBalance] = useState(25000);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setIsLoggedIn(parsedData.isLoggedIn || false);
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus();
    window.addEventListener('loginStatusChanged', checkLoginStatus);
    
    return () => {
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, []);

  const handleContactReveal = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to view contact details");
      return;
    }
    
    setShowContact(true);
    toast.success("Contact details revealed!");
  };

  const handleSaveItem = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to save this item");
      return;
    }
    toast.success("Item saved to your wishlist!");
  };
  
  const handleMessageSend = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    toast.success("Message sent to seller!");
    setMessage("");
    setIsMessageDialogOpen(false);
  };

  // Function to get price display based on listing type
  const getPriceDisplay = () => {
    switch(type) {
      case "sell":
      case "rent":
        return (
          <div className="mb-4">
            <p className="text-3xl font-bold">₹{price.toLocaleString('en-IN')}</p>
            {type === "rent" && (
              <p className="text-sm text-muted-foreground">per day</p>
            )}
          </div>
        );
      case "recycle":
        return (
          <div className="mb-4">
            <p className="text-xl font-medium">Recycling Item</p>
            <p className="text-sm text-green-600">Earn 5₹ when validated</p>
          </div>
        );
      case "donate":
        return (
          <div className="mb-4">
            <p className="text-xl font-medium">Donation Item</p>
            <p className="text-sm text-amber-600">Thank you for donating!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="p-6 sticky top-24">
        {getPriceDisplay()}
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Listed on {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
          
          {isLoggedIn ? (
            <>
              {showContact ? (
                <>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{seller.phone || "+91 9876543210"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Available for viewing: {seller.availableHours || "Mon-Sat, 10AM - 6PM"}</span>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="text-sm text-green-700 font-medium">Contact details revealed!</p>
                    <p className="text-xs text-green-600 mt-1">You can now contact the seller directly.</p>
                  </div>
                </>
              ) : (
                <Button variant="default" className="w-full" onClick={handleContactReveal}>
                  <Phone className="h-4 w-4 mr-2" />
                  Reveal Contact Details
                </Button>
              )}
            </>
          ) : (
            <div className="bg-muted p-4 rounded-md text-center">
              <p className="mb-2">You need to be logged in to see contact details</p>
              <Link to="/auth">
                <Button size="sm" className="w-full">Login / Register</Button>
              </Link>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full" onClick={handleSaveItem}>
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          {isLoggedIn && (
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => setIsMessageDialogOpen(true)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Seller
            </Button>
          )}
        </div>
        
        <Separator className="my-6" />
        
        <div>
          <p className="font-semibold mb-2">About the seller</p>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <span className="font-medium">{seller.name.charAt(0)}</span>
            </div>
            <div>
              <p className="font-medium">{seller.name}</p>
              <p className="text-sm text-muted-foreground">Member since {seller.memberSince || "2022"}</p>
            </div>
          </div>
          {seller.rating && (
            <div className="mt-3 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(seller.rating) ? "text-amber-400" : "text-gray-300"}`} 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">{seller.rating}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message to {seller.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea 
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-32"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleMessageSend}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SellerCard;
