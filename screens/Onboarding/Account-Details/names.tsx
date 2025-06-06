import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { accountDetailStyles as styles } from './styles';
import Spacing from '@/constants/Spacing';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';
import PlazaTextInput from '@/components/PlazaTextInput';
import { FormikProps } from 'formik';
import PlazaButton from '@/components/Buttons/PlazaButton';

interface NamesProps {
  formik: FormikProps<{
    username: string;
    displayName: string;
  }>;
}

const Names: FC<NamesProps> = ({ formik }) => {
  return (
    <View style={styles.slide}>
      <HeadingText variant="h3-bold">Account Details</HeadingText>

      <BodyText variant="md" style={{ marginTop: Spacing.SPACING_2 }}>
        You can change your display name at any time, but your username is
        permanent and unique to your account.
      </BodyText>

      <View style={{ marginTop: Spacing.SPACING_3 }}>
        <PlazaTextInput
          label="Display Name"
          placeholder="Your display name"
          style={styles.inputStyle}
          autoCapitalize="none"
          value={formik.values.displayName}
          onChangeText={formik.handleChange('displayName')}
          onBlur={formik.handleBlur('displayName')}
        />
        {formik.errors.displayName && (
          <BodyText
            variant="sm"
            color="red"
            style={{ marginTop: Spacing.SPACING_1 }}
          >
            {formik.errors.displayName}
          </BodyText>
        )}
      </View>

      <View style={{ marginTop: Spacing.SPACING_3 }}>
        <PlazaTextInput
          label="Username"
          placeholder="Your username"
          style={styles.inputStyle}
          autoCapitalize="none"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
        />
        {formik.errors.username && (
          <BodyText
            variant="sm"
            color="red"
            style={{ marginTop: Spacing.SPACING_1 }}
          >
            {formik.errors.username}
          </BodyText>
        )}
      </View>
    </View>
  );
};

export default Names;
