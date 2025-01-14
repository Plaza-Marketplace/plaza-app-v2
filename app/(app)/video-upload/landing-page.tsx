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
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { createVideo } from '@/services/video';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { Formik } from 'formik';
import { useSelectedProducts } from '@/contexts/SelectedProductsContext';

type VideoUploadForm = {
  videoUri: string | null;
  description: string;
};

const LandingPage = () => {
  const { session } = useAuth();
  const { data: user, isLoading } = useGetUserByAuthId(session?.user.id);
  const { selectedProducts } = useSelectedProducts();

  if (isLoading || !user) return null;

  const initialValues: VideoUploadForm = {
    videoUri: null,
    description: '',
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusHeader name="Upload a Video" />
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          if (!values.videoUri) return;

          const base64Video = await FileSystem.readAsStringAsync(
            values.videoUri,
            {
              encoding: 'base64',
            }
          );

          await createVideo({
            posterId: user.id,
            description: values.description || null,
            base64Video: base64Video,
            products: selectedProducts,
          });
        }}
      >
        {({ handleChange, handleSubmit, values }) => {
          const handleSelect = async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['videos'],
              allowsEditing: true,
            });

            if (result.canceled) {
              return;
            }

            const video = result.assets[0];

            handleChange('videoUri')(video.uri);
          };

          return (
            <View style={{ flex: 1 }}>
              <View style={styles.container}>
                <PressableOpacity style={{ flex: 1 }} onPress={handleSelect}>
                  <VideoPreview uri={values.videoUri} />
                </PressableOpacity>
                <View style={{ gap: Spacing.SPACING_3 }}>
                  <BoldStandardText>Description</BoldStandardText>
                  <PlazaTextInput
                    onChangeText={handleChange('description')}
                    placeholder="write a caption for your post"
                    multiline
                    style={{ height: 100 }}
                  />
                </View>
                <View style={styles.linkItemsContainer}>
                  <BoldStandardText>Link Items</BoldStandardText>
                  <CaptionText>
                    Add at least 1 item from your store to your post.
                  </CaptionText>
                  <View style={styles.iconsContainer}>
                    {selectedProducts.map((product) => (
                      <Image
                        key={product.id}
                        style={styles.iconContainer}
                        source={{ uri: product.imageUrls[0] }}
                      />
                    ))}
                    <PressableOpacity
                      style={styles.iconContainer}
                      onPress={() => router.push('/video-upload/link-items')}
                    >
                      <PlazaText>+</PlazaText>
                    </PressableOpacity>
                  </View>
                </View>
              </View>
              <Footer
                leftTitle="Save to Drafts"
                rightTitle="Post Video"
                rightOnPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
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
  iconsContainer: {
    flexDirection: 'row',
    gap: Spacing.SPACING_2,
  },
});
