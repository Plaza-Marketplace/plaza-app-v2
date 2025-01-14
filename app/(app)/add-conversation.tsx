import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import FocusHeader from '@/components/FocusHeader';
import { Formik } from 'formik';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import PlazaTextInput from '@/components/PlazaTextInput';
import Footer from '@/components/Footer';
import { router } from 'expo-router';

const AddConversation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FocusHeader name="Start a Conversation" />
      <Formik
        initialValues={{
          title: '',
          description: '',
        }}
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
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.container}>
              <View style={{ gap: Spacing.SPACING_3 }}>
                <BoldStandardText>Name</BoldStandardText>
                <PlazaTextInput
                  onChangeText={handleChange('title')}
                  placeholder="example: handmade clay cat mug"
                />
              </View>

              <View style={{ gap: Spacing.SPACING_3 }}>
                <BoldStandardText>User ID</BoldStandardText>
                <PlazaTextInput
                  onChangeText={handleChange('title')}
                  placeholder="example: handmade clay cat mug"
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
    </SafeAreaView>
  );
};

export default AddConversation;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
