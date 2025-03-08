import { StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import PlazaHeader from '@/components/PlazaHeader';
import ProductIcon from '@/components/Product/ProductIcon';
import Spacing from '@/constants/Spacing';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import ArrowButton from '@/components/Buttons/ArrowButton';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getOrderHistoryFromCache } from '@/hooks/routes/orderhistory';
import { StatusToString } from '@/utils/conversions';
import Color from '@/constants/Color';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductModal from '@/components/Feed/ProductModal';
import PaymentModal from '../components/PaymentModal';

interface OrderDetailsContent {
  headerTitle: string;
  paymentTitle: string;
  paymentLabel: string;
  profileTitle: string;
  profileLabel: string;
  profileOnPress: () => void;
}

const OrderDetails = () => {
  const productSheetRef = useRef<BottomSheetModal>(null);
  const paymentSheetRef = useRef<BottomSheetModal>(null);
  const params = useLocalSearchParams<{
    orderId: string;
    side: 'purchases' | 'sales';
  }>();
  console.log(params);
  if (!params.orderId) {
    return <BoldStandardText>Invalid order ID</BoldStandardText>;
  }
  if (!params.side) {
    return <BoldStandardText>Invalid order side</BoldStandardText>;
  }
  const order = getOrderHistoryFromCache(parseInt(params.orderId), params.side);
  if (!order) {
    return <BoldStandardText>Order not found</BoldStandardText>;
  }

  let content: OrderDetailsContent;
  if (params.side === 'purchases') {
    content = {
      headerTitle: 'Purchase Details',
      paymentTitle: `You paid $${order.finalPrice}`,
      paymentLabel: 'View payment details',
      profileTitle: `Sold by ${order.seller.username}`,
      profileLabel: 'View seller profile',
      profileOnPress: () =>
        router.push({
          pathname: '/profile-modal',
          params: { id: order.seller.id },
        }),
    };
  } else {
    content = {
      headerTitle: 'Sale Details',
      paymentTitle: `You'll receive $${order.finalPrice}`,
      paymentLabel: 'View payment details',
      profileTitle: `Bought by ${order.buyer.username}`,
      profileLabel: 'View buyer profile',
      profileOnPress: () =>
        router.push({
          pathname: '/profile-modal',
          params: { id: order.buyer.id },
        }),
    };
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <PlazaHeader name={content.headerTitle} />
        <View style={styles.container}>
          <View style={styles.productMargin}>
            <ProductIcon size={250} imageUrl={order.product.imageUrls[0]} />
          </View>
          <View style={styles.choiceContainer}>
            <BoldStandardText>{StatusToString(order.status)}</BoldStandardText>
            <ArrowButton
              icon={
                <Ionicons name="pricetags-outline" size={Spacing.SPACING_LG} />
              }
              name={order.product.name}
              onPress={() => productSheetRef.current?.present()}
              style={[styles.choiceButton, styles.border]}
            />
            <ArrowButton
              icon={<Ionicons name="cube-outline" size={Spacing.SPACING_LG} />}
              name={'Delivery Status'}
              label={'View tracking information'}
              onPress={() => router.push({ pathname: '/order-status' })}
              style={[styles.choiceButton, styles.border]}
            />
            <ArrowButton
              icon={<Ionicons name="cash-outline" size={Spacing.SPACING_LG} />}
              name={content.paymentTitle}
              label={content.paymentLabel}
              onPress={() => paymentSheetRef.current?.present()}
              style={[styles.choiceButton, styles.border]}
            />
            <ArrowButton
              icon={
                <Ionicons name="pricetags-outline" size={Spacing.SPACING_LG} />
              }
              name={content.profileTitle}
              label={content.profileLabel}
              onPress={content.profileOnPress}
              style={[styles.choiceButton, styles.border]}
            />
          </View>
        </View>
      </View>
      <ProductModal
        bottomSheetRef={productSheetRef}
        sellerId={order.seller.id}
        product={order.product}
      />
      <PaymentModal bottomSheetRef={paymentSheetRef} item={order} />
    </>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Color.GREY_100,
  },
  productMargin: {
    marginTop: Spacing.SPACING_3,
  },
  choiceContainer: {
    marginTop: Spacing.SPACING_4,
    width: '90%',
  },
  choiceButton: {
    width: '100%',
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Color.GREY_200,
  },
});
