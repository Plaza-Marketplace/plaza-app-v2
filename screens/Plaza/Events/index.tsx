import EventBanner from '@/components/EventBanner';
import SearchBar from '@/components/SearchBar';
import AllTags from '@/components/Tags/AllTags';
import HeadingText from '@/components/Texts/HeadingText';
import { StyleSheet, View } from 'react-native';
import useGetEvents from './useGetEvents';
import { ScrollView } from 'react-native-gesture-handler';

const Events = () => {
  const { data, error } = useGetEvents();

  const currentlyLive =
    data?.filter(
      (event) =>
        new Date(event.startDate) < new Date() &&
        new Date(event.endDate) > new Date()
    ) ?? [];
  const upcomingEvents =
    data?.filter((event) => new Date(event.startDate) > new Date()) ?? [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchBar placeholder="Search events" />
        </View>
        <AllTags />
      </View>
      {currentlyLive.length > 0 && (
        <View style={styles.section}>
          <HeadingText variant="h5-bold">Currently Live</HeadingText>
          {currentlyLive.map((event) => (
            <EventBanner
              key={event.id}
              id={event.id}
              name={event.name}
              address={event.address}
              city={event.city}
              state={event.state}
              startDate={event.startDate}
              endDate={event.endDate}
              bannerUrl={event.bannerUrl}
              isLive
            />
          ))}
        </View>
      )}
      {upcomingEvents.length > 0 && (
        <View style={styles.section}>
          <HeadingText variant="h5-bold">Upcoming Events</HeadingText>
          {upcomingEvents.map((event) => (
            <EventBanner
              key={event.id}
              id={event.id}
              name={event.name}
              address={event.address}
              city={event.city}
              state={event.state}
              startDate={event.startDate}
              endDate={event.endDate}
              bannerUrl={event.bannerUrl}
              isLive={false}
            />
          ))}
        </View>
      )}
    </ScrollView>
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
