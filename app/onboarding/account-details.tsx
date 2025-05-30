import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  useAnimatedValue,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacing from '@/constants/Spacing';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import PlazaButton from '@/components/Buttons/PlazaButton';
import Color from '@/constants/Color';
import Names from '@/screens/Onboarding/Account-Details/names';
import UserType from '@/screens/Onboarding/Account-Details/user-type';
import Categories from '@/screens/Onboarding/Account-Details/categories';
import { router } from 'expo-router';
import { useFormik } from 'formik';
import { supabase } from '@/utils/supabase';
import { createStripeCustomer } from '@/services/stripe';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { useUpdateUser } from '@/hooks/queries/useUser';
import HeadingText from '@/components/Texts/HeadingText';
import { PlazaLogo } from '@/components/Icons';
import { useSharedValue } from 'react-native-reanimated';
import { accountSchema } from './accountDetailsHelpers';
import { stripe } from '@/supabase/functions/_utils/stripe';
import { Event, track } from '@/analytics/utils';

const width = Dimensions.get('window').width;

const AccountDetails = () => {
  // frontend hooks
  const insets = useSafeAreaInsets();

  const backgroundValue = useAnimatedValue(0);
  const logoValue = useAnimatedValue(0);
  const [displayFinale, setDisplayFinale] = React.useState(false);

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [done, setDone] = React.useState(false);

  // backend hooks
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);

  const { mutate: updateUser } = useUpdateUser();

  const [selectedType, setSelectedType] = React.useState<number | null>(null);
  // const [categories, setCategories] = React.useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      username: '',
      displayName: '',
    },
    validationSchema: accountSchema,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => console.log(values),
    validateOnBlur: true,
  });

  const playFinaleAnimation = () => {
    setDisplayFinale(true);
    const backgroundAnimation = Animated.timing(backgroundValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });

    const logoAnimation = Animated.timing(logoValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
    Animated.sequence([
      backgroundAnimation,
      Animated.delay(500),
      logoAnimation,
    ]).start();
  };

  const onPressNext = async () => {
    if (!user) {
      console.error('unclear as to how this happened, but session is null');
      return;
    }
    console.log(user);

    const currentIndex = ref.current?.getCurrentIndex();
    if (currentIndex === undefined) {
      return;
    } else if (currentIndex >= slides.length - 1) {
      // submit form
      // navigate to welcome screen

      // create stripe customer
      const { account } = await createStripeCustomer(user.id, user.email);

      if (!account) {
        Alert.alert('Something went wrong... try again');
        return;
      }

      // update user in supabase auth
      await supabase.auth.updateUser({
        data: {
          completed_onboarding: true,
          username: formik.values.username,
          display_name: formik.values.displayName,
        },
      });

      // update user in supabase db
      await updateUser({
        id: user.id,
        username: formik.values.username,
        displayName: formik.values.displayName,
        stripeCustomerId: account,
      });

      playFinaleAnimation();

      track(Event.FINISHED_ONBOARDING, {
        userType: selectedType === 0 ? 'Buyer' : 'Seller',
      });

      setTimeout(() => {
        if (selectedType === 0) {
          router.replace('/feed');
        } else if (selectedType === 1) {
          router.replace('/(app)/(tabs)/(upload)/landing-page');
        }
      }, 5000);
    } else {
      ref.current?.scrollTo({
        count: 1,
        animated: true,
      });
    }
    setDone(false);
  };

  // handle button pressability
  useEffect(() => {
    const currSlide = ref.current?.getCurrentIndex();
    if (currSlide === undefined) {
      return;
    }
    // first slide
    if (currSlide == 0) {
      if (formik.errors.username || formik.errors.displayName) {
        setDone(false);
        return;
      }
    }
    if (currSlide == 1) {
      if (selectedType === null) {
        setDone(false);
        return;
      }
    }

    setDone(true);
  }, [formik.errors, selectedType]);

  const slides = [
    <Names formik={formik} />,
    <UserType selected={selectedType} setSelected={setSelectedType} />,
    // <Categories
    //   categories={[]} // placeholder
    //   selectedCategories={categories}
    //   setSelectedCategories={setCategories}
    // />,
  ];

  return (
    <>
      <Animated.View
        style={[
          styles.finale,
          {
            opacity: backgroundValue,
            display: displayFinale ? 'flex' : 'none',
          },
        ]}
      >
        <Animated.View style={{ alignItems: 'center', opacity: logoValue }}>
          <PlazaLogo color={Color.WHITE} />
          <HeadingText
            variant="h3-bold"
            color={Color.WHITE}
            style={{ marginTop: Spacing.SPACING_5 }}
          >
            Welcome to Plaza
          </HeadingText>
        </Animated.View>
      </Animated.View>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: Color.WHITE,
        }}
      >
        <View style={{ flex: 1 }}>
          <Carousel
            ref={ref}
            width={width}
            data={slides}
            onProgressChange={progress}
            renderItem={({ item }) => item}
            loop={false}
            enabled={false}
          />

          <View
            style={[
              styles.footer,
              styles.shadow,
              { paddingBottom: insets.bottom + Spacing.SPACING_4 },
            ]}
          >
            <Pagination.Basic
              progress={progress}
              data={slides}
              dotStyle={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: 50,
              }}
              containerStyle={{ gap: 5, marginTop: 10 }}
            />

            <PlazaButton
              disabled={!done}
              title={'Next'}
              onPress={onPressNext}
              style={{
                marginTop: Spacing.SPACING_3,
                padding: Spacing.SPACING_3,
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Color.WHITE,
    paddingHorizontal: Spacing.SPACING_4,
    paddingTop: Spacing.SPACING_2,
  },
  shadow: {
    shadowColor: Color.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  finale: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Color.PRIMARY_DEFAULT,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
