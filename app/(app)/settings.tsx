import Footer from '@/components/Footer';
import PlazaTextInput from '@/components/PlazaTextInput';
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
import PlazaButton from '@/components/Buttons/PlazaButton';
import { deleteAccount } from '@/services/supabase_functions/deleteUser';
import { Ionicons } from '@expo/vector-icons';
import ProfileIcon from '@/components/ProfileIcon';
import Radius from '@/constants/Radius';
import BodyText from '@/components/Texts/BodyText';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Check } from '@/components/Icons';
import HeadingText from '@/components/Texts/HeadingText';
import PlazaHeader from '@/components/PlazaHeader';
import * as Yup from 'yup';

const settingsSchema = Yup.object().shape({
  displayName: Yup.string()
    .max(50, 'Display name must be 50 characters or less')
    .required('Display name is required'),
  description: Yup.string().nullable(),
  imageUri: Yup.string().nullable(),
});

const Settings = () => {
  const { user } = useContext(AuthContext);
  const { mutate, isSuccess, isError } = useUpdateUser();

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

  useEffect(() => {
    if (isError) {
      Alert.alert('Error', 'Something went wrong, please try again later.');
    }
  }, [isError]);

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
      <PlazaHeader
        name="Settings"
        accountForSafeArea={false}
        leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
        rightOnClick={() => router.back()}
      />
      <Formik
        initialValues={{
          username: user.username,
          description: user.description,
          displayName: user.displayName,
          imageUri: user.profileImageUrl,
        }}
        validationSchema={settingsSchema}
        // validateOnMount
        onSubmit={async (values) => {
          console.log(values);
          // detect if image has changed
          let base64Image = null;
          if (values.imageUri && values.imageUri !== user.profileImageUrl) {
            base64Image = values.imageUri
              ? await FileSystem.readAsStringAsync(values.imageUri, {
                  encoding: 'base64',
                })
              : null;
          }

          const updates: UpdateUser = {
            id: user.id,
            description: values.description,
            displayName: values.displayName,
            profileImageBase64: base64Image,
          };
          mutate(updates);
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue, errors, dirty, isValid }) => {
          const handleAddImage = async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsMultipleSelection: false,
            });

            if (result.canceled) return;

            setFieldValue('imageUri', result.assets[0].uri);
          };
          return (
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <PressableOpacity
                    style={{
                      marginTop: Spacing.SPACING_2,
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    onPress={handleAddImage}
                  >
                    <ProfileIcon
                      variant="user"
                      url={values.imageUri || undefined}
                      size={2 * Radius.XL}
                    />
                    <BodyText
                      variant="md-bold"
                      style={{ marginTop: Spacing.SPACING_2 }}
                    >
                      Edit Photo
                    </BodyText>
                  </PressableOpacity>
                  <BodyText
                    variant="sm"
                    color={Color.TEXT_SECONDARY}
                    style={{ marginTop: Spacing.SPACING_1 }}
                  >
                    {errors.imageUri}
                  </BodyText>
                </View>
                <PlazaTextInput
                  label="Username"
                  value={values.username}
                  editable={false}
                  style={{ opacity: 0.3 }}
                />
                <PlazaTextInput
                  label="Display Name"
                  onChangeText={handleChange('displayName')}
                  placeholder="Your display name..."
                  value={values.displayName || ''}
                  error={errors.displayName}
                />
                <PlazaTextInput
                  label="Description"
                  multiline
                  onChangeText={handleChange('description')}
                  placeholder="Example: i am cool"
                  style={{ height: 100 }}
                  value={values.description || ''}
                  error={errors.description}
                />

                <PlazaButton
                  title="Log out"
                  onPress={() => {
                    supabase.auth.signOut();
                    // queryClient.clear();
                    router.navigate('/onboarding/login');
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
                rightDisabled={!isValid || !dirty}
              />
            </KeyboardAvoidingView>
          );
        }}
      </Formik>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: isSuccess ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={[styles.checkContainer, { marginBottom: Spacing.SPACING_4 }]}
        >
          <Check width={45} height={45} color={Color.WHITE} />
        </View>
        <HeadingText variant="h5-bold">Edited your profile!</HeadingText>
      </View>
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
  scrollContentContainer: {
    flexGrow: 1,
    gap: Spacing.SPACING_4,
    paddingHorizontal: Spacing.SPACING_3,
    paddingBottom: Spacing.SPACING_10,
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
  checkContainer: {
    padding: 10,
    backgroundColor: Color.SUCCESS_DEFAULT,
    borderRadius: 9999,
  },
});
