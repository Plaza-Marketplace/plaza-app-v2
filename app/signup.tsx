import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Formik } from 'formik';
import PlazaTextInput from '@/components/PlazaTextInput';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import Spacing from '@/constants/Spacing';
import HeaderText from '@/components/Texts/HeaderText';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import Footer from '@/components/Footer';
import { supabase } from '@/utils/supabase';

const _layout = () => {
  const { isLoading, session } = useAuth();

  if (!isLoading && session) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={styles.container}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            username: '',
            firstname: '',
            lastname: '',
          }}
          onSubmit={async (values) => {
            const {
              data: { session },
              error,
            } = await supabase.auth.signUp({
              email: values.email,
              password: values.password,
              options: {
                data: {
                  first_name: values.firstname,
                  last_name: values.lastname,
                  username: values.username,
                },
                emailRedirectTo: 'https://www.plaza-app.com/confirmed.html',
              },
            });

            if (error) Alert.alert(error.message);
            if (!session)
              Alert.alert('Please check your inbox for email verification!');
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <KeyboardAvoidingView behavior="padding">
              <ScrollView contentContainerStyle={styles.authContainer}>
                <HeaderText style={{ marginBottom: Spacing.SPACING_3 }}>
                  Sign Up
                </HeaderText>
                <View>
                  <BoldStandardText>Email</BoldStandardText>
                  <PlazaTextInput
                    onChangeText={handleChange('email')}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View style={{ marginTop: Spacing.SPACING_3 }}>
                  <BoldStandardText>Password</BoldStandardText>
                  <PlazaTextInput
                    onChangeText={handleChange('password')}
                    placeholder="Password"
                    secureTextEntry={true}
                    multiline={false}
                  />
                </View>
                <View style={{ marginTop: Spacing.SPACING_3 }}>
                  <BoldStandardText>Username</BoldStandardText>
                  <PlazaTextInput
                    onChangeText={handleChange('username')}
                    placeholder="Username"
                    multiline={false}
                    autoCapitalize="none"
                  />
                </View>
                <View style={{ marginTop: Spacing.SPACING_3 }}>
                  <BoldStandardText>First Name</BoldStandardText>
                  <PlazaTextInput
                    onChangeText={handleChange('firstname')}
                    placeholder="First name"
                    multiline={false}
                  />
                </View>
                <View style={{ marginVertical: Spacing.SPACING_3 }}>
                  <BoldStandardText>Last Name</BoldStandardText>
                  <PlazaTextInput
                    onChangeText={handleChange('lastname')}
                    placeholder="Last name"
                    multiline={false}
                  />
                </View>

                <Footer
                  leftTitle="Go back"
                  rightTitle="Sign up"
                  leftOnPress={() => router.back()}
                  rightOnPress={handleSubmit}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Color.BORDER_SECONDARY,
    borderRadius: Radius.LG,
    width: '80%',
    padding: Spacing.SPACING_3,
  },
  authContainer: {},
});
