import { BottomSheetModal } from '@gorhom/bottom-sheet';
import FeedBottomSheet from './FeedBottomSheet';
import { FC, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HeaderText from '../Texts/HeaderText';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import BoldStandardText from '../Texts/BoldStandardText';
import PlazaTextInput from '../PlazaTextInput';
import { useGetAssociatedCommunities } from '@/hooks/queries/useCommunity';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import ProfileIcon from '../ProfileIcon';
import StandardText from '../Texts/StandardText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Footer from '../Footer';
import PressableOpacity from '../Buttons/PressableOpacity';
import Radius from '@/constants/Radius';
import useCreateCommunityCollectionItem from '@/hooks/queries/useCreateCommunityCollectionItem';
import ProductIcon from '../Product/ProductIcon';
import { Event, track } from '@/analytics/utils';

interface AddToCommunityCollectionModalProps {
  products: Product[];
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const AddToCommunityCollectionModal: FC<AddToCommunityCollectionModalProps> = ({
  products,
  bottomSheetRef,
}) => {
  const insets = useSafeAreaInsets();
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { data: communities } = useGetAssociatedCommunities(user?.id);
  const { mutate: createCommunityCollectionItem } =
    useCreateCommunityCollectionItem();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<Id | null>(null);

  const handleSubmit = () => {
    if (!selectedCommunity || !selectedProduct) return;

    createCommunityCollectionItem({
      productId: selectedProduct.id,
      communityId: selectedCommunity,
      description: caption,
    });

    track(Event.SHARED_PRODUCT_TO_COMMUNITY, {
      productId: selectedProduct.id,
      communityId: selectedCommunity,
    });
  };

  return (
    <FeedBottomSheet bottomSheetRef={bottomSheetRef}>
      <View style={styles.header}>
        <HeaderText>Add to Community Collection</HeaderText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <BoldStandardText>Select a Product</BoldStandardText>
        <View style={styles.products}>
          {products.map((product) => (
            <View
              key={product.id}
              style={{
                borderWidth: selectedProduct?.id === product.id ? 1 : 0,
                borderRadius: Radius.ROUNDED,
              }}
            >
              <ProductIcon
                imageUrl={
                  product.imageUrls.length > 0
                    ? product.imageUrls[0]
                    : undefined
                }
                onPress={() => setSelectedProduct(product)}
              />
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <BoldStandardText>Add a Caption</BoldStandardText>
          <PlazaTextInput
            placeholder="Caption goes here..."
            multiline
            style={{ height: 100 }}
            onChangeText={setCaption}
          />
        </View>
        <View style={styles.section}>
          <BoldStandardText>Community</BoldStandardText>
          {communities?.map((community) => (
            <PressableOpacity
              key={community.id}
              style={[
                styles.community,
                {
                  borderWidth: selectedCommunity === community.id ? 1 : 0,
                },
              ]}
              onPress={() => setSelectedCommunity(community.id)}
            >
              <ProfileIcon variant="community" url={community.iconUrl} />
              <StandardText>{community.name}</StandardText>
            </PressableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={{ paddingBottom: insets.bottom }}>
        <Footer
          leftTitle="Cancel"
          rightTitle="Add to Collection"
          leftOnPress={() => bottomSheetRef.current?.dismiss()}
          rightOnPress={handleSubmit}
        />
      </View>
    </FeedBottomSheet>
  );
};

export default AddToCommunityCollectionModal;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.SPACING_1,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
  content: {
    padding: Spacing.SPACING_3,
    gap: Spacing.SPACING_3,
  },
  section: { gap: Spacing.SPACING_3 },
  community: {
    flexDirection: 'row',
    gap: Spacing.SPACING_2,
    alignItems: 'center',
    padding: Spacing.SPACING_1,
    borderRadius: Radius.ROUNDED,
  },
  products: {
    flexDirection: 'row',
    gap: Spacing.SPACING_1,
  },
});
