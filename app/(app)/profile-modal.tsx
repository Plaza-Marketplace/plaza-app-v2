import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  CollapsibleRef,
  MaterialTabBar,
  Tabs,
} from 'react-native-collapsible-tab-view';
import Radius from '@/constants/Radius';
import { Ionicons } from '@expo/vector-icons';
import ProfileVideos from '@/app/(app)/(tabs)/(profile)/profile-videos';
import ProfileProducts from '@/app/(app)/(tabs)/(profile)/profile-products';
import ProfileReviews from '@/app/(app)/(tabs)/(profile)/profile-reviews';
import ProfileHeader from '@/app/(app)/(tabs)/(profile)/ProfileHeader';
import { useAuth } from '@/contexts/AuthContext';
import ProfileLikes from '@/app/(app)/(tabs)/(profile)/likes-history/profile-likes';
import { useLocalSearchParams } from 'expo-router';
import { useGetProfileData } from '@/hooks/routes/profile';
import PlazaHeader from '@/components/PlazaHeader';
import Color from '@/constants/Color';

const ProfileModal = () => {
  const ref = React.useRef<CollapsibleRef>();

  const { id } = useLocalSearchParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const user_id = parseInt(id);
  const { data: profileData, isLoading } = useGetProfileData(
    user_id,
    currentUser.id
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!profileData) {
    return <Text>User not found...</Text>;
  }
  if (!currentUser) {
    return <Text>You got in without logging in...?</Text>;
  }

  const { user } = profileData;

  return (
    <View style={{ flex: 1 }}>
      <PlazaHeader
        name={`${user.firstName} ${user.lastName}`}
        leftIcon={
          <Ionicons name="arrow-back" size={32} color={Color.GREY_500} />
        }
      />
      <Tabs.Container
        renderHeader={() => (
          <ProfileHeader
            user={user}
            currentUser={currentUser.id}
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
        <Tabs.Tab
          name="likes"
          label={(props) => {
            return <Ionicons name="heart-outline" size={Radius.XL} />;
          }}
        >
          <ProfileLikes userId={user.id} />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({});
