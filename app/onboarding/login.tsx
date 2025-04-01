import { StyleSheet, Text, View } from 'react-native';
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

const Login = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
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

        <View style={{ marginTop: Spacing.SPACING_3 }}>
          <PlazaTextInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            style={styles.inputStyle}
          />
        </View>

        <View style={{ marginTop: Spacing.SPACING_3 }}>
          <PlazaTextInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            style={styles.inputStyle}
          />
        </View>

        <PlazaButton title="Log In" style={styles.buttonStyle} />

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

        <PlazaButton
          title="Continue with Google"
          style={[
            styles.buttonStyle,
            { backgroundColor: Color.WHITE, borderWidth: 1 },
          ]}
          fontColor={Color.BLACK}
          icon={<Ionicons name="logo-google" size={20} color={Color.BLACK} />}
        />

        <PlazaButton
          title="Continue with Apple"
          style={[
            styles.buttonStyle,
            { backgroundColor: Color.WHITE, borderWidth: 1 },
          ]}
          fontColor={Color.BLACK}
          icon={<Ionicons name="logo-apple" size={20} color={Color.BLACK} />}
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
