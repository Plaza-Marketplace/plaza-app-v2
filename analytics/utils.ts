import { Mixpanel } from 'mixpanel-react-native';

const mixpanel = new Mixpanel('452f23a89e7aa893fcc156476207fcb3', true);

mixpanel.init();

export enum Event {
  LIKED_VIDEO = 'Liked Video',
  COMMENTED_ON_VIDEO = 'Commented On Video',
  VIEWED_PRODUCT = 'Viewed Product',
  VIEWED_EVENT = 'Viewed Event',
  JOINED_GROUP = 'Joined Group',
  CREATED_GROUP = 'Created Group',
  LISTED_PRODUCT = 'Listed Product',
  PURCHASED_PRODUCT = 'Purchased Product',
  POSTED_VIDEO = 'Posted Video',
  FINISHED_ONBOARDING = 'Finished Onboarding',
  CLICKED_REVIEW_ICON = 'Clicked Review Icon',
  CLICKED_COMMMENT_ICON = 'Clicked Comment Icon',
  CLICKED_PRODUCT_ICON = 'Clicked Product Icon',
  SHARED_PRODUCT_TO_COMMUNITY = 'Shares Product To Community',
  CLICKED_ADD_TO_CART = 'Clicked Add To Cart',
  CLICKED_BUY_NOW = 'Clicked Buy Now',
  ENTERED_COMMUNITY = 'Entered Community',
  CLICKED_COLLECTION_ITEM = 'Clicked Collection Item',
  CLICKED_POST = 'Clicked Post',
}

export const track = (event: Event, properties?: Record<string, any>) => {
  if (__DEV__) return;

  mixpanel.track(event, properties);
};

export const identify = (userId: string, username?: string, email?: string) => {
  mixpanel.identify(userId);
  mixpanel.getPeople().set('$username', username);
  mixpanel.getPeople().set('$email', email);
};
