import React from 'react';
import {
  CollapsibleRef,
  MaterialTabBar,
  Tabs,
} from 'react-native-collapsible-tab-view';
import Radius from '@/constants/Radius';
import { Ionicons } from '@expo/vector-icons';
import ProfileVideos from './profile-videos';
import ProfileProducts from './profile-products';
import ProfileReviews from './profile-reviews';
import ProfileHeader from './ProfileHeader';
import { useAuth } from '@/contexts/AuthContext';
import ProfileLikes from './likes-history/profile-likes';
import { Text } from 'react-native';
import { useGetProfileData } from '@/hooks/routes/profile';
import PlazaHeader from '@/components/PlazaHeader';
import { router } from 'expo-router';

const Profile = () => {
  const ref = React.useRef<CollapsibleRef>();

  const { user } = useAuth();
  console.log(user);
  if (!user) {
    return <Text>User not found...</Text>;
  }

  const { data: profileData, isLoading } = useGetProfileData(user.id, user.id);

  console.log(profileData);

  if (isLoading || !profileData) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {/* <GeneralHeader
        name={`${user.firstName} ${user.lastName}`}
        id={user.id}
        currentUser={user.id}
      /> */}
      <PlazaHeader
        name={`${user.firstName} ${user.lastName}`}
        leftIcon={null}
        rightIcon={<Ionicons name="cog-outline" size={32} />}
        rightOnClick={() => {
          console.log('here');
          router.push('/settings');
        }}
        headerDropdown
        headerOptions={[
          {
            name: 'Orders',
            onPress: () => {
              router.push('/order-history');
            },
          },
          {
            name: 'Likes',
            onPress: () => {
              router.push('/likes-history');
            },
          },
        ]}
      />
      <Tabs.Container
        renderHeader={() => (
          <ProfileHeader
            user={user}
            currentUser={user.id}
            followers={profileData.followerCount}
            following={profileData.followingCount}
            sales={profileData.salesCount}
            isFollowing={profileData.isFollow}
            isRequested={profileData.isTryingToFollow}
          />
        )}
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
      </Tabs.Container>
    </>
  );
};

export default Profile;
