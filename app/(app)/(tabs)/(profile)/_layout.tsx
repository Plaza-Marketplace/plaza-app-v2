import React from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import ProfileLikes from './profile-likes';
import { useLocalSearchParams } from 'expo-router';
import { User } from '@/models/user';
import { useGetUserById } from '@/hooks/queries/useUser';
import { Text } from 'react-native';

const _layout = () => {
  const ref = React.useRef<CollapsibleRef>();

  let user: User | undefined = undefined;

  const { id: userIdStr } = useLocalSearchParams<{ id: string }>();
  const userId = parseInt(userIdStr);

  if (userId) {
    const { data: userFromQuery } = useGetUserById(userId);
    user = userFromQuery;
  } else {
    const { user: userFromContext } = useAuth();
    user = userFromContext;
  }

  if (!user) {
    return <Text>User not found...</Text>;
  }

  console.log('user?', user);

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
          <ProfileProducts userId={user.id} />
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
