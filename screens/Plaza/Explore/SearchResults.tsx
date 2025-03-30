import { ScrollView, View } from 'react-native';
import { SearchGroup } from './models';
import { FC } from 'react';
import GroupIcon from '@/components/Community/GroupIcon';
import BodyText from '@/components/Texts/BodyText';
import { StyleSheet } from 'react-native';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';

interface SearchResultsProps {
  searchGroups: SearchGroup[];
}

const SearchResults: FC<SearchResultsProps> = ({ searchGroups }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {searchGroups.map((group) => (
        <PressableOpacity
          style={styles.searchGroup}
          key={group.id}
          onPress={() =>
            router.push({
              pathname: '/community',
              params: { id: group.id },
            })
          }
        >
          <GroupIcon id={group.id} size={40} url={group.iconUrl} />
          <BodyText variant="lg-medium">{group.name}</BodyText>
        </PressableOpacity>
      ))}
    </ScrollView>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  searchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
