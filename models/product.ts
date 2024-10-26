import User from './user';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  seller: User;
  images: string[];
};

export default Product;
