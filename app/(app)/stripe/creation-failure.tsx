import { Linking, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';
import PlazaButton from '@/components/Buttons/PlazaButton';
import Spacing from '@/constants/Spacing';
import { createAccountLink } from '@/services/stripe';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

const Refresh = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <SafeAreaView>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <HeadingText variant="h5-bold" style={styles.margins}>
            Please log in to continue!
          </HeadingText>
          <BodyText variant="md" style={styles.margins}>
            You need to be logged in to access this feature.
          </BodyText>
          <PlazaButton
            title="Log in"
            onPress={() => {
              router.push('/onboarding/login');
            }}
            style={styles.margins}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!user.stripeCustomerId === null) {
    return (
      <SafeAreaView>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <HeadingText variant="h5-bold" style={styles.margins}>
            Please create a Stripe account!
          </HeadingText>
          <BodyText variant="md" style={styles.margins}>
            You need to create a Stripe account to access this feature.
          </BodyText>
          <PlazaButton
            title="Create Stripe Account"
            onPress={() => {
              router.push('/(app)/(tabs)/(upload)/landing-page');
            }}
            style={styles.margins}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <HeadingText variant="h5-bold" style={styles.margins}>
          Something's gone wrong!
        </HeadingText>
        <BodyText variant="md" style={styles.margins}>
          Please try again by pressing the button below.
        </BodyText>

        <PlazaButton
          title="Try again"
          onPress={async () => {
            // Logic to refresh the page or component
            const accountLink = await createAccountLink(
              user.stripeCustomerId,
              'https://www.plaza-app.com/stripe/creation-success',
              'https://www.plaza-app.com/stripe/creation-failure'
            );
            Linking.openURL(accountLink.url);
          }}
          style={styles.margins}
        />
      </View>
    </SafeAreaView>
  );
};

export default Refresh;

const styles = StyleSheet.create({
  margins: {
    marginTop: Spacing.SPACING_2,
  },
});
