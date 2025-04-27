import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import PressableOpacity from './PressableOpacity';
import Spacing from '@/constants/Spacing';
import { Ionicons } from '@expo/vector-icons';
import BoldStandardText from '../Texts/BoldStandardText';
import StandardText from '../Texts/StandardText';

interface ArrowButtonProps {
  icon: React.ReactNode;
  name: string;
  label?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const ArrowButton: FC<ArrowButtonProps> = ({
  icon,
  name,
  label,
  onPress,
  style,
}) => {
  return (
    <PressableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.labelContainer}>
        {icon}
        <View style={{ marginLeft: Spacing.SPACING_3 }}>
          <BoldStandardText>{name}</BoldStandardText>
          {label && (
            <StandardText style={{ marginTop: Spacing.SPACING_1 }}>
              {label}
            </StandardText>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward-outline" size={Spacing.SPACING_MD} />
    </PressableOpacity>
  );
};

export default ArrowButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.SPACING_3,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
