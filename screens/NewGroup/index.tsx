import PlazaHeader from '@/components/PlazaHeader';
import PlazaTextInput from '@/components/PlazaTextInput';
import { View } from 'react-native';
import useCreateGroup from './useCreateGroup';
import PlazaButton from '@/components/Buttons/PlazaButton';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { router } from 'expo-router';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import IconButton from '@/components/Buttons/IconButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import Radius from '@/constants/Radius';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import * as FileSystem from 'expo-file-system';

const NewGroup = () => {
  const { mutateAsync: createGroup } = useCreateGroup();

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          description: '',
          iconUrl: '',
          bannerUrl: '',
        }}
        onSubmit={async (values) => {
          const base64Icon = values.iconUrl
            ? await FileSystem.readAsStringAsync(values.iconUrl, {
                encoding: 'base64',
              })
            : null;

          const base64Banner = values.bannerUrl
            ? await FileSystem.readAsStringAsync(values.bannerUrl, {
                encoding: 'base64',
              })
            : null;

          const id = await createGroup({
            name: values.name,
            description: values.description,
            iconBase64: base64Icon,
            bannerBase64: base64Banner,
          });
          router.push({
            pathname: '/community',
            params: { id },
          });
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => {
          const handleAddIcon = async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsMultipleSelection: true,
              selectionLimit: 4,
            });

            if (result.canceled) return;

            const uris = result.assets.map((asset) => asset.uri);
            setFieldValue('iconUrl', uris[0]);
          };

          const handleAddBanner = async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsMultipleSelection: true,
              selectionLimit: 4,
            });

            if (result.canceled) return;

            const uris = result.assets.map((asset) => asset.uri);
            setFieldValue('bannerUrl', uris[0]);
          };

          return (
            <View>
              <PlazaHeader name="New Group" />

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: Spacing.SPACING_3,
                }}
              >
                {values.iconUrl ? (
                  <PressableOpacity onPress={handleAddIcon}>
                    <Image
                      style={styles.iconContent}
                      source={{ uri: values.iconUrl }}
                    />
                  </PressableOpacity>
                ) : (
                  <IconButton
                    icon={
                      <MaterialCommunityIcons
                        name="image-plus"
                        size={24}
                        color={Color.PRIMARY_DEFAULT}
                      />
                    }
                    label={'Group Icon'}
                    style={styles.iconContent}
                    onPress={handleAddIcon}
                  />
                )}

                {values.bannerUrl ? (
                  <PressableOpacity
                    style={{ flex: 1 }}
                    onPress={handleAddBanner}
                  >
                    <Image
                      style={styles.bannerContent}
                      source={{ uri: values.bannerUrl }}
                    />
                  </PressableOpacity>
                ) : (
                  <IconButton
                    icon={
                      <MaterialCommunityIcons
                        name="image-plus"
                        size={24}
                        color={Color.PRIMARY_DEFAULT}
                      />
                    }
                    label={'Group Banner'}
                    style={styles.bannerContent}
                    onPress={handleAddBanner}
                  />
                )}
              </View>

              <View style={styles.inputMargin}>
                <PlazaTextInput
                  label="Group Name"
                  placeholder="Ex. Jewelry Jammers"
                  onChangeText={handleChange('name')}
                />
              </View>
              <View style={styles.inputMargin}>
                <PlazaTextInput
                  label="Group Description"
                  placeholder="Ex. Jewelry Jammers"
                  limit={150}
                  onChangeText={handleChange('description')}
                />
              </View>
              <PlazaButton
                title="Create Group"
                onPress={() => handleSubmit()}
                style={{ marginTop: Spacing.SPACING_2 }}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default NewGroup;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputMargin: {
    marginTop: Spacing.SPACING_3,
  },
  iconContent: {
    width: 100,
    height: 100,
    borderRadius: Radius.LG,
  },
  bannerContent: {
    height: 100,
    flex: 1,
    marginLeft: Spacing.SPACING_2,
    borderRadius: Radius.LG,
  },
});
