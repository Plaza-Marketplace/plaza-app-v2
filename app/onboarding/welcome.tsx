import { Dimensions, StyleSheet, View, Alert } from 'react-native';
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import Carousel, {
  Pagination,
  ICarouselInstance,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeadingText from '@/components/Texts/HeadingText';
import PlazaButton from '@/components/Buttons/PlazaButton';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import { router } from 'expo-router';
import { supabase } from '@/utils/supabase';

const width = Dimensions.get('window').width;

const Welcome = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const screenwidth = Dimensions.get('window').width;

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
                <Image
                  source={slideshow[index].image}
                  contentFit="contain"
                  style={{
                    width: screenwidth,
                    flex: 1,
                  }}
                />
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
          activeDotStyle={{
            backgroundColor: Color.PRIMARY_DEFAULT,
            borderRadius: 50,
          }}
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

        <PlazaButton
          title="Continue as Guest"
          onPress={() => {
            Alert.alert(
              'Continue as Guest',
              'You will not be able to save any data or access any communities in Plaza. Are you sure you want to continue as a guest?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Continue as Guest',
                  onPress: async () => {
                    const { data, error } =
                      await supabase.auth.signInAnonymously({
                        options: {
                          data: {
                            guest: true,
                            completed_onboarding: true,
                          },
                        },
                      });
                    router.push('/(app)/(tabs)/(marketplace)/(top-tabs)/feed');
                  },
                },
              ]
            );
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
