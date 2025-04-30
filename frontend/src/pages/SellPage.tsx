
import MainLayout from "@/components/layout/MainLayout";
import ListingForm from "@/components/listing/ListingForm";

const SellPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <ListingForm type="sell" />
      </div>
    </MainLayout>
  );
};

export default SellPage;
