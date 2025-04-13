import { SectionList, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import BodyText from '@/components/Texts/BodyText';
import Color from '@/constants/Color';
import { formatPrice } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import Spacing from '@/constants/Spacing';
import HeadingText from '@/components/Texts/HeadingText';
import { VariantsDisplay } from '../schema';
import { FlatList } from 'react-native-gesture-handler';

interface VariantListProps {
  variantValues: VariantsDisplay[];
  onPressItem: (itemIndex: number) => void;
}

const VariantList: FC<VariantListProps> = ({ variantValues, onPressItem }) => {
  return (
    <FlatList
      data={variantValues}
      style={{ flex: 1, width: '100%' }}
      contentContainerStyle={{
        paddingHorizontal: Spacing.SPACING_2,
        paddingBottom: Spacing.SPACING_5,
      }}
      keyExtractor={(item, index) => item.fields[0] + index}
      renderItem={({ item, index }) => (
        <PressableOpacity
          style={{
            padding: Spacing.SPACING_3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => {
            onPressItem(index);
          }}
        >
          <View>
            <BodyText variant="md">
              {item.fields.map((field) => field).join(' / ')}
            </BodyText>
            <BodyText variant="sm" style={{ color: Color.GREY_500 }}>
              {formatPrice(item.value.price)} | {item.value.quantity} available
            </BodyText>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={Color.NEUTRALS_DEFAULT}
          />
        </PressableOpacity>
      )}
    />
  );
};

export default VariantList;

const styles = StyleSheet.create({});
