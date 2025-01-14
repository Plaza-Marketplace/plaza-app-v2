import React, { useContext } from 'react';
import {
  CollapsibleRef,
  MaterialTabBar,
  Tabs,
} from 'react-native-collapsible-tab-view';
import GeneralHeader from '@/components/GeneralHeader';
import Radius from '@/constants/Radius';
import { Ionicons } from '@expo/vector-icons';
import ProfileVideos from './profile-videos';
import ProfileProducts from './profile-products';
import ProfileReviews from './profile-reviews';
import ProfileHeader from './ProfileHeader';
import { AuthContext } from '@/contexts/AuthContext';
import ProfileLikes from './profile-likes';

const _layout = () => {
  const ref = React.useRef<CollapsibleRef>();
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  return (
    <>
      <GeneralHeader name={`${user.firstName} ${user.lastName}`} />
      <Tabs.Container
        renderHeader={() => <ProfileHeader user={user} />}
        containerStyle={{ zIndex: -1 }}
        ref={ref}
        renderTabBar={(props) => {
          return (
            <MaterialTabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'black' }}
              style={{ backgroundColor: 'white' }}
            />
          );
        }}
      >
        <Tabs.Tab
          name="video"
          label={(props) => {
            return <Ionicons name="videocam-outline" size={Radius.XL} />;
          }}
        >
          <ProfileVideos userId={user.id} />
        </Tabs.Tab>
        <Tabs.Tab
          name="product"
          label={(props) => {
            return <Ionicons name="storefront-outline" size={Radius.XL} />;
          }}
        >
          <ProfileProducts />
        </Tabs.Tab>
        <Tabs.Tab
          name="reviews"
          label={(props) => {
            return <Ionicons name="star-outline" size={Radius.XL} />;
          }}
        >
          <ProfileReviews sellerId={user.id} />
        </Tabs.Tab>
        <Tabs.Tab
          name="likes"
          label={(props) => {
            return <Ionicons name="heart-outline" size={Radius.XL} />;
          }}
        >
          <ProfileLikes userId={user.id} />
        </Tabs.Tab>
      </Tabs.Container>
    </>
  );
};

export default _layout;
