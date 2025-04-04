import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacing from '@/constants/Spacing';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import PlazaButton from '@/components/Buttons/PlazaButton';
import Color from '@/constants/Color';
import Names from '@/screens/Onboarding/Account-Details/names';
import UserType from '@/screens/Onboarding/Account-Details/user-type';
import StripeConnection from '@/screens/Onboarding/Account-Details/stripe-connection';
import Categories from '@/screens/Onboarding/Account-Details/categories';
import { router } from 'expo-router';
import { Formik } from 'formik';

const width = Dimensions.get('window').width;

const AccountDetails = () => {
  const insets = useSafeAreaInsets();

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

  const [selected, setSelected] = React.useState<number | null>(null);
  const [categories, setCategories] = React.useState<string[]>([]);

  const numSlides = 4;

  const onPressNext = () => {
    const currentIndex = ref.current?.getCurrentIndex();
    if (currentIndex == numSlides - 1) {
      // submit form
      // navigate to welcome screen
      console.log('yipee');
      router.push('/onboarding/finale');
    } else if (selected != null && selected == 0 && currentIndex == 1) {
      ref.current?.scrollTo({
        count: 2,
        animated: true,
      });
    } else {
      ref.current?.scrollTo({
        count: 1,
        animated: true,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        stripe_account_id: null,
      }}
      onSubmit={(values) => {
        console.log(values);

        // later use supabase.auth.updateUser()

        // using stripe account id, update the user row
      }}
    >
      {({ handleChange, handleSubmit, values }) => {
        const slides = [
          {
            key: 'names',
            content: (
              <Names
                onChangeFirstName={handleChange('firstName')}
                onChangeLastName={handleChange('lastName')}
                firstName={values.firstName}
                lastName={values.lastName}
              />
            ),
          },
          {
            key: 'user-type',
            content: <UserType setSelected={setSelected} />,
          },
          {
            key: 'stripe-connection',
            content: (
              <StripeConnection
                onChangeStripeAccountId={handleChange('stripe_account_id')}
              />
            ),
          },
          {
            key: 'categories',
            content: (
              <Categories
                categories={[]} // placeholder
                selectedCategories={categories}
                setSelectedCategories={setCategories}
              />
            ),
          },
        ];
        return (
          <View style={{ flex: 1, paddingTop: insets.top }}>
            <View style={{ flex: 1 }}>
              <Carousel
                ref={ref}
                width={width}
                data={slides}
                onProgressChange={progress}
                renderItem={({ index }) => slides[index].content}
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
                  onPress={onPressPagination}
                />

                <PlazaButton
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
        );
      }}
    </Formik>
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
});
