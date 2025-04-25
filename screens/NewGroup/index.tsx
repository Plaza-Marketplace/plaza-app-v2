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
import * as Yup from 'yup';
import BodyText from '@/components/Texts/BodyText';

const newGroupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Group name is required')
    .min(2, 'Group name must be at least 2 characters'),
  description: Yup.string()
    .required('Group description is required')
    .max(150, 'Description cannot exceed 150 characters'),
  iconUrl: Yup.string().required('Group icon is required'),
  bannerUrl: Yup.string().required('Group banner is required'),
});

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
        validationSchema={newGroupSchema}
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
        {({ handleChange, handleSubmit, values, setFieldValue, errors }) => {
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

              <BodyText
                variant="sm"
                style={{ marginTop: Spacing.SPACING_2 }}
                color={Color.RED_400}
              >
                {errors.iconUrl}
              </BodyText>
              <BodyText
                variant="sm"
                style={{ marginTop: Spacing.SPACING_2 }}
                color={Color.RED_400}
              >
                {errors.bannerUrl}
              </BodyText>

              <View style={styles.inputMargin}>
                <PlazaTextInput
                  label="Group Name"
                  placeholder="Ex. Jewelry Jammers"
                  onChangeText={handleChange('name')}
                  error={errors.name}
                />
              </View>
              <View style={styles.inputMargin}>
                <PlazaTextInput
                  label="Group Description"
                  placeholder="Ex. Jewelry Jammers"
                  limit={150}
                  onChangeText={handleChange('description')}
                  error={errors.description}
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
