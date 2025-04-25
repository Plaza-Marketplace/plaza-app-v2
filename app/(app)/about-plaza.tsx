import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '@/constants/Spacing';
import HeadingText from '@/components/Texts/HeadingText';
import BackButton from '@/components/Buttons/BackButton';
import BodyText from '@/components/Texts/BodyText';
import { HeartActive, PlazaLogo } from '@/components/Icons';
import Color from '@/constants/Color';
import { ScrollView } from 'react-native-gesture-handler';

const AboutPlaza = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <BackButton />
          <HeadingText variant="h5-bold">About Plaza</HeadingText>
        </View>

        <BodyText variant="lg" color="neutral-default" style={styles.textStyle}>
          Thank you so much for trying out Plaza! We're a team of college
          students from Northwestern University working to make this the best
          platform possible for the craft community.
        </BodyText>

        <BodyText variant="lg" color="neutral-default" style={styles.textStyle}>
          Got a bug to report, a feature idea, or an event you’d like to host in
          the app? We’d love to hear from you! Send us a message at
          hello@plaza-app.com.
        </BodyText>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Spacing.SPACING_5,
          }}
        >
          <PlazaLogo width={100} height={100} color={Color.PRIMARY_DEFAULT} />
          <HeartActive
            width={60}
            height={60}
            color={Color.PRIMARY_DEFAULT}
            style={{ marginBottom: Spacing.SPACING_2 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutPlaza;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.SPACING_3,
  },
  textStyle: {
    marginTop: Spacing.SPACING_3,
    paddingHorizontal: Spacing.SPACING_3,
    lineHeight: 32,
    textAlign: 'center',
  },
});
