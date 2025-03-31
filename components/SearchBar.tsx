import { FC, useRef, useState } from 'react';
import PressableOpacity from './Buttons/PressableOpacity';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { Search } from './Icons';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { View } from 'react-native';
import BodyText from './Texts/BodyText';

interface SearchBarProps extends TextInputProps {
  showCancelButton?: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
  showCancelButton,
  onFocus,
  onBlur,
  onChangeText,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    inputRef.current?.blur();
    inputRef.current?.clear();
    onChangeText?.('');
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View style={styles.container}>
      <PressableOpacity
        style={[
          styles.searchBarContainer,
          {
            borderColor: isFocused ? Color.PRIMARY_DEFAULT : Color.NEUTRALS_150,
          },
        ]}
        onPress={handlePress}
      >
        <Search color={isFocused ? Color.BLACK : Color.NEUTRALS_DEFAULT} />
        <TextInput
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          {...rest}
          style={{ flexShrink: 1 }}
        />
      </PressableOpacity>
      {showCancelButton && isFocused && (
        <PressableOpacity onPress={handleCancel}>
          <BodyText variant="md-medium" color={Color.PRIMARY_DEFAULT}>
            Cancel
          </BodyText>
        </PressableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchBarContainer: {
    flex: 1,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: Radius.ROUNDED,
    backgroundColor: Color.NEUTRALS_100,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.NEUTRALS_150,
  },
});
