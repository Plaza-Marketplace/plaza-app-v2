import Radius from '@/constants/Radius';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Event } from './models';
import UserIcon from '@/components/User/UserIcon';
import BodyText from '@/components/Texts/BodyText';
import Color from '@/constants/Color';
import ProductPreview from '@/components/Product/ProductPreview';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

interface BoothProps {
  seller: Event['sellers'][number];
}

const Booth: FC<BoothProps> = ({ seller }) => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <PressableOpacity
          onPress={() =>
            router.push({
              pathname: '/profile-modal',
              params: { id: seller.id },
            })
          }
        >
          <UserIcon profileImageUrl={seller.profileImageUrl} />
        </PressableOpacity>
        <View>
          <BodyText variant="md-bold" numberOfLines={1}>
            Booth {seller.boothName}
          </BodyText>
          <BodyText variant="lg" numberOfLines={1}>
            {seller.displayName}
          </BodyText>
        </View>
      </View>

      {seller.products.length > 0 && (
        <ScrollView
          horizontal
          contentContainerStyle={{
            gap: 8,
            paddingHorizontal: 16,
          }}
        >
          {seller.products.map((product) => (
            <ProductPreview
              key={product.id}
              id={product.id}
              thumbnailUrl={product.thumbnailUrl}
              price={product.price ?? NaN}
              name={product.name}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Booth;

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.LG,
    borderColor: Color.NEUTRALS_200,
    borderWidth: 1,
    paddingTop: 16,
    gap: 8,
    paddingVertical: 16,
  },
  user: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
