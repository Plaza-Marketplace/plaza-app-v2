import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import Radius from '@/constants/Radius';
import { Ionicons } from '@expo/vector-icons';
import Reviews from './Reviews';
import Videos from './Videos';
import { FC } from 'react';
import Products from './Products';
import { useGetHeader, useGetBlocked, useUnblockUser } from './Info/hooks';
import BodyText from '@/components/Texts/BodyText';
import Header from './Header';
import Info from './Info';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlazaButton from '@/components/Buttons/PlazaButton';

// TODO: Move calling of hooks into Info

interface ProfileProps {
  userId: Id;
}

const Profile: FC<ProfileProps> = ({ userId }) => {
  const { data, isLoading, error } = useGetHeader(userId);
  const {
    data: blocked,
    isLoading: isBlockedLoading,
    error: blockError,
  } = useGetBlocked(userId);

  const { mutate: unblockUser } = useUnblockUser();

  if (isLoading && isBlockedLoading) {
    return <BodyText variant="md">Loading...</BodyText>;
  }

  if (error || !data || blockError || blocked == null) {
    return (
      <SafeAreaView>
        <BodyText variant="md">
          {error?.message}
          {blockError?.message}
        </BodyText>
      </SafeAreaView>
    );
  }

  if (blocked) {
    return (
      <>
        <Header userId={userId} name={data.displayName} blocked={blocked} />
        <BodyText variant="md">You have blocked this user.</BodyText>
        <PlazaButton
          title="Unblock User"
          onPress={() => {
            // Implement unblock functionality here
            unblockUser(userId);
          }}
        />
      </>
    );
  }

  return (
    <>
      <Header userId={userId} name={data.displayName} blocked={blocked} />
      <Tabs.Container
        renderHeader={() => <Info userId={userId} header={data} />}
        containerStyle={{ zIndex: -1 }}
        renderTabBar={(props) => {
          return (
            <MaterialTabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'black' }}
              style={{ backgroundColor: 'white' }}
            />
          );
        }}
      >
        <Tabs.Tab
          name="video"
          label={(props) => {
            return <Ionicons name="videocam-outline" size={Radius.XL} />;
          }}
        >
          <Videos userId={userId} />
        </Tabs.Tab>
        <Tabs.Tab
          name="product"
          label={(props) => {
            return <Ionicons name="storefront-outline" size={Radius.XL} />;
          }}
        >
          <Products userId={userId} />
        </Tabs.Tab>
        <Tabs.Tab
          name="reviews"
          label={(props) => {
            return <Ionicons name="star-outline" size={Radius.XL} />;
          }}
        >
          <Reviews averageRating={data.averageRating} sellerId={userId} />
        </Tabs.Tab>
      </Tabs.Container>
    </>
  );
};

export default Profile;
