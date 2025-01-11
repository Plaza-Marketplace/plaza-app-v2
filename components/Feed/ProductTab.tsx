import ReviewModalTab from './ReviewModalTab';

const ProductTab = () => {
  return (
    <ReviewModalTab
      isSeller={false}
      reviews={[
        { id: 1, description: 'HELOWLDAOWD', rating: 3 },
        { id: 2, description: 'HELOWLDAOWD', rating: 3 },
        { id: 3, description: 'HELOWLDAOWD', rating: 3 },
      ]}
    />
  );
};

export default ProductTab;
