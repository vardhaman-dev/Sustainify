
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-eco-light/10 to-accent/10">
      <div className="absolute inset-0 z-0 bg-eco-water/10"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              <span className="text-gradient">Rent, Sell, Recycle Locally – Sustainably.</span>
            </h1>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl">
              Join India's #1 Hyperlocal Green Marketplace. Give your items a second life or find exactly what you need.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/auth">
                <Button size="lg" className="eco-gradient">
                  Join Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M7 10v12"></path>
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                  </svg>
                </div>
                <p>Free listings</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="2" x2="22" y1="10" y2="10"></line>
                  </svg>
                </div>
                <p>Escrow Payments</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                    <path d="M8.44 12.64a3 3 0 1 0-1.93-3.67"></path>
                    <path d="M9.7 10.74a1 1 0 1 0-1.18-1.18"></path>
                    <path d="M14.07 13.83a3 3 0 1 0 4.24 4.24"></path>
                    <path d="M14.07 17.06a1 1 0 1 0 1.18 1.18"></path>
                    <path d="M14.93 8.07A6 6 0 0 0 15 7.86a4 4 0 0 0-6.78-2.26 4 4 0 0 0-4.58 5.91"></path>
                    <path d="M13.4 14a4 4 0 0 0 5.27 1.5 4 4 0 0 0 2.1-5.53"></path>
                  </svg>
                </div>
                <p>Reduce Carbon Impact</p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&auto=format&fit=crop" 
                alt="People exchanging items" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <p className="font-semibold">Join 10,000+ users in sustainable commerce</p>
                <p className="text-sm">50,000+ kg waste diverted from landfills</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
