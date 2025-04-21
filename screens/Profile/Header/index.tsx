import { StyleSheet, View } from 'react-native';
import { FC, useRef } from 'react';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Spacing from '@/constants/Spacing';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeadingText from '@/components/Texts/HeadingText';
import Color from '@/constants/Color';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { ChevronLeft } from '@/components/Icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Options from './Options';

interface ProfileHeaderProps {
  userId: Id;
  name: string;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ userId, name }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const inset = useSafeAreaInsets();
  const optionsRef = useRef<BottomSheetModal>(null);

  const isCurrentUser = user?.id === userId;

  return (
    <>
      <View style={[styles.header, { paddingTop: inset.top }]}>
        <View style={styles.leftContainer}>
          {pathname !== '/profile' && (
            <PressableOpacity onPress={router.back}>
              <ChevronLeft color={Color.BLACK} />
            </PressableOpacity>
          )}
          <HeadingText variant="h6-bold">{name}</HeadingText>
        </View>
        <View style={styles.iconContainer}>
          <PressableOpacity
            onPress={
              isCurrentUser
                ? () => router.push('/settings')
                : () => optionsRef.current?.present()
            }
          >
            {isCurrentUser ? (
              <Ionicons name="cog-outline" size={32} />
            ) : (
              <Ionicons name="ellipsis-horizontal-outline" size={32} />
            )}
          </PressableOpacity>
        </View>
      </View>
      <Options userId={userId} bottomSheetRef={optionsRef} />
    </>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.SPACING_3,
    paddingVertical: Spacing.SPACING_1,
    gap: 8,
    borderBottomWidth: 1,
    backgroundColor: Color.WHITE,
  },
  iconContainer: {
    width: 30,
    height: 30,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.SPACING_2,
  },
});
