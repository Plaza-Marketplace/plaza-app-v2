import JoinCard from '@/components/Community/JoinCard';
import SearchBar from '@/components/SearchBar';
import HeadingText from '@/components/Texts/HeadingText';
import useDebounce from '@/hooks/useDebounce';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import useSearchGroups from './useSearchGroups';
import ExploreBanner from '@/components/Community/ExploreBanner';
import Dots from '@/components/Dots';
import AllTags from '@/components/Tags/AllTags';
import useGetExploreTab from './useGetExploreTab';
import SearchResults from './SearchResults';
import CommunityReportModal from '@/components/Report/ReportModal/CommunityReportModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { Ionicons } from '@expo/vector-icons';
import Spacing from '@/constants/Spacing';
import { ScrollView } from 'react-native';

const Explore = () => {
  const { data: exploreTab, error: exploreTabError } = useGetExploreTab();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const { debouncedValue } = useDebounce(localSearchTerm, 500);
  const { data: searchGroups, error } = useSearchGroups(debouncedValue);

  const mostPopularGroups = exploreTab?.featuredGroups ?? [];
  const allGroups = exploreTab?.allGroups ?? [];
  const reportRef = useRef<BottomSheetModal>(null);

  console.log(exploreTab);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Search groups"
            onChangeText={setLocalSearchTerm}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            showCancelButton
          />
        </View>
        {/* <AllTags /> */}
      </View>
      {isSearchFocused ? (
        <SearchResults searchGroups={searchGroups ?? []} />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: Spacing.SPACING_4 }}
        >
          <View style={styles.section}>
            <HeadingText variant="h5-bold">Featured Groups</HeadingText>
            <View style={styles.carouselContainer}>
              <View style={{ height: 200 }}>
                <Carousel
                  data={mostPopularGroups}
                  renderItem={({ item }) => (
                    <View style={styles.carouselItem}>
                      <ExploreBanner
                        id={item.id}
                        bannerUrl={item.bannerUrl}
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
              <Dots
                count={mostPopularGroups.length}
                activeIndex={activeIndex}
              />
            </View>
          </View>
          {allGroups.length > 0 && (
            <View style={styles.section}>
              <HeadingText variant="h5-bold">All Groups</HeadingText>
              <FlatList
                numColumns={2}
                data={exploreTab?.allGroups}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <>
                    <CommunityReportModal
                      communityId={item.id}
                      bottomSheetRef={reportRef}
                    />
                    <View
                      style={{
                        paddingHorizontal: 4,
                        flex: 1 / 2,
                        paddingVertical: Spacing.SPACING_1,
                      }}
                    >
                      <PressableOpacity
                        style={{
                          position: 'absolute',
                          top: Spacing.SPACING_3,
                          right: Spacing.SPACING_3,
                          zIndex: 1,
                        }}
                      >
                        <Ionicons
                          name="flag-outline"
                          size={24}
                          color="black"
                          onPress={() => reportRef.current?.present()}
                        />
                      </PressableOpacity>
                      <JoinCard
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        iconUrl={item.iconUrl}
                        isMember={item.isMember}
                      />
                    </View>
                  </>
                )}
              />
            </View>
          )}
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
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
