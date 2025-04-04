import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { accountDetailStyles as styles } from './styles';
import Spacing from '@/constants/Spacing';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';
import PlazaTextInput from '@/components/PlazaTextInput';

interface NamesProps {
  firstName: string;
  onChangeFirstName: (value: string) => void;
  lastName: string;
  onChangeLastName: (value: string) => void;
}

const Names: FC<NamesProps> = ({
  firstName,
  onChangeFirstName,
  lastName,
  onChangeLastName,
}) => {
  return (
    <View style={styles.slide}>
      <HeadingText variant="h3-bold">Account Details</HeadingText>

      <BodyText variant="md" style={{ marginTop: Spacing.SPACING_2 }}>
        You can change your name at any time, but your username is permanent and
        unique to your account.
      </BodyText>

      <View style={{ marginTop: Spacing.SPACING_3 }}>
        <PlazaTextInput
          label="First Name"
          placeholder="Your first name"
          style={styles.inputStyle}
        />
      </View>

      <View style={{ marginTop: Spacing.SPACING_3 }}>
        <PlazaTextInput
          label="Last Name"
          placeholder="Your last name"
          style={styles.inputStyle}
        />
      </View>

      <View style={{ marginTop: Spacing.SPACING_3 }}>
        <PlazaTextInput
          label="Username"
          placeholder="Your username"
          style={styles.inputStyle}
        />
      </View>
    </View>
  );
};

export default Names;
