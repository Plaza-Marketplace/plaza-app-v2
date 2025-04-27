import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Color from '@/constants/Color';
import { Check } from '@/components/Icons';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';

const ThankYou = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: Color.WHITE,
        position: 'absolute',
      }}
    >
      <Check color={Color.GREEN_500} width={40} height={40} />
      <HeadingText variant="h5-bold">Thank you for your report.</HeadingText>
      <BodyText variant="md" color={Color.GREY_500}>
        Your report will be reviewed by our team.
      </BodyText>
    </View>
  );
};

export default ThankYou;

const styles = StyleSheet.create({});
