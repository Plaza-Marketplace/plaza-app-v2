import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { accountDetailStyles as styles } from './styles';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';
import Spacing from '@/constants/Spacing';
import PlazaTextInput from '@/components/PlazaTextInput';
import { FlatList } from 'react-native-gesture-handler';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { Glass } from '@/components/Icons';

interface CategoriesProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const mockData = [
  'Category 1',
  'Category 2',
  'Category 3',
  'Category 4',
  'Category 5',
  'Category 6',
  'Category 7',
  'Category 8',
  'Category 9',
  'Category 10',
];

const Categories: FC<CategoriesProps> = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const handleSelectCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((p) => p !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  return (
    <View style={styles.slide}>
      <HeadingText variant="h3-bold">
        Choose topics you're interested in
      </HeadingText>

      <BodyText variant="md" style={{ marginTop: Spacing.SPACING_2 }}>
        This will help us recommend products that you might like.
      </BodyText>

      <View style={{ marginTop: Spacing.SPACING_3 }}>
        <PlazaTextInput
          placeholder="Search for categories"
          style={styles.inputStyle}
        />
      </View>

      <FlatList
        data={mockData}
        renderItem={({ item }) => {
          const selected = selectedCategories.includes(item);
          return (
            <PressableOpacity
              style={{
                marginTop: Spacing.SPACING_2,
                backgroundColor: selected
                  ? Color.PRIMARY_100
                  : Color.NEUTRALS_100,
                padding: Spacing.SPACING_3,
                borderRadius: Radius.MD,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() => handleSelectCategory(item)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Glass
                  color={selected ? Color.PRIMARY_DEFAULT : Color.NEUTRALS_750}
                  width={24}
                  height={24}
                />
                <BodyText
                  variant="lg-semibold"
                  color={selected ? Color.PRIMARY_DEFAULT : Color.NEUTRALS_750}
                  style={{ marginLeft: Spacing.SPACING_2 }}
                >
                  {item}
                </BodyText>
              </View>
            </PressableOpacity>
          );
        }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Categories;
