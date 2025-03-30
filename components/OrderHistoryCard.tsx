import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { OrderHistoryItem, OrderStatus } from '@/models/orderHistoryItem';
import ProductImage from './PostCards/ProductCards/ProductImage';
import Spacing from '@/constants/Spacing';
import ProductIcon from './Product/ProductIcon';
import BoldStandardText from './Texts/BoldStandardText';
import StandardText from './Texts/StandardText';
import { StatusToString } from '@/utils/conversions';

interface OrderHistoryCardProps {
  order: OrderHistoryItem;
  side: 'buy' | 'sell';
}

const OrderHistoryCard: FC<OrderHistoryCardProps> = ({ order, side }) => {
  return (
    <View style={styles.container}>
      <ProductIcon imageUrl={order.product.imageUrls[0]} />
      <View style={styles.textView}>
        <BoldStandardText>{order.product.name}</BoldStandardText>
        <StandardText>
          {side === 'buy' ? 'Bought from ' : 'Sold to '}
          <BoldStandardText>
            {side === 'buy' ? order.seller.username : order.buyer.username}
          </BoldStandardText>
        </StandardText>
        <StandardText>
          {StatusToString(order.status)}{' '}
          {order.status === OrderStatus.DELIVERED && order.deliveredDate && (
            <BoldStandardText>
              {new Date(order.deliveredDate).toDateString()}
            </BoldStandardText>
          )}
        </StandardText>
      </View>
    </View>
  );
};

export default OrderHistoryCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: Spacing.SPACING_3XL,
    height: Spacing.SPACING_3XL,
  },
  textView: {
    marginLeft: Spacing.SPACING_3,
    height: Spacing.SPACING_3XL,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
