
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CarbonImpactCard = () => {
  const [impact, setImpact] = useState({
    wasteDiverted: 0,
    carbonSaved: 0,
    badgesEarned: ["Recycling Starter"],
    level: 1,
    progress: 35
  });
  
  useEffect(() => {
    // Check localStorage for any impact data
    const storedListings = localStorage.getItem('userListings');
    if (storedListings) {
      try {
        const listings = JSON.parse(storedListings);
        if (Array.isArray(listings)) {
          // Calculate total impact
          let totalWaste = 0;
          let totalCarbon = 0;
          
          listings.forEach(listing => {
            if (listing.impactMetrics) {
              totalWaste += listing.impactMetrics.wasteDiverted || 0;
              totalCarbon += listing.impactMetrics.carbonSaved || 0;
            }
          });
          
          // Add random base values to make it interesting
          totalWaste += 5;
          totalCarbon += 12;
          
          // Determine level and badges based on impact
          let newBadges = ["Recycling Starter"];
          let level = 1;
          
          if (totalWaste > 10) {
            newBadges.push("Waste Reducer");
            level = 2;
          }
          
          if (totalCarbon > 20) {
            newBadges.push("Carbon Conscious");
            level = 3;
          }
          
          setImpact({
            wasteDiverted: Math.round(totalWaste),
            carbonSaved: Math.round(totalCarbon),
            badgesEarned: newBadges,
            level,
            progress: Math.min(95, Math.max(5, level * 25 + Math.random() * 15))
          });
        }
      } catch (error) {
        console.error("Error calculating impact:", error);
      }
    }
  }, []);
  
  const navigate = useNavigate();
  
  return (
    <Card className="border-eco-medium/30 hover:shadow-md transition-all animate-fade-in overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-eco-medium to-eco-dark p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white flex items-center">
            <Leaf className="h-4 w-4 mr-2" />
            Your Sustainability Impact
          </h3>
          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
            Level {impact.level}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-6">
        <div className="space-y-6">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Current Level</span>
              <span className="font-medium">Level {impact.level}</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full">
              <div 
                className="bg-gradient-to-r from-eco-medium to-eco-dark h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${impact.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-muted-foreground">
              {Math.round(impact.progress)}% to Level {impact.level + 1}
            </p>
          </div>
          
          {/* Impact stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-eco-light/10 p-3 rounded-lg text-center hover:bg-eco-light/20 transition-colors">
              <p className="text-sm text-muted-foreground mb-1">Waste Diverted</p>
              <p className="text-2xl font-bold text-eco-dark">{impact.wasteDiverted} kg</p>
            </div>
            
            <div className="bg-eco-water/10 p-3 rounded-lg text-center hover:bg-eco-water/20 transition-colors">
              <p className="text-sm text-muted-foreground mb-1">CO₂ Saved</p>
              <p className="text-2xl font-bold text-eco-dark">{impact.carbonSaved} kg</p>
            </div>
          </div>
          
          {/* Badges */}
          <div>
            <div className="flex items-center mb-2">
              <Award className="h-4 w-4 mr-1 text-amber-500" />
              <p className="text-sm font-medium">Badges Earned</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {impact.badgesEarned.map((badge, index) => (
                <Badge key={index} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2 hover-scale border-eco-medium text-eco-dark hover:bg-eco-medium/10"
            onClick={() => navigate("/recycle")}
          >
            Increase Your Impact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonImpactCard;
