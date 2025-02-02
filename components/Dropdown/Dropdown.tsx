import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useState } from 'react';
import PressableOpacity from '../Buttons/PressableOpacity';
import { Ionicons } from '@expo/vector-icons';
import Spacing from '@/constants/Spacing';
import DropdownButton from './DropdownButton';
import Radius from '@/constants/Radius';

interface DropdownProps {
  children?: React.ReactNode;
  headerOptions: {
    name: string;
    onPress: (index: { index: number | undefined }) => void;
  }[];
}

const Dropdown: FC<DropdownProps> = ({ children, headerOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <PressableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      >
        {children}
        {isOpen ? (
          <Ionicons name="chevron-up" size={24} style={styles.iconMargin} />
        ) : (
          <Ionicons name="chevron-down" size={24} style={styles.iconMargin} />
        )}
      </PressableOpacity>
      {isOpen && (
        <View style={styles.dropdownContainer}>
          {headerOptions.map((option, index) => (
            <>
              <DropdownButton
                key={index}
                name={option.name}
                onPress={() => option.onPress({ index })}
              />
              {index !== headerOptions.length - 1 && (
                <View
                  style={{
                    height: 2,
                    backgroundColor: 'lightgray',
                    marginVertical: Spacing.SPACING_1,
                  }}
                />
              )}
            </>
          ))}
        </View>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginLeft: Spacing.SPACING_2,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '90%',
    left: 0,
    padding: Spacing.SPACING_2,
    backgroundColor: 'white',
    borderRadius: Radius.MD,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
