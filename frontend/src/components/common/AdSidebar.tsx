
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdSidebar = () => {
  const localBusinesses = [
    {
      name: "Green Repairs",
      tagline: "Fix it, don't replace it!",
      discount: "10% off for Sustanify users",
      bgColor: "bg-green-50"
    },
    {
      name: "Eco Rental Shop",
      tagline: "Tools & equipment for rent",
      discount: "First day free with code: ECO123",
      bgColor: "bg-blue-50"
    },
    {
      name: "Thrift Haven",
      tagline: "Vintage & pre-loved treasures",
      discount: "Buy 2 Get 1 Free on Sundays",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <aside className="w-full p-4 border border-accent/10 rounded-lg bg-card shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-center text-gradient">Hall of Local Businesses</h3>
        <span className="bg-accent/20 text-xs text-accent-foreground px-2 py-1 rounded-full">Hyperlocal</span>
      </div>
      
      <div className="space-y-4">
        {localBusinesses.map((business, index) => (
          <Card key={index} className={`overflow-hidden shadow-sm border-0 ${business.bgColor}`}>
            <CardContent className="p-4">
              <h4 className="font-medium">{business.name}</h4>
              <p className="text-sm text-muted-foreground">{business.tagline}</p>
              <div className="mt-2 text-xs font-medium text-accent-foreground py-1 px-2 bg-accent/20 rounded-md inline-block">
                {business.discount}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 border-t pt-4">
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Advertise your local business here</p>
          <p className="text-xs text-muted-foreground mb-3">Starting at ₹1,000 for 15 days</p>
          <Button variant="outline" size="sm" className="w-full">
            View Ad Pricing
          </Button>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-center text-muted-foreground">
        <p>Supporting local sustainable businesses</p>
      </div>
    </aside>
  );
};

export default AdSidebar;
