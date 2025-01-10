import { FC } from 'react';
import { View } from 'react-native';
import HeaderText from './Texts/HeaderText';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <View>
      <HeaderText>{title}</HeaderText>
    </View>
  );
};

export default Header;
