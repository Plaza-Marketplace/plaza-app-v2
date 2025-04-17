import Footer from '@/components/Footer';
import PlazaTextInput from '@/components/PlazaTextInput';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import Spacing from '@/constants/Spacing';
import {
  Alert,
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
import PlazaHeader from '@/components/PlazaHeader';
import ProfileHeader from '@/components/Headers/ProfileHeader';
import PlazaButton from '@/components/Buttons/PlazaButton';
import { deleteAccount } from '@/services/supabase_functions/deleteUser';
import { Ionicons } from '@expo/vector-icons';

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

  const onPressDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            // Call your delete function here
            console.log('User confirmed delete');
            await deleteAccount();
            // router.replace('/login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        name="Settings"
        accountForSafeArea={false}
        rightIcon={<Ionicons name="chevron-back" size={24} color="black" />}
        rightOnClick={() => router.back()}
      />
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          description: user.description,
          displayName: user.displayName,
        }}
        onSubmit={(values) => {
          const updates: UpdateUser = {
            id: user.id,
            firstName: values.firstName,
            lastName: values.lastName,
            description: values.description,
            displayName: values.displayName,
          };
          mutate(updates);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.container}>
              <PlazaTextInput
                label="First Name"
                onChangeText={handleChange('firstName')}
                placeholder="Your first name..."
                value={values.firstName}
              />
              <PlazaTextInput
                label="Last Name"
                onChangeText={handleChange('lastName')}
                placeholder="Your last name..."
                value={values.lastName}
              />
              <PlazaTextInput
                label="Display Name"
                onChangeText={handleChange('displayName')}
                placeholder="Your display name..."
                value={values.displayName || ''}
              />
              <PlazaTextInput
                label="Description"
                multiline
                onChangeText={handleChange('description')}
                placeholder="Example: i am cool"
                style={{ height: 100 }}
                value={values.description || ''}
              />

              <PlazaButton
                title="Log out"
                onPress={() => {
                  supabase.auth.signOut();
                  // queryClient.clear();
                  router.navigate('/login');
                }}
              />

              <PressableOpacity onPress={onPressDelete}>
                <Text style={{ color: 'red' }}>Delete Account</Text>
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
