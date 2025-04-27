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
          error={formik.errors.title}
        />
      </View>

      <View style={styles.inputContainer}>
        <PlazaTextInput
          label="Description"
          onChangeText={formik.handleChange('description')}
          placeholder="example: handmade clay cat mug"
          style={{ height: 100 }}
          error={formik.errors.description}
          multiline
        />
      </View>
      <View style={styles.inputContainer}>
        <PlazaTextInput
          label="Price"
          onChangeText={formik.handleChange('price')}
          placeholder="example: 10.00"
          keyboardType="numeric"
          style={{ flex: 1 }}
          error={formik.errors.price}
          value={formik.values.price.toString()} // Ensure price is a string for input
        />
        <PlazaTextInput
          label="Shipping Price"
          onChangeText={formik.handleChange('shippingPrice')}
          placeholder="example: 5.00"
          keyboardType="numeric"
          style={{ flex: 1 }}
          error={formik.errors.shippingPrice}
          value={formik.values.shippingPrice.toString()} // Ensure shippingPrice is a string for input
        />
        <PlazaTextInput
          label="Location"
          onChangeText={formik.handleChange('location')}
          placeholder="example: San Francisco, CA"
          style={{ flex: 1 }}
          error={formik.errors.location}
        />
      </View>
    </>
  );
};

export default ProductInfo;
