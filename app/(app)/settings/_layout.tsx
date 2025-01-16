import FocusHeader from '@/components/FocusHeader';
import Footer from '@/components/Footer';
import PlazaTextInput from '@/components/PlazaTextInput';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import Spacing from '@/constants/Spacing';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { router } from 'expo-router';
import Color from '@/constants/Color';
import { UpdateUser } from '@/models/user';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useUpdateUser } from '@/hooks/queries/useUser';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { supabase } from '@/utils/supabase';
import { useQueryClient } from '@tanstack/react-query';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const { mutate, isSuccess } = useUpdateUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }
  }, [isSuccess]);

  if (!user) {
    return (
      <SafeAreaView>
        <Text>Something went wrong...?</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FocusHeader name="Settings" />
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          description: user.description,
        }}
        onSubmit={(values) => {
          const updates: UpdateUser = {
            id: user.id,
            firstName: values.firstName,
            lastName: values.lastName,
            description: values.description,
          };
          mutate(updates);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.container}>
              <View style={{ gap: Spacing.SPACING_3 }}>
                <BoldStandardText>First Name</BoldStandardText>
                <PlazaTextInput
                  onChangeText={handleChange('firstName')}
                  placeholder="Your first name..."
                  value={values.firstName}
                />
              </View>
              <View style={{ gap: Spacing.SPACING_3 }}>
                <BoldStandardText>Last Name</BoldStandardText>
                <PlazaTextInput
                  onChangeText={handleChange('lastName')}
                  placeholder="Your last name..."
                  value={values.lastName}
                />
              </View>
              <View style={{ gap: Spacing.SPACING_3 }}>
                <BoldStandardText>Description</BoldStandardText>
                <PlazaTextInput
                  onChangeText={handleChange('description')}
                  placeholder="Example: i am cool"
                  style={{ height: 100 }}
                  value={values.description || ''}
                />
              </View>

              <PressableOpacity
                onPress={() => {
                  supabase.auth.signOut();
                  // queryClient.clear();
                  router.navigate('/login');
                }}
              >
                <Text style={{ color: 'red' }}>Logout</Text>
              </PressableOpacity>
            </ScrollView>

            <Footer
              leftTitle="Cancel"
              rightTitle="Update"
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

export default Settings;

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
