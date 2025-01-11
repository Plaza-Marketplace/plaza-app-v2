import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  CollapsibleRef,
  MaterialTabBar,
  MaterialTabItem,
  Tabs,
} from 'react-native-collapsible-tab-view';
import ProfileHeader from '@/components/ProfileHeader';
import Radius from '@/constants/Radius';
import CaptionText from '@/components/Texts/CaptionText';
import BoldCaptionText from '@/components/Texts/BoldCaptionText';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import { returnRatings } from '@/components/PlazaIcons/RatingIcons';
import PlazaText from '@/components/Texts/PlazaText';
import { Ionicons } from '@expo/vector-icons';
import { TabBarItem } from 'react-native-tab-view';
import ProfileVideos from './profile-videos';
import ProfileProducts from './profile-products';
import ProfileReviews from './profile-reviews';
import ProfileLikes from './profile-likes';

const _layout = () => {
  const ref = React.useRef<CollapsibleRef>();
  return (
    <>
      <ProfileHeader name="Profile" />
      <Tabs.Container
        renderHeader={MyHeader}
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
          <ProfileVideos />
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
          <ProfileReviews />
        </Tabs.Tab>
        <Tabs.Tab
          name="likes"
          label={(props) => {
            return <Ionicons name="heart-outline" size={Radius.XL} />;
          }}
        >
          <ProfileLikes />
        </Tabs.Tab>
      </Tabs.Container>
    </>
  );
};

const MyHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTopGrid}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerTopColumnSmall}>
            <View style={styles.testCircle} />
          </View>
          <View style={styles.headerTopColumnLarge}>
            <View style={styles.infoContainer}>
              <View style={styles.centerText}>
                <BoldStandardText>1234</BoldStandardText>
                <BoldStandardText>Sales</BoldStandardText>
              </View>

              <View style={styles.centerText}>
                <BoldStandardText>1234</BoldStandardText>
                <BoldStandardText>Followers</BoldStandardText>
              </View>

              <View style={styles.centerText}>
                <BoldStandardText>1234</BoldStandardText>
                <BoldStandardText>Following</BoldStandardText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.headerTopRow}>
          <View style={styles.headerTopColumnSmall}>
            <View style={styles.commonMargin}>
              <BoldCaptionText>@username</BoldCaptionText>
            </View>
            <CaptionText>City, State</CaptionText>
          </View>
          <View style={styles.headerTopColumnLarge}>
            <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
              {returnRatings(4.5, 'small')}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.commonMargin}>
        <PlazaText>
          User-generated description of the post and should be truncated to four
          lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </PlazaText>
      </View>
    </View>
  );
};

export default _layout;

const styles = StyleSheet.create({
  test: {
    flex: 1,
    height: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    padding: 16,
  },
  headerTopGrid: {
    flexDirection: 'column',
  },
  headerTopColumnSmall: {
    width: '30%',
    flexDirection: 'column',
  },
  headerTopColumnLarge: {
    flex: 1,
    flexDirection: 'column',
  },
  headerTopRow: {
    flexDirection: 'row',
  },
  testCircle: {
    width: 2 * Radius.XL,
    height: 2 * Radius.XL,
    borderRadius: Radius.XL,
    backgroundColor: 'gray',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerText: {
    alignItems: 'center',
  },
  commonMargin: {
    marginTop: 5,
    marginBottom: 5,
  },
});
