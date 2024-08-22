import ProfileIcon from '@/components/ProfileIcon';
import { StyleSheet, Text, View } from 'react-native';

const ExploreTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <ProfileIcon variant="community" />
    </View>
  );
};

export default ExploreTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
