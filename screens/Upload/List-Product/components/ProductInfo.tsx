import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { FormikProps, useFormikContext } from 'formik';
import { CreateListingForm } from '../schema';
import { styles } from '../styles';
import PlazaTextInput from '@/components/PlazaTextInput';

interface UploadProductInfoProps {}

const ProductInfo: FC<UploadProductInfoProps> = () => {
  const formik = useFormikContext<CreateListingForm>();
  return (
    <>
      <View style={styles.inputContainer}>
        <PlazaTextInput
          label="Product Name"
          onChangeText={formik.handleChange('title')}
          placeholder="example: Cat Mug"
        />
      </View>

      <View style={styles.inputContainer}>
        <PlazaTextInput
          label="Description"
          onChangeText={formik.handleChange('description')}
          placeholder="example: handmade clay cat mug"
          style={{ height: 100 }}
        />
      </View>
      <View style={styles.inputContainer}>
        <PlazaTextInput
          label="Price"
          onChangeText={formik.handleChange('price')}
          placeholder="example: 10.00"
          keyboardType="numeric"
          style={{ flex: 1 }}
        />
        <PlazaTextInput
          label="Shipping Price"
          onChangeText={formik.handleChange('shippingPrice')}
          placeholder="example: 5.00"
          keyboardType="numeric"
          style={{ flex: 1 }}
        />
        <PlazaTextInput
          label="Location"
          onChangeText={formik.handleChange('location')}
          placeholder="example: San Francisco, CA"
          style={{ flex: 1 }}
        />
      </View>
    </>
  );
};

export default ProductInfo;
