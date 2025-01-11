import PressableOpacity from '@/components/Buttons/PressableOpacity';
import FocusHeader from '@/components/FocusHeader';
import PlazaTextInput from '@/components/PlazaTextInput';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import CaptionText from '@/components/Texts/CaptionText';
import PlazaText from '@/components/Texts/PlazaText';
import Footer from '@/components/Footer';
import VideoPreview from '@/components/VideoPreview';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LandingPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusHeader name="Upload a Video" />
      <View style={styles.container}>
        <VideoPreview />
        <View style={{ gap: Spacing.SPACING_3 }}>
          <BoldStandardText>Description</BoldStandardText>
          <PlazaTextInput
            placeholder="write a caption for your post"
            multiline
            style={{ height: 100 }}
          />
        </View>
        <View style={styles.linkItemsContainer}>
          <BoldStandardText>Link Items</BoldStandardText>
          <CaptionText>
            Add at least 1 item from your store your post.
          </CaptionText>
          <PressableOpacity
            style={styles.iconContainer}
            onPress={() => router.push('/video-upload/link-items')}
          >
            <PlazaText>Icon</PlazaText>
          </PressableOpacity>
        </View>
      </View>
      <Footer leftTitle="Save to Drafts" rightTitle="Post Video" />
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.SPACING_3,
    gap: Spacing.SPACING_3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
    borderRadius: Radius.ROUNDED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkItemsContainer: {
    gap: Spacing.SPACING_2,
  },
});
