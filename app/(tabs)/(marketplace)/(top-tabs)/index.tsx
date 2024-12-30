import {
  CommentIcon,
  HeartIcon,
  RatingIcon,
  ShareIcon,
} from '@/components/PlazaIcons/VideoOverlayIcons';
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
      <HeartIcon color={'#008800'} />
      <RatingIcon color={'#008800'} />
      <CommentIcon color={'#008800'} />
      <ShareIcon color={'#008800'} />
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
