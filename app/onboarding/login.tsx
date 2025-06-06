import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
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
import { Formik } from 'formik';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import GoogleOAuth from '@/components/Auth/GoogleOAuth';
import AppleOAuth from '@/components/Auth/AppleSignIn';
import * as Yup from 'yup';
import PressableOpacity from '@/components/Buttons/PressableOpacity';

const LoginScheme = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const { isLoading, session } = useAuth();

  const [passwordVisible, setPasswordVisible] = React.useState(false);

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
        <HeadingText variant="h3-bold">Login</HeadingText>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginScheme}
          onSubmit={async (values) => {
            const { error } = await supabase.auth.signInWithPassword({
              email: values.email,
              password: values.password,
            });
            console.log(error, values);
            if (error) Alert.alert(error.message);
          }}
        >
          {({ handleChange, handleSubmit, values, errors, dirty }) => (
            <>
              <View style={{ marginTop: Spacing.SPACING_3 }}>
                <PlazaTextInput
                  onChangeText={handleChange('email')}
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  style={styles.inputStyle}
                  autoCapitalize="none"
                  error={errors.email}
                />
              </View>

              <View style={{ marginTop: Spacing.SPACING_3 }}>
                <PlazaTextInput
                  onChangeText={handleChange('password')}
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry={!passwordVisible}
                  style={styles.inputStyle}
                  autoCapitalize="none"
                  error={errors.password}
                  rightButton={
                    <PressableOpacity>
                      {passwordVisible ? (
                        <Ionicons
                          name="eye-off"
                          size={24}
                          color={Color.GREY_500}
                          onPress={() => setPasswordVisible(false)}
                        />
                      ) : (
                        <Ionicons
                          name="eye"
                          size={24}
                          color={Color.GREY_500}
                          onPress={() => setPasswordVisible(true)}
                        />
                      )}
                    </PressableOpacity>
                  }
                />
              </View>

              <PlazaButton
                title="Log In"
                style={styles.buttonStyle}
                onPress={handleSubmit}
                disabled={
                  !dirty ||
                  errors.email !== undefined ||
                  errors.password !== undefined
                }
              />
            </>
          )}
        </Formik>

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

export default Login;

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
