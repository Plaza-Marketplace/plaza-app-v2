import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeadingText from '@/components/Texts/HeadingText';
import PlazaTextInput from '@/components/PlazaTextInput';
import Spacing from '@/constants/Spacing';
import { Plaza } from '@/components/Icons';
import PlazaButton from '@/components/Buttons/PlazaButton';
import BodyText from '@/components/Texts/BodyText';
import Color from '@/constants/Color';
import { Ionicons } from '@expo/vector-icons';
import ExitButton from '@/components/Buttons/ExitButton';
import { Redirect, router } from 'expo-router';
import { Formik } from 'formik';
import { supabase } from '@/utils/supabase';
import { getUserByAuthId } from '@/services/crud/user';
import GoogleOAuth from '@/components/Auth/GoogleOAuth';
import AppleOAuth from '@/components/Auth/AppleSignIn';
import { useAuth } from '@/contexts/AuthContext';
import LinkText from '@/components/Texts/LinkText';

const CreateAccount = () => {
  const { isLoading, session } = useAuth();

  if (!isLoading && session) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: Color.WHITE,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: Spacing.SPACING_8,
          right: Spacing.SPACING_3,
          backgroundColor: Color.NEUTRALS_100,
        }}
      >
        <ExitButton />
      </View>
      <View style={{ width: '90%' }}>
        <HeadingText variant="h3-bold">Sign Up</HeadingText>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            const {
              data: { session },
              error,
            } = await supabase.auth.signUp({
              email: values.email,
              password: values.password,
              options: {
                emailRedirectTo:
                  'https://www.plaza-app.com/supabase-auth/success',
                data: {
                  username: '',
                  completed_onboarding: false, // Set to false to indicate onboarding is not complete
                },
              },
            });

            if (error) {
              Alert.alert(error.message);
              return;
            }
            if (!session) {
              Alert.alert('Please check your inbox for email verification!');
              return;
            }

            const user = await getUserByAuthId(session.user.id);

            router.push({
              pathname: '/onboarding/account-details',
            });
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <>
              <View style={{ marginTop: Spacing.SPACING_3 }}>
                <PlazaTextInput
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  style={styles.inputStyle}
                  autoCapitalize="none"
                />
              </View>

              <View style={{ marginTop: Spacing.SPACING_3 }}>
                <PlazaTextInput
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  style={styles.inputStyle}
                  autoCapitalize="none"
                />
              </View>

              <PlazaButton
                title="Create Account"
                style={styles.buttonStyle}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>

        <BodyText variant="sm" style={{ marginTop: Spacing.SPACING_2 }}>
          By creating an account, you agree to our{' '}
          <LinkText
            variant="sm"
            href="https://www.plaza-app.com/terms-of-service"
          >
            Terms of Service
          </LinkText>{' '}
          and{' '}
          <LinkText
            variant="sm"
            href="https://www.plaza-app.com/privacy-policy"
          >
            Privacy Policy
          </LinkText>
          .
        </BodyText>

        <View style={styles.borderContainer}>
          <View style={styles.border} />
          <BodyText
            variant="sm"
            style={{ marginHorizontal: Spacing.SPACING_2 }}
            color={Color.GREY_400}
          >
            OR
          </BodyText>
          <View style={styles.border} />
        </View>

        <GoogleOAuth
          style={{
            marginTop: Spacing.SPACING_3,
          }}
        />

        <AppleOAuth
          style={{
            marginTop: Spacing.SPACING_3,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  inputStyle: {
    padding: Spacing.SPACING_2,
    fontSize: 16,
  },
  buttonStyle: {
    marginTop: Spacing.SPACING_3,
    padding: Spacing.SPACING_3,
  },
  borderContainer: {
    marginTop: Spacing.SPACING_3,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 30,
  },
  border: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
});
