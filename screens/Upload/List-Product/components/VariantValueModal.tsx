import { View, Text, SectionList } from 'react-native';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  VariantOption,
  VariantsDisplay,
  VariantTypeToValue,
  VariantValue,
} from '../schema';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import HeadingText from '@/components/Texts/HeadingText';
import Spacing from '@/constants/Spacing';
import VariantList from './VariantList';
import BodyText from '@/components/Texts/BodyText';
import BackButton from '@/components/Buttons/BackButton';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import PlazaButton from '@/components/Buttons/PlazaButton';
import Chip from '@/components/Chip';
import PlazaTextInput from '@/components/PlazaTextInput';
import * as Yup from 'yup';

interface VariantValueModalProps {
  innerRef: React.RefObject<BottomSheetModal>;
  variantOptions: VariantOption[];
  variantValues: VariantsDisplay[];
  setVariantValues: React.Dispatch<React.SetStateAction<VariantsDisplay[]>>;
}

const variantValueSchema = Yup.object().shape({
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be a positive number'),
  quantity: Yup.number()
    .required('Quantity is required')
    .min(0, 'Quantity must be a positive number'),
});

const VariantValueModal: FC<VariantValueModalProps> = ({
  innerRef,
  variantOptions,
  variantValues,
  setVariantValues,
}) => {
  const snappoints = useMemo(() => ['90%'], []);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedVariant, setSelectedVariant] =
    useState<VariantsDisplay | null>(null);

  const onPressItem = (itemIndex: number) => {
    setSelectedIndex(itemIndex);
  };

  const isVariantSelected = () => {
    return selectedIndex !== null;
  };

  useEffect(() => {
    // need to generate all combinations of variant options
    if (variantOptions.length > 0) {
      const combinations: VariantsDisplay[] = [];
      const generateCombinations = (
        currentCombination: VariantTypeToValue[],
        index: number
      ) => {
        const option = variantOptions[index];
        if (index === variantOptions.length) {
          combinations.push({
            fields: currentCombination,
            value: {
              id: Math.random().toString(36).substring(2, 9),
              price: 0,
              quantity: 0,
            },
          });
          return;
        }
        option.values.forEach((value) => {
          generateCombinations(
            [...currentCombination, { type: option.name, value: value }],
            index + 1
          );
        });
      };
      generateCombinations([], 0);
      setVariantValues(combinations);
    }
  }, [variantOptions]);

  useEffect(() => {
    if (selectedIndex !== null) {
      setSelectedVariant(variantValues[selectedIndex]);
    }
  }, [selectedIndex, variantValues]);

  return (
    <BottomSheetModal
      ref={innerRef}
      snapPoints={snappoints}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
    >
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {!isVariantSelected() ? (
          <>
            <HeadingText
              variant="h6-bold"
              style={{ padding: Spacing.SPACING_3 }}
            >
              Add Variant Value
            </HeadingText>
            <VariantList
              variantValues={variantValues}
              onPressItem={onPressItem}
            />
          </>
        ) : (
          <Formik
            initialValues={{
              price: selectedVariant?.value.price.toString() || '0',
              quantity: selectedVariant?.value.quantity.toString() || '0',
            }}
            validationSchema={variantValueSchema}
            onSubmit={(values) => {
              if (selectedIndex !== null) {
                const updatedVariantValues = [...variantValues];
                updatedVariantValues[selectedIndex] = {
                  ...selectedVariant!,
                  value: {
                    ...selectedVariant!.value,
                    price: parseFloat(values.price),
                    quantity: parseInt(values.quantity, 10),
                  },
                };
                setVariantValues(updatedVariantValues);
              }
              setSelectedIndex(null);
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  paddingHorizontal: Spacing.SPACING_3,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <PressableOpacity
                    onPress={() => {
                      setSelectedIndex(null);
                    }}
                  >
                    <Ionicons name="chevron-back" size={24} color="#000" />
                  </PressableOpacity>

                  <PlazaButton onPress={handleSubmit} title="Save" />
                </View>
                <HeadingText
                  variant="h5-bold"
                  style={{ marginTop: Spacing.SPACING_3 }}
                >
                  {selectedVariant?.fields
                    .map((field) => field.value)
                    .join(' / ')}
                </HeadingText>

                <HeadingText
                  variant="h6-bold"
                  style={{ marginTop: Spacing.SPACING_3 }}
                >
                  Attached Options
                </HeadingText>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: Spacing.SPACING_1,
                    columnGap: Spacing.SPACING_1,
                  }}
                >
                  {selectedVariant?.fields.map((item, index) => (
                    <Chip key={index} title={item.value} />
                  ))}
                </View>

                <View
                  style={{
                    marginTop: Spacing.SPACING_3,
                  }}
                >
                  <PlazaTextInput
                    label="Price"
                    keyboardType="numeric"
                    value={values.price.toString()}
                    onChangeText={handleChange('price')}
                    error={errors.price}
                  />
                </View>

                <View
                  style={{
                    marginTop: Spacing.SPACING_3,
                  }}
                >
                  <PlazaTextInput
                    label="Quantity"
                    keyboardType="numeric"
                    value={values.quantity.toString()}
                    onChangeText={handleChange('quantity')}
                    error={errors.quantity}
                  />
                </View>
              </View>
            )}
          </Formik>
        )}
      </View>
    </BottomSheetModal>
  );
};

export default VariantValueModal;
