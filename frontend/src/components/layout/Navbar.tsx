
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Bell, 
  MessageSquare, 
  Search, 
  User, 
  Menu,
  Home,
  ShoppingBag,
  Repeat,
  Recycle,
  Heart,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();
  
  // Function to scroll to featured listings
  const scrollToFeatured = () => {
    // Check if already on homepage
    if (window.location.pathname === '/') {
      const element = document.getElementById('featured-listings');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with featured parameter
      navigate('/?scrollToFeatured=true');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-500 shadow-lg text-white py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl hover:text-green-100 transition">
          Sustainify
        </Link>
        
        {/* Search bar (hidden on mobile) */}
        <div className="hidden md:flex flex-grow max-w-md mx-4">
          <div className="relative w-full">
            <Input 
              type="search" 
              placeholder="Search for items..." 
              className="w-full rounded-full pl-10 text-foreground" 
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        {/* Navigation for desktop */}
        <div className="hidden md:flex items-center space-x-1">
          <TooltipProvider>
            {/* Featured button - NEW */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={scrollToFeatured} className="text-white">
                  <div className="flex flex-col items-center">
                    <Star className="h-4 w-4" />
                    <span className="text-xs">Featured</span>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>View featured listings</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/sell" className="flex flex-col items-center text-white">
                    <ShoppingBag className="h-4 w-4" />
                    <span className="text-xs">Sell</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>List items for sale</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/rent" className="flex flex-col items-center text-white">
                    <Repeat className="h-4 w-4" />
                    <span className="text-xs">Rent</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>List or find rental items</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/recycle" className="flex flex-col items-center text-white">
                    <Recycle className="h-4 w-4" />
                    <span className="text-xs">Recycle</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Find recycling options</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/ngo" className="flex flex-col items-center text-white">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">Donate</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Donate to NGOs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-white">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-white">
              <Link to="/dashboard">
                <User className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%]">
              <div className="py-4">
                <div className="mb-6">
                  <Input 
                    type="search" 
                    placeholder="Search for items..." 
                    className="w-full rounded-lg border" 
                  />
                </div>
                <div className="space-y-3">
                  <Link to="/" className="flex items-center p-2 rounded-lg hover:bg-accent">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </Link>
                  {/* Featured listings button for mobile */}
                  <button 
                    onClick={() => {
                      if (window.location.pathname === '/') {
                        document.querySelector('.mobile-sheet-close')?.dispatchEvent(new Event('click'));
                        setTimeout(() => {
                          const element = document.getElementById('featured-listings');
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      } else {
                        navigate('/?scrollToFeatured=true');
                      }
                    }}
                    className="w-full flex items-center p-2 rounded-lg hover:bg-accent text-left"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    <span>Featured Listings</span>
                  </button>
                  <Link to="/sell" className="flex items-center p-2 rounded-lg hover:bg-accent">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>Sell</span>
                  </Link>
                  <Link to="/rent" className="flex items-center p-2 rounded-lg hover:bg-accent">
                    <Repeat className="mr-2 h-4 w-4" />
                    <span>Rent</span>
                  </Link>
                  <Link to="/recycle" className="flex items-center p-2 rounded-lg hover:bg-accent">
                    <Recycle className="mr-2 h-4 w-4" />
                    <span>Recycle</span>
                  </Link>
                  <Link to="/ngo" className="flex items-center p-2 rounded-lg hover:bg-accent">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Donate</span>
                  </Link>
                  <Link to="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-accent">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
