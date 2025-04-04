import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { accountDetailStyles as styles } from './styles';
import Spacing from '@/constants/Spacing';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';
import RadioButtonGroup from '@/components/Buttons/RadioButtonGroup';
import Color from '@/constants/Color';
import { Basket, Sales } from '@/components/Icons';

interface UserTypeProps {
  setSelected: (id: number) => void;
}

const UserType: FC<UserTypeProps> = ({ setSelected }) => {
  const choices = [
    {
      id: 0,
      title: "I don't want to sell yet",
      description: 'You can become a seller at any point later on in the app.',
      icon: 'basket',
    },
    {
      id: 1,
      title: 'I want to start selling now',
      description:
        'Start selling products you want to build a community around.',
      icon: 'tabler-icon',
    },
  ];
  return (
    <View style={styles.slide}>
      <HeadingText variant="h3-bold">
        Would you like to start selling?
      </HeadingText>

      <BodyText variant="md" style={{ marginTop: Spacing.SPACING_2 }}>
        You can always start off as a user and choose to sell your products
        later in the app.
      </BodyText>

      <View style={{ marginTop: Spacing.SPACING_3 }}>
        <RadioButtonGroup
          items={choices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item, isSelected) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: Spacing.SPACING_2,
              }}
            >
              <View style={{ flex: 1 }}>
                <HeadingText
                  variant="h6-bold"
                  color={
                    isSelected ? Color.PRIMARY_DEFAULT : Color.NEUTRALS_DEFAULT
                  }
                >
                  {item.title}
                </HeadingText>
                <BodyText
                  variant="md"
                  style={{ marginTop: Spacing.SPACING_1 }}
                  color={
                    isSelected ? Color.PRIMARY_DEFAULT : Color.NEUTRALS_DEFAULT
                  }
                >
                  {item.description}
                </BodyText>
              </View>

              {item.icon === 'basket' && (
                <Basket
                  width={30}
                  height={30}
                  color={
                    isSelected ? Color.PRIMARY_DEFAULT : Color.NEUTRALS_DEFAULT
                  }
                  style={{
                    marginLeft: Spacing.SPACING_1,
                  }}
                />
              )}

              {item.icon === 'tabler-icon' && (
                <Sales
                  width={30}
                  height={30}
                  color={
                    isSelected ? Color.PRIMARY_DEFAULT : Color.NEUTRALS_DEFAULT
                  }
                  style={{
                    marginLeft: Spacing.SPACING_1,
                  }}
                />
              )}
            </View>
          )}
          onSelect={(item) => setSelected(item.id)}
        />
      </View>
    </View>
  );
};

export default UserType;
