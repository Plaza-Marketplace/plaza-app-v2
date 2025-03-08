import { BottomSheetModal } from '@gorhom/bottom-sheet';
import FeedBottomSheet from '@/components/Feed/FeedBottomSheet';
import { FC } from 'react';
import HeaderText from '@/components/Texts/HeaderText';
import { StyleSheet, View } from 'react-native';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import SubheaderText from '@/components/Texts/SubheaderText';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import StandardText from '@/components/Texts/StandardText';
import { OrderHistoryItem } from '@/models/orderHistoryItem';
import { formatPrice } from '@/utils/currency';

interface PaymentModalProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  item: OrderHistoryItem;
}

const PaymentModal: FC<PaymentModalProps> = ({ bottomSheetRef, item }) => {
  return (
    <FeedBottomSheet bottomSheetRef={bottomSheetRef}>
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderText>Payment Details</HeaderText>
        </View>

        <View style={styles.values}>
          <BoldStandardText>Item Value</BoldStandardText>
          <StandardText style={styles.textMargin}>
            {formatPrice(item.finalPrice)} USD
          </StandardText>
        </View>

        <View style={styles.values}>
          <BoldStandardText>Plaza Transaction Fee</BoldStandardText>
          <StandardText style={styles.textMargin}>$5.00 USD</StandardText>
        </View>

        <View style={styles.values}>
          <BoldStandardText>Total Payout</BoldStandardText>
          <BoldStandardText style={styles.textMargin}>
            {formatPrice(item.finalPrice - 5)} USD
          </BoldStandardText>
        </View>
      </View>
    </FeedBottomSheet>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.SPACING_2,
    paddingBottom: Spacing.SPACING_2,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
  values: {
    width: '92%',
    marginTop: Spacing.SPACING_3,
    paddingVertical: Spacing.SPACING_2,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
  textMargin: {
    marginTop: Spacing.SPACING_1,
  },
});
