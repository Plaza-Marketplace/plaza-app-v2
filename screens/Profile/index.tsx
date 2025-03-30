import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import Radius from '@/constants/Radius';
import { Ionicons } from '@expo/vector-icons';
import PlazaHeader from '@/components/PlazaHeader';
import { router, usePathname } from 'expo-router';
import Reviews from './Reviews';
import Videos from './Videos';
import Header from './Header';
import { FC } from 'react';
import Products from './Products';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft } from '@/components/Icons';
import Color from '@/constants/Color';
import { useGetHeader } from './Header/hooks';

interface ProfileProps {
  userId: Id;
}

const Profile: FC<ProfileProps> = ({ userId }) => {
  const { user: currentUser } = useAuth();
  const { data, error } = useGetHeader(userId);
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      <PlazaHeader
        name={data?.username ?? ''}
        leftIcon={
          pathname === '/profile' ? null : <ChevronLeft color={Color.BLACK} />
        }
        rightIcon={
          currentUser?.id === userId ? (
            <Ionicons name="cog-outline" size={32} />
          ) : null
        }
        rightOnClick={() => {
          router.push('/settings');
        }}
      />
      <Tabs.Container
        renderHeader={() => <Header userId={userId} />}
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
          <Reviews sellerId={userId} />
        </Tabs.Tab>
      </Tabs.Container>
    </>
  );
};

export default Profile;
