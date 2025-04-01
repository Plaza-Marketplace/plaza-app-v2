import { FC } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetOrderScreen } from './hooks';
import HeadingText from '@/components/Texts/HeadingText';
import { Image } from 'expo-image';
import BodyText from '@/components/Texts/BodyText';
import { StyleSheet, View } from 'react-native';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { formatPrice } from '@/utils/currency';
import PlazaButton from '@/components/Buttons/PlazaButton';

interface OrderProps {
  id: Id;
}

const Order: FC<OrderProps> = ({ id }) => {
  const { data, error } = useGetOrderScreen(id);

  if (error || !data) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HeadingText variant="h5-bold">Estimated Delivery</HeadingText>
        <View style={styles.userContainer}>
          <PressableOpacity
            onPress={() =>
              router.push({
                pathname: '/profile-modal',
                params: { id: data?.seller.id },
              })
            }
          >
            <Image
              source={{ uri: data?.seller.profileImageUrl }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Color.GREY_200,
              }}
            />
          </PressableOpacity>
          <BodyText variant="md-medium">
            Bought from {data?.seller.username}
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
      </View>
      <View style={styles.section}>
        <BodyText variant="lg-medium">Delivery</BodyText>
        <View style={{ alignItems: 'flex-end' }}>
          <BodyText variant="lg-medium" color={Color.NEUTRALS_DEFAULT}>
            {data.address.addressLine1}
          </BodyText>
          {data.address.addressLine2 && (
            <BodyText variant="lg-medium" color={Color.NEUTRALS_DEFAULT}>
              {data.address.addressLine2}
            </BodyText>
          )}
          <BodyText variant="lg-medium" color={Color.NEUTRALS_DEFAULT}>
            {data.address.country}
          </BodyText>
          <BodyText variant="lg-medium" color={Color.NEUTRALS_DEFAULT}>
            {data.address.city}, {data.address.state}
          </BodyText>
          <BodyText variant="lg-medium" color={Color.NEUTRALS_DEFAULT}>
            {data.address.zipCode}
          </BodyText>
        </View>
      </View>
      <View style={styles.section}>
        <BodyText variant="lg-medium">Payment</BodyText>
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
          <BodyText variant="lg-bold">Order Total</BodyText>
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
          <BodyText variant="lg-bold">
            {formatPrice(data.product.finalPrice)}
          </BodyText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    borderBottomWidth: 1,
    borderColor: Color.NEUTRALS_DEFAULT,
    paddingVertical: 16,
  },
  sectionContent: {
    gap: 12,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
