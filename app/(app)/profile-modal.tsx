import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  CollapsibleRef,
  MaterialTabBar,
  Tabs,
} from 'react-native-collapsible-tab-view';
import GeneralHeader from '@/components/GeneralHeader';
import Radius from '@/constants/Radius';
import { Ionicons } from '@expo/vector-icons';
import ProfileVideos from '@/app/(app)/(tabs)/(profile)/profile-videos';
import ProfileProducts from '@/app/(app)/(tabs)/(profile)/profile-products';
import ProfileReviews from '@/app/(app)/(tabs)/(profile)/profile-reviews';
import ProfileHeader from '@/app/(app)/(tabs)/(profile)/ProfileHeader';
import { useAuth } from '@/contexts/AuthContext';
import ProfileLikes from '@/app/(app)/(tabs)/(profile)/profile-likes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useGetUserById } from '@/hooks/queries/useUser';
import FocusHeader from '@/components/FocusHeader';
import BackHeader from './(tabs)/(inbox)/BackHeader';

const ProfileModal = () => {
  const ref = React.useRef<CollapsibleRef>();

  const { id } = useLocalSearchParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const user_id = parseInt(id);
  const { data: user, isLoading } = useGetUserById(user_id);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!user) {
    return <Text>User not found...</Text>;
  }
  if (!currentUser) {
    return <Text>You got in without logging in...?</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BackHeader name={`${user.firstName} ${user.lastName}`} />
      <Tabs.Container
        renderHeader={() => (
          <ProfileHeader user={user} currentUser={currentUser.id} />
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
