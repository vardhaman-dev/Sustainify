
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ListingDetail from "@/components/listing/ListingDetail";
import AdSidebar from "@/components/common/AdSidebar";
import { useEffect } from "react";

const ListingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  if (!id) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Listing Not Found</h1>
          <p>The listing you're looking for doesn't exist.</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content (80%) */}
          <div className="w-full lg:w-4/5">
            <ListingDetail id={id} />
          </div>
          
          {/* Ad Sidebar (20%) */}
          <div className="w-full lg:w-1/5">
            <AdSidebar />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListingDetailPage;
