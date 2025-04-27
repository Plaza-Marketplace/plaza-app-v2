import { Text, View, StyleSheet } from 'react-native';
import React, { FC, useMemo, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { VariantOption } from '../schema';
import Spacing from '@/constants/Spacing';
import HeadingText from '@/components/Texts/HeadingText';
import { FieldArray, Formik } from 'formik';
import PlazaTextInput from '@/components/PlazaTextInput';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { TextInput } from 'react-native-gesture-handler';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '@/components/Texts/BodyText';
import PlazaButton from '@/components/Buttons/PlazaButton';
import * as Yup from 'yup';

interface VariantOptionAddModalProps {
  innerRef: React.RefObject<BottomSheetModal>;
  variantOptions: VariantOption[];
  setVariantOptions: React.Dispatch<React.SetStateAction<VariantOption[]>>;
}

const variantOptionSchema = Yup.object().shape({
  optionName: Yup.string()
    .required('Option name is required')
    .min(2, 'Option name must be at least 2 characters'),
  optionValues: Yup.array()
    .of(Yup.string().required('Value is required'))
    .min(1, 'At least one value is required'),
});

const VariantOptionAddModal: FC<VariantOptionAddModalProps> = ({
  innerRef,
  variantOptions,
  setVariantOptions,
}) => {
  const snappoints = useMemo(() => ['90%'], []);

  const [newInput, setNewInput] = useState('');

  const addVariantType = (variant: VariantOption) => {
    setVariantOptions((prev) => [...prev, variant]);
  };

  return (
    <BottomSheetModal
      ref={innerRef}
      snapPoints={snappoints}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HeadingText variant="h6-bold" style={{ marginTop: Spacing.SPACING_2 }}>
          Add Option
        </HeadingText>

        <Formik
          initialValues={{
            optionName: '',
            optionValues: [] as string[],
          }}
          validationSchema={variantOptionSchema}
          onSubmit={(values, { resetForm }) => {
            const newVariant: VariantOption = {
              id: `${values.optionName}-option`,
              name: values.optionName,
              values: values.optionValues,
            };
            addVariantType(newVariant);
            resetForm();
            innerRef.current?.close();
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.formContainer}>
              <PlazaTextInput
                label="Option Name"
                placeholder="i.e. Size, Color"
                value={values.optionName}
                onChangeText={handleChange('optionName')}
                style={{ padding: Spacing.SPACING_2 }}
                error={errors.optionName}
              />

              <HeadingText
                variant="h6-bold"
                style={{ marginTop: Spacing.SPACING_3 }}
              >
                Option Values
              </HeadingText>
              <FieldArray
                name="optionValues"
                render={({ push, remove }) => (
                  <View style={styles.optionContainer}>
                    {values.optionValues.map((item, index) => (
                      <View key={index} style={styles.elementContainer}>
                        <BodyText
                          variant="lg-semibold"
                          style={styles.elementText}
                        >
                          {item}
                        </BodyText>

                        <PressableOpacity onPress={() => remove(index)}>
                          <Ionicons
                            name="trash-outline"
                            size={24}
                            color={Color.BLACK}
                            style={{
                              padding: Spacing.SPACING_2,
                            }}
                          />
                        </PressableOpacity>
                      </View>
                    ))}

                    <View style={styles.addTextContainer}>
                      <TextInput
                        placeholder="i.e. Small, Red"
                        value={newInput}
                        onChangeText={(text) => {
                          setNewInput(text);
                        }}
                        style={styles.addTextInput}
                      />

                      <PressableOpacity
                        onPress={() => {
                          if (newInput.trim()) {
                            push(newInput.trim());
                            setNewInput('');
                          }
                        }}
                        style={{
                          padding: Spacing.SPACING_2,
                        }}
                      >
                        <Ionicons name="add" size={24} color={Color.BLACK} />
                      </PressableOpacity>
                    </View>
                  </View>
                )}
              />
              {errors.optionValues && (
                <BodyText variant="sm" color={Color.RED_400}>
                  {errors.optionValues}
                </BodyText>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: Spacing.SPACING_3,
                }}
              >
                <PlazaButton title="Add Option" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </BottomSheetModal>
  );
};

export default VariantOptionAddModal;

const styles = StyleSheet.create({
  formContainer: {
    padding: Spacing.SPACING_3,
    width: '100%',
  },
  optionContainer: {
    backgroundColor: Color.GREY_100,
    borderRadius: Radius.ROUNDED,
    borderWidth: 1,
    borderColor: Color.NEUTRALS_DEFAULT,
    marginTop: Spacing.SPACING_1,
  },
  elementContainer: {
    padding: Spacing.SPACING_2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  elementText: {
    padding: Spacing.SPACING_2,
    color: Color.NEUTRALS_DEFAULT,
  },
  addTextInput: {
    flex: 1,
    padding: Spacing.SPACING_2,
    color: Color.BLACK,
    fontSize: 16,
  },
  addTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.SPACING_2,
  },
});
