import { ScrollView, View } from 'react-native';
import React, { FC, useState } from 'react';
import { CreateListingForm } from '../schema';
import { useFormikContext } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import HighlightButton from '@/components/Buttons/HighlightButton';
import { Upload } from '@/components/Icons';
import { Ionicons } from '@expo/vector-icons';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import AddImage from '@/components/AddImage';
import { router } from 'expo-router';
import IconButton from '@/components/Buttons/IconButton';
import { styles } from '../styles';
import Loading from '@/components/Loading';

interface UploadPhotosProps {}

const Photos: FC<UploadPhotosProps> = () => {
  const [adding, setAdding] = useState(false);
  const formik = useFormikContext<CreateListingForm>();

  if (!formik.values) {
    return <Loading />;
  }

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 4,
    });

    if (result.canceled) return;

    const uris = result.assets.map((asset) => asset.uri);
    formik.setFieldValue('imageUris', [...uris, ...formik.values.imageUris]);
    setAdding(false);
  };
  return (
    <>
      {adding ? (
        <View style={styles.headerContainer}>
          <HighlightButton
            title="Upload Photos"
            icon={<Upload color={Color.PRIMARY_DEFAULT} />}
            onPress={handleAddImage}
          />

          <HighlightButton
            title="Take Photo"
            icon={
              <Ionicons name="camera" size={24} color={Color.PRIMARY_DEFAULT} />
            }
            onPress={() => {
              setAdding(false);
              router.replace('/list-item/photo-take');
            }}
          />
        </View>
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            gap: Spacing.SPACING_3,
            paddingHorizontal: Spacing.SPACING_3,
          }}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <IconButton
            icon={<Upload color={Color.PRIMARY_DEFAULT} />}
            label={'add'}
            style={{ width: 100, height: 100 }}
            onPress={() => setAdding(true)}
          />
          <AddImage
            onPress={() => {}}
            imageUri={formik.values.imageUris.at(0)}
          />
          <AddImage
            onPress={() => {}}
            imageUri={formik.values.imageUris.at(1)}
          />
          <AddImage
            onPress={() => {}}
            imageUri={formik.values.imageUris.at(2)}
          />
          <AddImage
            onPress={() => {}}
            imageUri={formik.values.imageUris.at(3)}
          />
        </ScrollView>
      )}
    </>
  );
};

export default Photos;
