import PlazaHeader from '@/components/PlazaHeader';
import PlazaTextInput from '@/components/PlazaTextInput';
import { View } from 'react-native';
import useCreateGroup from './useCreateGroup';
import PlazaButton from '@/components/Buttons/PlazaButton';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { router } from 'expo-router';

const NewGroup = () => {
  const { mutateAsync: createGroup } = useCreateGroup();

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        onSubmit={async (values) => {
          const id = await createGroup(values);
          router.replace({
            pathname: '/community/community_posts',
            params: { id },
          });
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <View>
            <PlazaHeader name="New Group" />
            <PlazaTextInput
              label="Group Name"
              placeholder="Ex. Jewelry Jammers"
              onChangeText={handleChange('name')}
            />
            <PlazaTextInput
              label="Group Description"
              placeholder="Ex. Jewelry Jammers"
              limit={150}
              onChangeText={handleChange('description')}
            />
            <PlazaButton title="Create Group" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default NewGroup;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
