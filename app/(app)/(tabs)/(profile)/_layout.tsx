import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  CollapsibleRef,
  MaterialTabBar,
  Tabs,
} from 'react-native-collapsible-tab-view';
import GeneralHeader from '@/components/GeneralHeader';
import Radius from '@/constants/Radius';
import CaptionText from '@/components/Texts/CaptionText';
import BoldCaptionText from '@/components/Texts/BoldCaptionText';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import { returnRatings } from '@/components/PlazaIcons/RatingIcons';
import PlazaText from '@/components/Texts/PlazaText';
import { Ionicons } from '@expo/vector-icons';
import ProfileVideos from './profile-videos';
import ProfileProducts from './profile-products';
import ProfileReviews from './profile-reviews';
import ProfileLikes from './profile-likes';
import ExpandableDescription from '@/components/ExpandableDescription';

const example = `As he ventured through the forest, John encountered three trials. First, he came across a river too wide to cross. Nearby, an old ferryman sat waiting. "I will take you across," the ferryman said, "but only if you share something of value." John thought for a moment and shared a story of his dreams, which brought a smile to the ferryman's face. "Your courage is payment enough," he said, and helped John cross.'`;

const _layout = () => {
  const ref = React.useRef<CollapsibleRef>();
  return (
    <>
      <GeneralHeader name="Profile" />
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
        <ExpandableDescription description={example} initialNumberOfLines={4} />
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
