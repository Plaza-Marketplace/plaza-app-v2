import Community from './models/community';
import CommunityProduct from './models/communityProduct';
import Product from './models/product';

const MOCK_COMMUNITIES: Community[] = [
  {
    id: 1,
    name: 'Cats',
    memberCount: 20,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    iconUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg',
    backgroundUrl:
      'https://lh6.googleusercontent.com/proxy/iluf316dZMqj26KYG-qwmdvmXS4-OggnbvaYzbWSiqobGY6rsCP37-5xNPDPG6KpBNXT1w30I2VAH5dj_TMy',
  },
  {
    id: 2,
    name: 'Dogs',
    memberCount: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    iconUrl:
      'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
    backgroundUrl:
      'https://www.jessleephotos.com/images/640/Yellowsotne-Cloud-burst.jpg',
  },
  {
    id: 3,
    name: 'Shit',
    memberCount: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    iconUrl:
      'https://nypost.com/wp-content/uploads/sites/2/2018/06/180608-doctors-on-why-people-poop-outside.jpg?quality=75&strip=all',
    backgroundUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4HcayAprfTLDZb3m5ob_DQWpJlq3PVAcEHg&s',
  },
];

const MOCK_PRODUCT: Product = {
  id: 1,
  name: 'Pot',
  description: 'Cool item!',
  price: 4.99,
  rating: 4.67,
  sellerId: 1,
  images: [
    'https://media.cnn.com/api/v1/images/stellar/prod/220724124922-marijuana-stock.jpg?c=original',
    'https://media.cnn.com/api/v1/images/stellar/prod/220724124922-marijuana-stock.jpg?c=original',
  ],
};

const MOCK_PRODUCT_2: Product = {
  id: 2,
  name: 'Cat',
  description: 'Food!',
  price: 4.99,
  rating: 4.67,
  sellerId: 1,
  images: [
    'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg',
  ],
};

const MOCK_PRODUCT_3: Product = {
  id: 3,
  name: 'Cat',
  description: 'Food!',
  price: 4.99,
  rating: 4.67,
  sellerId: 1,
  images: [
    'https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2021-12/img_1570.jpg?itok=4nWOikbM',
  ],
};

const MOCK_COMMUNITY_PRODUCTS: CommunityProduct[] = [
  {
    id: 1,
    communityId: 1,
    product: MOCK_PRODUCT,
    posterId: 1,
    description: "I'm selling this pot",
  },
  {
    id: 2,
    communityId: 1,
    product: MOCK_PRODUCT_2,
    posterId: 1,
    description: "I'm selling this cat",
  },
  {
    id: 3,
    communityId: 1,
    product: MOCK_PRODUCT_3,
    posterId: 1,
    description: "I'm selling this cat",
  },
  {
    id: 4,
    communityId: 1,
    product: MOCK_PRODUCT_3,
    posterId: 1,
    description: null,
  },
  {
    id: 1,
    communityId: 1,
    product: MOCK_PRODUCT,
    posterId: 1,
    description: "I'm selling this pot",
  },
  {
    id: 5,
    communityId: 1,
    product: MOCK_PRODUCT_2,
    posterId: 1,
    description: 'Yummy!',
  },
  {
    id: 1,
    communityId: 1,
    product: MOCK_PRODUCT,
    posterId: 1,
    description: "I'm selling this pot",
  },
];

const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 1,
    communityId: 1,
    title: 'I love cats',
    description: 'Cats are the best!',
    posterId: 1,
    timeCreated: '2022-02-02',
  },
  {
    id: 2,
    communityId: 1,
    title: 'I love dogs',
    description: 'Dogs are the best!',
    posterId: 1,
    timeCreated: '2022-02-02',
  },
  {
    id: 3,
    communityId: 1,
    title: 'I love things',
    description: 'Things are the best!',
    posterId: 1,
    timeCreated: '2022-02-02',
  },
]

export { MOCK_COMMUNITIES, MOCK_PRODUCT, MOCK_COMMUNITY_PRODUCTS, MOCK_COMMUNITY_POSTS };
