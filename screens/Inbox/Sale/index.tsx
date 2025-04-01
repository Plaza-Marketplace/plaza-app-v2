import { FC, useEffect, useState } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useGetSaleScreen, useUpdateTrackingNumber } from './hooks';
import HeadingText from '@/components/Texts/HeadingText';
import { Image } from 'expo-image';
import BodyText from '@/components/Texts/BodyText';
import { ScrollView, StyleSheet, View } from 'react-native';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { formatPrice } from '@/utils/currency';
import PlazaButton from '@/components/Buttons/PlazaButton';
import Collapsible from 'react-native-collapsible';
import { ChevronDown } from '@/components/Icons';
import { calculateDaysLeftUntil7Days } from '@/utils/datetime';
import PlazaTextInput from '@/components/PlazaTextInput';
import useDebounce from '@/hooks/useDebounce';

interface SaleProps {
  id: Id;
}

const Sale: FC<SaleProps> = ({ id }) => {
  const { data, error } = useGetSaleScreen(id);
  const { mutate: updateTrackingNumber } = useUpdateTrackingNumber(id);
  const [localTrackingNumber, setLocalTrackingNumber] = useState('');
  const { debouncedValue: debouncedTrackingNumber } =
    useDebounce(localTrackingNumber);
  const [collapsed, setCollapsed] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!debouncedTrackingNumber) return;

    updateTrackingNumber(debouncedTrackingNumber);
  }, [debouncedTrackingNumber]);

  if (error || !data) {
    return null;
  }

  const isOnStep1 = data.trackingNumber === null;

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingTop: insets.top }}>
      <View style={styles.content}>
        <HeadingText variant="h5-bold">Estimated Delivery</HeadingText>
        <View style={styles.userContainer}>
          <PressableOpacity
            onPress={() =>
              router.push({
                pathname: '/profile-modal',
                params: { id: data?.buyer.id },
              })
            }
          >
            <Image
              source={{ uri: data?.buyer.profileImageUrl }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Color.GREY_200,
              }}
            />
          </PressableOpacity>
          <BodyText variant="md-medium">
            Sold to {data?.buyer.username}
          </BodyText>
        </View>
        <View style={styles.product}>
          <Image
            style={styles.image}
            source={{ uri: data?.product.thumbnailUrl }}
          />
          <View>
            <HeadingText variant="h5-bold">{data?.product.name}</HeadingText>
            <BodyText variant="sm-bold">
              {formatPrice(data?.product.finalPrice)}
            </BodyText>
          </View>
        </View>

        <PlazaButton title="Cancel Order" />
        <HeadingText variant="h5-bold">Seller Checklist</HeadingText>
        <View style={styles.checklistContainer}>
          <View>
            <PressableOpacity
              style={styles.checklistTab}
              onPress={() => setCollapsed(!collapsed)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingBottom: 16,
                }}
              >
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor: isOnStep1
                        ? Color.WARNING_200
                        : Color.NEUTRALS_200,
                    },
                  ]}
                >
                  <BodyText
                    variant="lg-medium"
                    color={
                      isOnStep1 ? Color.WARNING_DEFAULT : Color.NEUTRALS_DEFAULT
                    }
                  >
                    1
                  </BodyText>
                </View>
                <View>
                  <BodyText variant="lg">Input shipping information</BodyText>
                  {isOnStep1 && (
                    <BodyText
                      variant="sm"
                      color={
                        isOnStep1
                          ? Color.WARNING_DEFAULT
                          : Color.NEUTRALS_DEFAULT
                      }
                    >
                      {calculateDaysLeftUntil7Days(data.createdAt)} days left
                    </BodyText>
                  )}
                </View>
              </View>
              <ChevronDown color={Color.BLACK} />
            </PressableOpacity>
            <Collapsible collapsed={collapsed}>
              <View>
                <View style={styles.section}>
                  <BodyText variant="lg-medium">Delivery</BodyText>
                  <View style={{ alignItems: 'flex-end' }}>
                    <BodyText
                      variant="lg-medium"
                      color={Color.NEUTRALS_DEFAULT}
                    >
                      {data.address.addressLine1}
                    </BodyText>
                    {data.address.addressLine2 && (
                      <BodyText
                        variant="lg-medium"
                        color={Color.NEUTRALS_DEFAULT}
                      >
                        {data.address.addressLine2}
                      </BodyText>
                    )}
                    <BodyText
                      variant="lg-medium"
                      color={Color.NEUTRALS_DEFAULT}
                    >
                      {data.address.country}
                    </BodyText>
                    <BodyText
                      variant="lg-medium"
                      color={Color.NEUTRALS_DEFAULT}
                    >
                      {data.address.city}, {data.address.state}
                    </BodyText>
                    <BodyText
                      variant="lg-medium"
                      color={Color.NEUTRALS_DEFAULT}
                    >
                      {data.address.zipCode}
                    </BodyText>
                  </View>
                </View>
                <PlazaTextInput
                  placeholder="Insert tracking number"
                  onChangeText={setLocalTrackingNumber}
                  defaultValue={data.trackingNumber ?? ''}
                />
              </View>
            </Collapsible>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              paddingTop: 16,
            }}
          >
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: !isOnStep1
                    ? Color.WARNING_200
                    : Color.NEUTRALS_200,
                },
              ]}
            >
              <BodyText
                variant="lg-medium"
                color={
                  !isOnStep1 ? Color.WARNING_DEFAULT : Color.NEUTRALS_DEFAULT
                }
              >
                2
              </BodyText>
            </View>
            <BodyText variant="lg">Notify buyer of shipping</BodyText>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionContent}>
          <BodyText variant="lg-medium">Summary</BodyText>
          <BodyText variant="lg" color={Color.NEUTRALS_DEFAULT}>
            Subtotal
          </BodyText>
          <BodyText variant="lg" color={Color.NEUTRALS_DEFAULT}>
            Delivery
          </BodyText>
          <BodyText variant="lg" color={Color.NEUTRALS_DEFAULT}>
            Plaza Transaction Fee
          </BodyText>
          <BodyText variant="lg-bold">Payout</BodyText>
        </View>
        <View style={[styles.sectionContent, { alignItems: 'flex-end' }]}>
          <BodyText variant="lg" color={Color.NEUTRALS_DEFAULT}>
            {' '}
          </BodyText>
          <BodyText variant="lg" color={Color.NEUTRALS_DEFAULT}>
            {formatPrice(data.product.finalPrice)}
          </BodyText>
          <BodyText variant="lg" color={Color.NEUTRALS_DEFAULT}>
            Free
          </BodyText>
          <BodyText variant="lg" color={Color.NEUTRALS_DEFAULT}>
            $1.29
          </BodyText>
          <BodyText variant="lg-bold">
            {formatPrice(data.product.finalPrice - 1.29)}
          </BodyText>
        </View>
      </View>
    </ScrollView>
  );
};

export default Sale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  image: {
    width: 84,
    height: 84,
    backgroundColor: Color.GREY_200,
    borderRadius: Radius.ROUNDED,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 16,
  },
  sectionContent: {
    gap: 12,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checklistContainer: {
    borderRadius: 16,
    backgroundColor: Color.WHITE,
    padding: 16,
  },
  checklistTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
