import EventBanner from '@/components/EventBanner';
import SearchBar from '@/components/SearchBar';
import AllTags from '@/components/Tags/AllTags';
import HeadingText from '@/components/Texts/HeadingText';
import { StyleSheet, View } from 'react-native';
import useGetEvents from './useGetEvents';

const Events = () => {
  const { data, error } = useGetEvents();
  console.log(data, error);
  const mockData = {
    id: 1,
    backgroundUrl:
      'https://biggerbetterbanner.com/wp-content/uploads/2024/08/2-x-8-Vinyl-Banner-24-inches-by-96-inches-Bigger-Better-Banner-Custom-Banner-Printing-www.biggerbetterbanner.com_-scaled.jpg',
    name: 'Hello',
    description: 'Hello world',
  };

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
        <EventBanner
          id={mockData.id}
          backgroundUrl={mockData.backgroundUrl}
          name={mockData.name}
          description={mockData.description}
        />
      </View>
      <View style={styles.section}>
        <HeadingText variant="h5-bold">Upcoming Events</HeadingText>
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
