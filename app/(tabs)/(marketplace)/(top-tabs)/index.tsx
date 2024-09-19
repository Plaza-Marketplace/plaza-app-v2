import ProfileIcon from '@/components/ProfileIcon';
import CaptionText from '@/components/Texts/CaptionText';
import FocusedText from '@/components/Texts/FocusedText';
import HeaderText from '@/components/Texts/HeaderText';
import PlazaText from '@/components/Texts/PlazaText';
import { Button, StyleSheet, Text, View } from 'react-native';

const ExploreTab = () => {
  return (
    <View style={styles.container}>
      <CaptionText>Caption</CaptionText>
      <PlazaText>Regular</PlazaText>
      <FocusedText>Focused</FocusedText>
      <HeaderText>Header</HeaderText>
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
