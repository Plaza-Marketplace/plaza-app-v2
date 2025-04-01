import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeadingText from '@/components/Texts/HeadingText';
import Spacing from '@/constants/Spacing';
import BodyText from '@/components/Texts/BodyText';
import PlazaTextInput from '@/components/PlazaTextInput';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

const width = Dimensions.get('window').width;

const AccountDetails = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  const slides = [
    {
      content: (
        <View style={styles.slide}>
          <HeadingText variant="h3-bold">Account Details</HeadingText>

          <BodyText variant="md" style={{ marginTop: Spacing.SPACING_2 }}>
            You can change your name at any time, but your username is permanent
            and unique to your account.
          </BodyText>

          <View style={{ marginTop: Spacing.SPACING_3 }}>
            <PlazaTextInput
              label="First Name"
              placeholder="Your first name"
              style={styles.inputStyle}
            />
          </View>

          <View style={{ marginTop: Spacing.SPACING_3 }}>
            <PlazaTextInput
              label="Last Name"
              placeholder="Your last name"
              style={styles.inputStyle}
            />
          </View>

          <View style={{ marginTop: Spacing.SPACING_3 }}>
            <PlazaTextInput
              label="Username"
              placeholder="Your username"
              style={styles.inputStyle}
            />
          </View>
        </View>
      ),
    },
    {
      content: (
        <View style={styles.slide}>
          <HeadingText variant="h3-bold">Account Details</HeadingText>

          <BodyText variant="md" style={{ marginTop: Spacing.SPACING_2 }}>
            You can change your name at any time, but your username is permanent
            and unique to your account.
          </BodyText>

          <View style={{ marginTop: Spacing.SPACING_3 }}>
            <PlazaTextInput
              label="First Name"
              placeholder="Your first name"
              style={styles.inputStyle}
            />
          </View>

          <View style={{ marginTop: Spacing.SPACING_3 }}>
            <PlazaTextInput
              label="Last Name"
              placeholder="Your last name"
              style={styles.inputStyle}
            />
          </View>

          <View style={{ marginTop: Spacing.SPACING_3 }}>
            <PlazaTextInput
              label="Username"
              placeholder="Your username"
              style={styles.inputStyle}
            />
          </View>
        </View>
      ),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Carousel
          ref={ref}
          width={width}
          data={slides}
          onProgressChange={progress}
          renderItem={({ index }) => slides[index].content}
        />

        <Pagination.Basic
          progress={progress}
          data={slides}
          dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  inputStyle: {
    padding: Spacing.SPACING_2,
    fontSize: 16,
  },
  slide: {
    padding: Spacing.SPACING_4,
  },
});
