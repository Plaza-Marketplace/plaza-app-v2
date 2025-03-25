import JoinCard from '@/components/Community/JoinCard';
import SearchBar from '@/components/SearchBar';
import HeadingText from '@/components/Texts/HeadingText';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import useSearchGroups from './useSearchGroups';
import ExploreBanner from '@/components/Community/ExploreBanner';
import Dots from '@/components/Dots';
import AllTags from '@/components/Tags/AllTags';
import useGetExploreTab from './useGetExploreTab';

const Explore = () => {
  const { data: exploreTab, error: exploreTabError } = useGetExploreTab();
  const [activeIndex, setActiveIndex] = useState(0);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const { debouncedValue } = useDebounce(localSearchTerm, 500);
  const { data, error } = useSearchGroups(debouncedValue);

  const mostPopularGroups = exploreTab?.mostPopularGroups ?? [];
  const featuredGroups = exploreTab?.featuredGroups ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Search groups"
            onChangeText={setLocalSearchTerm}
          />
        </View>
        <AllTags />
      </View>
      <View style={styles.section}>
        <HeadingText variant="h5-bold">Most Popular Groups</HeadingText>
        <View style={styles.carouselContainer}>
          <View style={{ height: 200 }}>
            <Carousel
              data={mostPopularGroups}
              renderItem={({ item }) => (
                <View style={styles.carouselItem}>
                  <ExploreBanner
                    id={item.id}
                    backgroundUrl={item.bannerUrl}
                    name={item.name}
                    description={item.description}
                  />
                </View>
              )}
              width={Dimensions.get('window').width}
              height={200}
              loop={false}
              onSnapToItem={setActiveIndex}
            />
          </View>
          <Dots count={mostPopularGroups.length} activeIndex={activeIndex} />
        </View>
      </View>
      {featuredGroups.length > 0 && (
        <View style={styles.section}>
          <HeadingText variant="h5-bold">Featured Groups</HeadingText>
          <FlatList
            numColumns={2}
            data={exploreTab?.featuredGroups}
            renderItem={({ item }) => (
              <JoinCard
                id={item.id}
                name={item.name}
                description={item.description}
                iconUrl={null}
                isMember={item.isMember}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  searchContainer: {
    gap: 16,
    paddingTop: 16,
  },
  searchBar: {
    paddingHorizontal: 16,
  },
  section: {
    paddingHorizontal: 16,
    gap: 8,
  },
  carouselContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  carouselItem: {
    paddingHorizontal: 16, // Add horizontal padding
  },
});
