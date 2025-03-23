import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PlazaHeader from '@/components/PlazaHeader';
import Color from '@/constants/Color';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import StandardText from '@/components/Texts/StandardText';
import Spacing from '@/constants/Spacing';
import PlazaTextInput from '@/components/PlazaTextInput';

const OrderStatus = () => {
  return (
    <View style={{ flex: 1 }}>
      <PlazaHeader name="Order Status" accountForSafeArea />
      <View style={styles.container}>
        <View style={styles.content}>
          <BoldStandardText style={styles.label}>
            Shipping Address:
          </BoldStandardText>
          <StandardText>John Doe</StandardText>
          <StandardText>1234 Main St</StandardText>
          <StandardText>Los Angeles, CA 90001</StandardText>
          <StandardText>United States</StandardText>
        </View>

        <View style={styles.content}>
          <BoldStandardText style={styles.label}>
            Shipping Provider:
          </BoldStandardText>
          <StandardText>USPS</StandardText>
        </View>

        <View style={styles.content}>
          <BoldStandardText style={styles.label}>
            Tracking Number:
          </BoldStandardText>
          <PlazaTextInput
            placeholder="Input the tracking number..."
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.GREY_100,
  },
  content: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
  label: {
    marginBottom: Spacing.SPACING_3,
  },
  input: {
    minHeight: Spacing.SPACING_9,
  },
});
