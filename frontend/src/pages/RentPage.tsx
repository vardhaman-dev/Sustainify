
import MainLayout from "@/components/layout/MainLayout";
import ListingForm from "@/components/listing/ListingForm";

const RentPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <ListingForm type="rent" />
      </div>
    </MainLayout>
  );
};

export default RentPage;
