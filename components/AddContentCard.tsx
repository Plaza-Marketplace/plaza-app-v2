import { StyleSheet, View } from 'react-native';
import TitleText from './Texts/TitleText';
import { FC, PropsWithChildren } from 'react';
import PlazaButton from './Buttons/PlazaButton';
import StandardText from './Texts/StandardText';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import { router } from 'expo-router';

interface AddContentCardProps extends PropsWithChildren {
  title: string;
  description: string;
  buttonTitle: string;
  nextRoute:
    | '/list-item/create-listing'
    | '/video-upload/landing-page'
    | '/shopify-migration/landing-page';
}

const AddContentCard: FC<AddContentCardProps> = ({
  title,
  children,
  description,
  buttonTitle,
  nextRoute,
}) => {
  return (
    <View style={styles.container}>
      <TitleText>{title}</TitleText>
      {children}
      <StandardText>{description}</StandardText>
      <PlazaButton title={buttonTitle} onPress={() => router.push(nextRoute)} />
    </View>
  );
};

export default AddContentCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spacing.SPACING_LG,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.SPACING_4,
    borderWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
    paddingHorizontal: Spacing.SPACING_MD,
    paddingVertical: Spacing.SPACING_SM,
  },
});
