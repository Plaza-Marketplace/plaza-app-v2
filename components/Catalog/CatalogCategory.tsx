import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import StandardText from '../Texts/StandardText';
import Radius from '@/constants/Radius';
import { Ionicons } from '@expo/vector-icons';

interface CatalogCategoryProps {
  name: string;
  icon: any;
}

const CatalogCategory: FC<CatalogCategoryProps> = ({ name, icon }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="star-outline" />
      <StandardText style={{ marginLeft: Spacing.SPACING_1 }}>
        {name}
      </StandardText>
    </View>
  );
};

export default CatalogCategory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.NEUTRALS_150,
    padding: 12,
    borderRadius: Radius.ROUNDED,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
