import Radius from '@/constants/Radius';
import { OrderStatus } from '@/models/orderHistoryItem';
import { FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import BodyText from '../Texts/BodyText';
import Color from '@/constants/Color';
import { Image } from 'expo-image';
import HeadingText from '../Texts/HeadingText';
import { formatPrice } from '@/utils/currency';
import { formatDatetime } from '@/utils/datetime';
import ProductModal from '../Product/ProductModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PressableOpacity from '../Buttons/PressableOpacity';
import { router } from 'expo-router';

interface OrderCardProps {
  id: Id;

  product: {
    id: Id;

    name: string;

    finalPrice: number;

    thumbnailUrl: Url | null;
  };

  status: OrderStatus;

  createdAt: Timestamp;
}

const OrderCard: FC<OrderCardProps> = ({ id, product, status, createdAt }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  let statusText;
  switch (status) {
    case OrderStatus.PENDING:
      statusText = 'Pending';
      break;
    case OrderStatus.CONFIRMED:
      statusText = 'Confirmed';
      break;
    case OrderStatus.SHIPPED:
      statusText = 'Shipped';
      break;
    case OrderStatus.DELIVERED:
      statusText = 'Completed';
      break;
    case OrderStatus.CANCELED:
      statusText = 'Canceled';
      break;
    default:
      statusText = 'Unknown';
  }

  return (
    <PressableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: '/order',
          params: { id },
        })
      }
    >
      <BodyText
        variant="md-medium"
        color={
          status !== OrderStatus.DELIVERED
            ? Color.WARNING_DEFAULT
            : Color.SUCCESS_DEFAULT
        }
      >
        {statusText}
      </BodyText>
      <PressableOpacity
        style={styles.product}
        onPress={() => bottomSheetRef.current?.present()}
      >
        <Image style={styles.image} source={{ uri: product.thumbnailUrl }} />
        <View>
          <HeadingText variant="h6">{product.name}</HeadingText>
          <BodyText variant="lg-medium">
            {formatPrice(product.finalPrice)}
          </BodyText>
          <BodyText variant="sm">
            Ordered on {formatDatetime(createdAt)}
          </BodyText>
        </View>
      </PressableOpacity>
      <ProductModal bottomSheetRef={bottomSheetRef} id={product.id} />
    </PressableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: Radius.LG,
    gap: 8,
  },
  image: {
    width: 84,
    height: 84,
    backgroundColor: Color.GREY_200,
    borderRadius: Radius.ROUNDED,
  },
  product: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
});
