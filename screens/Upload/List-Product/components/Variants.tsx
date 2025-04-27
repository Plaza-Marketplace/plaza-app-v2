import { Switch, View } from 'react-native';
import React, { FC } from 'react';
import { styles } from '../styles';
import HeadingText from '@/components/Texts/HeadingText';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import BodyText from '@/components/Texts/BodyText';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import PlazaTextInput from '@/components/PlazaTextInput';
import PlazaButton from '@/components/Buttons/PlazaButton';
import Radius from '@/constants/Radius';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { FormikProps, useFormikContext } from 'formik';
import { CreateListingForm, VariantOption, VariantValue } from '../schema';

interface ProductUploadVariantsProps {
  openOptionForm: () => void;
  openVariantValueForm: () => void;
  openEditOptionForm: (index: number) => void;
  isVariantsEnabled: boolean;
  setIsVariantsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  variantOptions: VariantOption[];
  // For now, we're only going to allow a variant depth of 2
  setVariantOptions: React.Dispatch<React.SetStateAction<VariantOption[]>>;
}

const Variants: FC<ProductUploadVariantsProps> = ({
  openOptionForm,
  openVariantValueForm,
  openEditOptionForm,
  isVariantsEnabled,
  setIsVariantsEnabled,
  variantOptions,
  setVariantOptions,
}) => {
  const formik = useFormikContext<CreateListingForm>();
  const toggleSwitch = () =>
    setIsVariantsEnabled((previousState) => !previousState);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <HeadingText variant="h6-bold">Variants</HeadingText>
        <Switch
          trackColor={{
            false: Color.GREY_300,
            true: Color.PRIMARY_100,
          }}
          thumbColor={
            isVariantsEnabled ? Color.PRIMARY_DEFAULT : Color.GREY_500
          }
          onValueChange={toggleSwitch}
          value={isVariantsEnabled}
        />
      </View>

      {isVariantsEnabled ? (
        <>
          <DraggableFlatList
            data={variantOptions}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListFooterComponent={() => (
              <PlazaButton
                title="Add Option"
                disabled={variantOptions.length >= 2}
                style={{
                  marginTop: Spacing.SPACING_3,
                }}
                onPress={openOptionForm}
              />
            )}
            renderItem={({ item, drag, isActive }) => {
              return (
                <View
                  style={{
                    padding: Spacing.SPACING_3,
                    backgroundColor: isActive ? Color.GREY_300 : Color.GREY_150,
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: Spacing.SPACING_2,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <PressableOpacity onLongPress={drag}>
                      <FontAwesome5
                        name="grip-vertical"
                        size={24}
                        color="black"
                      />
                    </PressableOpacity>
                    <BodyText
                      variant="lg"
                      style={{
                        marginLeft: Spacing.SPACING_2,
                      }}
                    >
                      {item.name} ({item.values.length} Values)
                    </BodyText>
                  </View>
                  <PressableOpacity
                    onPress={() =>
                      openEditOptionForm(variantOptions.indexOf(item))
                    }
                    style={{
                      marginLeft: 'auto',
                    }}
                  >
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={24}
                      color={Color.GREY_500}
                    />
                  </PressableOpacity>
                </View>
              );
            }}
            onDragEnd={({ data }) => setVariantOptions(data)}
          />

          <View
            style={[styles.inputContainer, { marginTop: Spacing.SPACING_3 }]}
          >
            <HeadingText variant="h6-bold">Values</HeadingText>
            <PressableOpacity
              style={{
                backgroundColor: Color.GREY_150,
                padding: Spacing.SPACING_3,
                borderRadius: Radius.ROUNDED,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={openVariantValueForm}
            >
              <BodyText variant="lg">
                {variantOptions.length > 0
                  ? variantOptions.reduce((acc, current) => {
                      return acc * current.values.length;
                    }, 1)
                  : 0}{' '}
                Variants
              </BodyText>
              <Ionicons
                name="ellipsis-horizontal"
                size={24}
                color={Color.GREY_500}
              />
            </PressableOpacity>
          </View>
        </>
      ) : (
        <View style={[styles.inputContainer, { marginTop: Spacing.SPACING_3 }]}>
          <PlazaTextInput
            label="Quantity"
            onChangeText={formik.handleChange('quantity')}
            placeholder="example: 1"
            keyboardType="numeric"
          />
        </View>
      )}
    </View>
  );
};

export default Variants;
