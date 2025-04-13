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

interface VariantOptionEditModalProps {
  innerRef: React.RefObject<BottomSheetModal>;
  variantOptions: VariantOption[];
  setVariantOptions: React.Dispatch<React.SetStateAction<VariantOption[]>>;
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const VariantOptionEditModal: FC<VariantOptionEditModalProps> = ({
  innerRef,
  variantOptions,
  setVariantOptions,
  selectedIndex,
  setSelectedIndex,
}) => {
  const snappoints = useMemo(() => ['90%'], []);
  const [newInput, setNewInput] = useState('');

  return (
    <BottomSheetModal
      ref={innerRef}
      snapPoints={snappoints}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
    >
      {selectedIndex !== null ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <HeadingText
            variant="h6-bold"
            style={{ marginTop: Spacing.SPACING_2 }}
          >
            Add Option
          </HeadingText>

          <Formik
            initialValues={{
              optionName: variantOptions[selectedIndex].name,
              optionValues: variantOptions[selectedIndex].values,
              deleting: false,
            }}
            onSubmit={(values, { resetForm }) => {
              if (values.deleting) {
                const updatedOptions = [...variantOptions];
                updatedOptions.splice(selectedIndex, 1);
                setSelectedIndex(null);
                setVariantOptions(updatedOptions);
                innerRef.current?.close();
              } else {
                const updatedOptions = [...variantOptions];
                updatedOptions[selectedIndex] = {
                  ...updatedOptions[selectedIndex],
                  values: values.optionValues,
                };
                setVariantOptions(updatedOptions);
                resetForm();
                innerRef.current?.close();
              }
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View style={styles.formContainer}>
                <PlazaTextInput
                  label="Option Name"
                  value={values.optionName}
                  style={{ padding: Spacing.SPACING_2 }}
                  editable={false}
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: Spacing.SPACING_3,
                  }}
                >
                  <PressableOpacity>
                    <BodyText
                      variant="lg"
                      style={{
                        color: Color.RED_500,
                        marginRight: Spacing.SPACING_4,
                      }}
                      onPress={() => {
                        values.deleting = true;
                        handleSubmit();
                      }}
                    >
                      Delete
                    </BodyText>
                  </PressableOpacity>
                  <PlazaButton
                    title="Save"
                    onPress={() => {
                      values.deleting = false;
                      handleSubmit();
                    }}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <HeadingText
            variant="h6-bold"
            style={{ marginTop: Spacing.SPACING_2 }}
          >
            No Option Selected
          </HeadingText>
        </View>
      )}
    </BottomSheetModal>
  );
};

export default VariantOptionEditModal;

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
