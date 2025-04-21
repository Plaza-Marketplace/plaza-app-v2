import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import Radius from '@/constants/Radius';
import { Ionicons } from '@expo/vector-icons';
import PlazaHeader from '@/components/PlazaHeader';
import { router, usePathname } from 'expo-router';
import Reviews from './Reviews';
import Videos from './Videos';
import Header from './Header';
import { FC, useRef } from 'react';
import Products from './Products';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft } from '@/components/Icons';
import Color from '@/constants/Color';
import { useGetHeader } from './Header/hooks';
import BodyText from '@/components/Texts/BodyText';
import ProfileHeader from '@/components/Headers/ProfileHeader';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import UserReportModal from '@/components/Report/ReportModal/UserReportModal';

interface ProfileProps {
  userId: Id;
}

const Profile: FC<ProfileProps> = ({ userId }) => {
  const { user: currentUser } = useAuth();
  const { data, isLoading, error } = useGetHeader(userId);
  const pathname = usePathname();
  const reportRef = useRef<BottomSheetModal>(null);

  if (isLoading) {
    return <BodyText variant="md">Loading...</BodyText>;
  }

  if (error || !data) {
    return <BodyText variant="md">{error?.message}</BodyText>;
  }

  return (
    <>
      <UserReportModal userId={userId} bottomSheetRef={reportRef} />
      <ProfileHeader
        name={data.displayName}
        leftIcon={
          pathname === '/profile' ? null : <ChevronLeft color={Color.BLACK} />
        }
        rightIcon={
          currentUser?.id === userId ? (
            <Ionicons name="cog-outline" size={32} />
          ) : (
            <Ionicons name="flag-outline" size={32} />
          )
        }
        rightOnClick={
          currentUser?.id === userId
            ? () => router.push('/settings')
            : () => reportRef.current?.present()
        }
      />
      <Tabs.Container
        renderHeader={() => <Header userId={userId} header={data} />}
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
