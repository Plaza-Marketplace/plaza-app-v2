import { FC, useRef } from 'react';
import PressableOpacity from './Buttons/PressableOpacity';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Search } from './Icons';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';

interface SearchBarProps extends TextInputProps {}

const SearchBar: FC<SearchBarProps> = ({ ...rest }) => {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <PressableOpacity style={styles.container} onPress={handlePress}>
      <Search color={Color.NEUTRALS_DEFAULT} />
      <TextInput ref={inputRef} {...rest} style={{ flexShrink: 1 }} />
    </PressableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
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
