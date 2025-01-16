import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Formik } from 'formik';
import PlazaTextInput from '@/components/PlazaTextInput';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import Spacing from '@/constants/Spacing';
import PlazaButton from '@/components/Buttons/PlazaButton';
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
          }}
          onSubmit={async (values) => {
            const { error } = await supabase.auth.signInWithPassword({
              email: values.email,
              password: values.password,
            });

            if (error) Alert.alert(error.message);
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <KeyboardAvoidingView behavior="padding">
              <ScrollView contentContainerStyle={styles.authContainer}>
                <HeaderText style={{ marginBottom: Spacing.SPACING_3 }}>
                  Log In
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
                <View style={{ marginVertical: Spacing.SPACING_3 }}>
                  <BoldStandardText>Password</BoldStandardText>
                  <PlazaTextInput
                    onChangeText={handleChange('password')}
                    placeholder="Password"
                    secureTextEntry={true}
                    multiline={false}
                  />
                </View>

                <Footer
                  leftTitle="Sign up"
                  rightTitle="Login"
                  leftOnPress={() => router.push('/signup')}
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
