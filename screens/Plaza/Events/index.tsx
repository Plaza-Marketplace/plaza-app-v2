import EventBanner from '@/components/EventBanner';
import SearchBar from '@/components/SearchBar';
import AllTags from '@/components/Tags/AllTags';
import HeadingText from '@/components/Texts/HeadingText';
import { FlatList, StyleSheet, View } from 'react-native';
import useGetEvents from './useGetEvents';

const Events = () => {
  const { data, error } = useGetEvents();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchBar placeholder="Search events" />
        </View>
        <AllTags />
      </View>
      <View style={styles.section}>
        <HeadingText variant="h5-bold">Currently Live</HeadingText>
        {/* <EventBanner
          id={data.id}
          backgroundUrl={data.bannerUrl}
          name={mockData.name}
          description={mockData.description}
        /> */}
      </View>
      <View style={styles.section}>
        <HeadingText variant="h5-bold">Upcoming Events</HeadingText>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <EventBanner
              id={item.id}
              name={item.name}
              address={item.address}
              city={item.city}
              state={item.state}
              startDate={item.startDate}
              endDate={item.endDate}
              bannerUrl={item.bannerUrl}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
  },
  section: {
    gap: 8,
    paddingHorizontal: 16,
  },
  carouselContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  searchContainer: {
    gap: 16,
    paddingTop: 16,
  },
  searchBar: {
    paddingHorizontal: 16,
  },
});
