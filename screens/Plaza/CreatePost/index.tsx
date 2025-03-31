import ExitButton from '@/components/Buttons/ExitButton';
import GroupIcon from '@/components/Community/GroupIcon';
import HeadingText from '@/components/Texts/HeadingText';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetGroupInfo } from './hooks';
import BodyText from '@/components/Texts/BodyText';
import { FC } from 'react';
import { Formik } from 'formik';
import PlazaTextInput from '@/components/PlazaTextInput';
import Add from '@/components/Buttons/Add';
import Footer from '@/components/Footer';

interface CreatePostProps {
  groupId: Id;
}

const CreatePost: FC<CreatePostProps> = ({ groupId }) => {
  const { data, error } = useGetGroupInfo(groupId);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ExitButton />
        <HeadingText variant="h6-bold">Create Post</HeadingText>
        <View style={{ flex: 1 }} />
      </View>
      <View style={styles.group}>
        <GroupIcon id={groupId} url={data?.iconUrl ?? ''} size={32} />
        <BodyText variant="md-medium">{data?.name}</BodyText>
      </View>
      <Formik
        initialValues={{ title: '', content: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <PlazaTextInput
              label="Title"
              placeholder="Enter title"
              multiline={false}
            />
            <PlazaTextInput
              label="Body Text"
              placeholder="Enter content"
              multiline
              style={{ height: 128 }}
            />
            <HeadingText variant="h6-bold">Attach a Product</HeadingText>
            <Add />
          </View>
        )}
      </Formik>
      <Footer />
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  group: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
