import Footer from '@/components/Footer';
import PlazaTextInput from '@/components/PlazaTextInput';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Formik } from 'formik';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { useAuth } from '@/contexts/AuthContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useCreateCommunityPost } from '@/hooks/queries/useCommunityPosts';
import { CreateCommunityPost, PostType } from '@/models/communityPost';
import PlazaHeader from '@/components/PlazaHeader';
import * as Yup from 'yup';

const yupSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
});

const AddPostModal = () => {
  const auth = useAuth();
  const { data, error } = useGetUserByAuthId(auth?.user.id);
  const { communityId } = useLocalSearchParams<{ communityId: string }>();
  const {
    mutate,
    error: submitError,
    isPending: submitPending,
    isSuccess: submitSuccess,
  } = useCreateCommunityPost();

  return (
    <View style={styles.container}>
      <PlazaHeader name="Create a Post" />
      <Formik
        initialValues={{
          title: '',
          description: '',
        }}
        validationSchema={yupSchema}
        onSubmit={(values) => {
          const post: CreateCommunityPost = {
            communityId: parseInt(communityId),
            posterId: 11,
            title: values.title,
            description: values.description,
            postType: PostType.POST,
          };
          mutate(post);
          router.back();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.container}>
              <View style={{ gap: Spacing.SPACING_3 }}>
                <BoldStandardText>Title</BoldStandardText>
                <PlazaTextInput
                  onChangeText={handleChange('title')}
                  placeholder="example: handmade clay cat mug"
                  error={errors.title}
                />
              </View>
              <View style={{ gap: Spacing.SPACING_3 }}>
                <BoldStandardText>Description</BoldStandardText>
                <PlazaTextInput
                  onChangeText={handleChange('description')}
                  placeholder="example: handmade clay cat mug"
                  style={{ height: 100 }}
                  error={errors.description}
                />
              </View>
            </ScrollView>

            <Footer
              leftTitle="Cancel"
              rightTitle="Create Post"
              leftOnPress={() => {
                router.back();
              }}
              rightOnPress={handleSubmit}
            />
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

export default AddPostModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.SPACING_3,
    flex: 1,
    gap: Spacing.SPACING_4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
    gap: Spacing.SPACING_2,
    paddingHorizontal: Spacing.SPACING_2,
    paddingTop: Spacing.SPACING_3,
  },
});
