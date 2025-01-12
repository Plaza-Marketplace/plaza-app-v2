import AddContentCard from '@/components/AddContentCard';
import ProductSelectedShowcase from '@/components/PostCards/ProductCards/ProductSelectedShowcase';

const ListingCompleteScreen = () => {
  return (
    <AddContentCard
      title="Listing Complete"
      description="Successful"
      buttonTitle="Return to Plaza"
      nextRoute="/"
    >
      <ProductSelectedShowcase />
    </AddContentCard>
  );
};

export default ListingCompleteScreen;
