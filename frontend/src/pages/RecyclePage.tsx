
import MainLayout from "@/components/layout/MainLayout";
import ListingForm from "@/components/listing/ListingForm";
import RecyclersDirectory from "@/components/recycling/RecyclersDirectory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarbonImpactCard from "@/components/dashboard/CarbonImpactCard";

const RecyclePage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1">
            <CarbonImpactCard />
          </div>
          <div className="lg:col-span-2">
            <Tabs defaultValue="directory" className="space-y-6">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="directory">Find Recyclers</TabsTrigger>
                <TabsTrigger value="form">Submit for Recycling</TabsTrigger>
              </TabsList>
              <TabsContent value="directory">
                <RecyclersDirectory type="recycler" />
              </TabsContent>
              <TabsContent value="form">
                <ListingForm type="recycle" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RecyclePage;
