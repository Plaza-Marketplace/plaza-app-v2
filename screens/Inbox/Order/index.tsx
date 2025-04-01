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

interface OrderProps {
  id: Id;
}

const Order: FC<OrderProps> = ({ id }) => {
  const { data, error } = useGetOrderScreen(id);

  if (error || !data) {
    return null;
  }

  return (
    <SafeAreaView>
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
            style={{ width: 40, height: 40, borderRadius: 20 }}
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
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
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
    gap: 4,
  },
});
