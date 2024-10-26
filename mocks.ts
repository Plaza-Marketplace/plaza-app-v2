import Community from './models/community';

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

export { MOCK_COMMUNITIES };
