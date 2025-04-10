import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Carousel, {
  Pagination,
  ICarouselInstance,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeadingText from '@/components/Texts/HeadingText';
import PlazaText from '@/components/Texts/PlazaText';
import PlazaButton from '@/components/Buttons/PlazaButton';
import Spacing from '@/constants/Spacing';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import BodyText from '@/components/Texts/BodyText';
import Color from '@/constants/Color';
import { router } from 'expo-router';

const width = Dimensions.get('window').width;

const Welcome = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const slideshow = [
    {
      description: 'Enjoy authentic crafts content',
      image: require('@/assets/images/welcome-slide1.png'),
    },
    {
      description: 'Find the right crafts community',
      image: require('@/assets/images/welcome-slide2.png'),
    },
    {
      description: 'Sell and advertise your products all in one place',
      image: require('@/assets/images/welcome-slide3.png'),
    },
  ];

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <View style={{ flex: 1 }}>
        <Carousel
          ref={ref}
          width={width}
          data={slideshow}
          onProgressChange={progress}
          autoPlay={true}
          autoPlayInterval={3000}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image source={slideshow[index].image} />
              </View>

              <View style={{ minHeight: 100 }}>
                <HeadingText
                  variant={'h3-bold'}
                  style={{
                    marginBottom: Spacing.SPACING_2,
                    textAlign: 'center',
                  }}
                >
                  {slideshow[index].description}
                </HeadingText>
              </View>
            </View>
          )}
        />

        <Pagination.Basic
          progress={progress}
          data={slideshow}
          dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
        />
      </View>

      <View style={styles.bottomContainer}>
        <PlazaButton
          title="Join For Free"
          onPress={() => {
            router.push('/onboarding/create-account');
          }}
          style={{ marginBottom: Spacing.SPACING_2 }}
        />

        <PlazaButton
          title="Log In"
          onPress={() => {
            router.push('/onboarding/login');
          }}
          style={styles.loginButtonContainer}
          fontColor={Color.BLACK}
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    padding: Spacing.SPACING_3,
    marginBottom: Spacing.SPACING_3,
  },
  loginButtonContainer: {
    backgroundColor: 'transparent',
  },
});
