import Product from './product';

type CommunityProduct = {
  id: number;
  communityId: number;
  product: Product;
  posterId: number;
  description: string | null;
};

export default CommunityProduct;
