
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedListings from "@/components/home/FeaturedListings";
import ImpactTracker from "@/components/home/ImpactTracker";
import AdSidebar from "@/components/common/AdSidebar";
import ListingSubmissionSuccess from "@/components/listing/ListingSubmissionSuccess";

const Index = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [listingType, setListingType] = useState<"sell" | "rent" | "recycle" | "donate">("sell");
  const [listingTitle, setListingTitle] = useState("");
  
  // Check URL params for success message or scroll to featured
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const type = params.get("type") as "sell" | "rent" | "recycle" | "donate" | null;
    const title = params.get("title");
    const scrollToFeatured = params.get("scrollToFeatured");
    
    if (success === "true" && type && title) {
      setListingType(type);
      setListingTitle(title);
      setShowSuccess(true);
      
      // Remove query params from URL without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Handle scrolling to featured listings if parameter is present
    if (scrollToFeatured === "true") {
      // Remove the parameter without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
      // Scroll to featured section after a short delay to allow page to load
      setTimeout(() => {
        const featuredSection = document.getElementById("featured-listings");
        if (featuredSection) {
          featuredSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

  return (
    <MainLayout>
      {showSuccess ? (
        <div className="container mx-auto px-4 py-12">
          <ListingSubmissionSuccess type={listingType} title={listingTitle} />
        </div>
      ) : (
        <>
          <HeroSection />
          <div className="container mx-auto px-4 py-8">
            <CategorySection />
            
            <div className="py-12">
              <ImpactTracker />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <FeaturedListings />
              </div>
              <div className="col-span-1">
                <AdSidebar />
              </div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Index;
