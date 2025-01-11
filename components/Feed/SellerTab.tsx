import ReviewModalTab from './ReviewModalTab';

const SellerTab = () => {
  return (
    <ReviewModalTab
      isSeller
      reviews={[
        { id: 1, description: 'HELOWLDAOWD', rating: 3 },
        { id: 2, description: 'HELOWLDAOWD', rating: 3 },
        { id: 3, description: 'HELOWLDAOWD', rating: 3 },
      ]}
    />
  );
};

export default SellerTab;
