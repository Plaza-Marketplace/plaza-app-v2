import Color from '@/constants/Color';
import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

interface RadioGroupProps<T> {
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T, selected: boolean) => React.ReactNode;
  onSelect: (item: T) => void;
}

const RadioGroup = <T,>({
  items,
  keyExtractor,
  renderItem,
  onSelect,
}: RadioGroupProps<T>) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (item: T) => {
    const id = keyExtractor(item);
    setSelectedId(id);
    onSelect(item);
  };

  const renderListItem = ({ item }: { item: T }) => {
    const isSelected = keyExtractor(item) === selectedId;
    return (
      <TouchableOpacity
        style={[styles.radioContainer, isSelected && styles.selectedRadio]}
        onPress={() => handleSelect(item)}
      >
        <View
          style={[styles.radioButton, isSelected && styles.radioSelected]}
        />
        {renderItem(item, isSelected)}
      </TouchableOpacity>
    );
  };

  return (
    <FlashList
      data={items}
      scrollEnabled={false}
      keyExtractor={(item) => keyExtractor(item)}
      renderItem={renderListItem}
    />
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedRadio: {
    borderColor: Color.PRIMARY_DEFAULT,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
  },
  radioSelected: {
    borderColor: Color.PRIMARY_DEFAULT,
    borderWidth: 6,
  },
});

export default RadioGroup;
