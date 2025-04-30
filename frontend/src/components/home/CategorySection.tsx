
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    title: "Sell",
    description: "List your items for sale. Free listings, pay only when you sell (8-12% commission).",
    icon: "💰",
    link: "/sell",
    color: "bg-eco-medium/20 hover:bg-eco-medium/30"
  },
  {
    title: "Rent",
    description: "Rent out items you don't use often. Perfect for seasonal items or expensive equipment.",
    icon: "🔄",
    link: "/rent",
    color: "bg-eco-water/20 hover:bg-eco-water/30"
  },
  {
    title: "Recycle",
    description: "Find certified recycling partners near you. Track your environmental impact.",
    icon: "♻️",
    link: "/recycle",
    color: "bg-eco-light/20 hover:bg-eco-light/30"
  },
  {
    title: "Donate",
    description: "Connect with verified NGOs and donate items to those in need. Get tax benefits.",
    icon: "🎁",
    link: "/ngo",
    color: "bg-accent/20 hover:bg-accent/30"
  }
];

const CategorySection = () => {
  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 inline-block text-gradient">How would you like to contribute?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Join our mission to create a more sustainable future through our circular economy platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={category.link} key={category.title}>
              <Card className={`h-full transition-all hover:shadow-md ${category.color} border-0`}>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{category.title}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                  
                  {category.title === "Sell" || category.title === "Rent" ? (
                    <Badge variant="outline" className="mt-4 bg-green-50 text-green-700">Free Listing</Badge>
                  ) : (
                    <Badge variant="outline" className="mt-4 bg-blue-50 text-blue-700">Partner Program</Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-6 shadow-lg border border-accent/10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2 text-gradient">Sustainability Impact</h3>
                <p className="text-sm text-muted-foreground">Join thousands making a difference in their communities</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-eco-medium">50,000+ kg</p>
                  <p className="text-xs text-muted-foreground">Waste Diverted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-eco-water">10,000+</p>
                  <p className="text-xs text-muted-foreground">Transactions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">5,000+</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
