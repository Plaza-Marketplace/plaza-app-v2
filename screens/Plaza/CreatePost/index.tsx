import ExitButton from '@/components/Buttons/ExitButton';
import GroupIcon from '@/components/Community/GroupIcon';
import HeadingText from '@/components/Texts/HeadingText';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native';
import {
  useCreateGroupPost,
  useGetGroupInfo,
  useGetProductThumbnailUrl,
} from './hooks';
import BodyText from '@/components/Texts/BodyText';
import { FC, useRef, useState } from 'react';
import { Formik } from 'formik';
import PlazaTextInput from '@/components/PlazaTextInput';
import Add from '@/components/Buttons/Add';
import Footer from '@/components/Footer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import SelectProductModal from '@/components/Community/SelectProductModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import Radius from '@/constants/Radius';
import Color from '@/constants/Color';
import { Exit } from '@/components/Icons';
import PressableOpacity from '@/components/Buttons/PressableOpacity';

interface CreatePostProps {
  groupId: Id;
}

const CreatePost: FC<CreatePostProps> = ({ groupId }) => {
  const { data, error } = useGetGroupInfo(groupId);
  const [selectedProductId, setSelectedProductId] = useState<Id | null>(null);
  const { data: thumbnailUrl } = useGetProductThumbnailUrl(selectedProductId);
  const { mutate: createGroupPost } = useCreateGroupPost(groupId);
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  console.log()
  return (
    <Formik
      initialValues={{ title: '', description: '', productId: null }}
      onSubmit={(values) => {
        if (values.description === '' || values.title === '') {
          return;
        }

        createGroupPost({
          title: values.title,
          description: values.description,
          productId: selectedProductId,
        });

        router.navigate({
          pathname: '/community',
          params: { id: groupId },
        });
      }}
    >
      {({ handleChange, handleSubmit }) => (
        <>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
              <View style={{ flex: 1 / 5 }}>
                <ExitButton />
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <HeadingText variant="h6-bold">Create Post</HeadingText>
              </View>
              <View style={{ flex: 1 / 5 }} />
            </View>
            <ScrollView contentContainerStyle={[styles.container]}>
              <View style={styles.group}>
                <GroupIcon id={groupId} url={data?.iconUrl ?? ''} size={32} />
                <BodyText variant="md-medium">{data?.name}</BodyText>
              </View>

              <View style={{ gap: 16, paddingHorizontal: 16 }}>
                <PlazaTextInput
                  label="Title"
                  placeholder="Enter title"
                  multiline={false}
                  onChangeText={handleChange('title')}
                />
                <PlazaTextInput
                  label="Body Text"
                  placeholder="Enter description"
                  multiline
                  style={{ height: 128 }}
                  onChangeText={handleChange('description')}
                />
                <HeadingText variant="h6-bold">Attach a Product</HeadingText>
                <View style={styles.products}>
                  <Add onPress={() => bottomSheetRef.current?.present()} />
                  {selectedProductId && (
                    <View>
                      <Image
                        source={{ uri: thumbnailUrl }}
                        style={{
                          width: 84,
                          height: 84,
                          borderRadius: Radius.ROUNDED,
                          backgroundColor: Color.GREY_200,
                        }}
                      />
                      <PressableOpacity
                        onPress={() => setSelectedProductId(null)}
                        style={{
                          position: 'absolute',
                          right: -14,
                          top: -14,
                          backgroundColor: Color.ERROR_100,
                          padding: 4,
                          borderRadius: 50,
                        }}
                      >
                        <Exit color={Color.ERROR_DEFAULT} />
                      </PressableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
            <View style={{ paddingBottom: insets.bottom }}>
              <Footer
                leftTitle="Discard"
                rightTitle="Post"
                leftOnPress={router.back}
                rightOnPress={handleSubmit}
              />
            </View>
            <SelectProductModal
              title="Select Product"
              multiple={false}
              onSubmit={(productIds: Id[]) =>
                setSelectedProductId(productIds[0] ?? null)
              }
              bottomSheetRef={bottomSheetRef}
            />
          </KeyboardAvoidingView>
        </>
      )}
    </Formik>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
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
    paddingHorizontal: 16,
  },
  products: {
    flexDirection: 'row',
    gap: 8,
  },
});
