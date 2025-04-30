import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

interface ListingSubmissionSuccessProps {
  type: "sell" | "rent" | "recycle" | "donate";
  title: string;
}

const ListingSubmissionSuccess = ({ type, title }: ListingSubmissionSuccessProps) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  
  useEffect(() => {
    if (showConfetti) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          setShowConfetti(false);
          return clearInterval(interval);
        }
        
        const particleCount = 50 * (timeLeft / duration);
        
        // Launch confetti from both sides
        confetti({
          particleCount: Math.floor(randomInRange(particleCount, particleCount * 2)),
          spread: randomInRange(60, 100),
          angle: randomInRange(55, 125),
          origin: { x: randomInRange(0.1, 0.3), y: 0.5 }
        });
        
        confetti({
          particleCount: Math.floor(randomInRange(particleCount, particleCount * 2)),
          spread: randomInRange(60, 100),
          angle: randomInRange(55, 125),
          origin: { x: randomInRange(0.7, 0.9), y: 0.5 }
        });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [showConfetti]);
  
  const getSuccessTitle = () => {
    switch (type) {
      case "sell": return "Item Listed Successfully!";
      case "rent": return "Rental Item Published!";
      case "recycle": return "Recycling Request Submitted!";
      case "donate": return "Donation Listed Successfully!";
      default: return "Listing Published Successfully!";
    }
  };
  
  const getSuccessMessage = () => {
    switch (type) {
      case "sell":
        return "Your item has been listed for sale. You'll be notified when someone shows interest.";
      case "rent":
        return "Your rental listing is now live. It will be visible to potential renters in your area.";
      case "recycle":
        return "Your recycling request has been sent to certified recyclers in your area. You'll be contacted shortly.";
      case "donate":
        return "Your donation has been listed. Local NGOs will be notified about your generous contribution.";
      default:
        return "Your listing has been published successfully.";
    }
  };
  
  const getImpactMessage = () => {
    switch (type) {
      case "sell":
      case "rent":
        return `By reusing items instead of buying new, you've helped reduce waste and carbon emissions.`;
      case "recycle":
        return `Your recycling effort helps divert waste from landfills and reduces your carbon footprint.`;
      case "donate":
        return `Your generosity will help those in need while keeping items out of landfills.`;
      default:
        return `You're making a difference in building a sustainable future.`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-eco-medium/20"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">{getSuccessTitle()}</h2>
        <p className="text-muted-foreground mt-2">{getSuccessMessage()}</p>
      </div>
      
      <div className="bg-eco-light/10 p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-1">Listing details:</h3>
        <p className="font-bold text-lg">{title}</p>
        <p className="text-muted-foreground text-sm mt-1">This item is now visible in the {type} section</p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
        <h3 className="font-medium text-green-700 flex items-center">
          <Leaf className="h-4 w-4 mr-2" />
          Your Environmental Impact
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{getImpactMessage()}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <Button 
          onClick={() => navigate("/dashboard")} 
          className="w-full sm:w-auto"
        >
          Go to Dashboard
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            if (type === "sell" || type === "rent") {
              navigate(`/${type}`);
            } else {
              navigate("/");
            }
          }}
          className="w-full sm:w-auto"
        >
          {type === "sell" || type === "rent" ? `Create Another ${type === "sell" ? "Sale" : "Rental"} Listing` : "Return to Home"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ListingSubmissionSuccess;
