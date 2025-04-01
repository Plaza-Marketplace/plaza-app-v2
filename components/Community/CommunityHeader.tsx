import { Dimensions, View } from 'react-native';
import { Image } from 'expo-image';
import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import Color from '@/constants/Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OngoingEvent from './OngoingEvent';
import Radius from '@/constants/Radius';
import HeadingText from '../Texts/HeadingText';
import BodyText from '../Texts/BodyText';
import MemberCount from './MemberCount';
import ProfileIcon from '../ProfileIcon';
import PlazaButton from '../Buttons/PlazaButton';
import BackButton from '../Buttons/BackButton';
import UploadButton from '../Buttons/UploadButton';
import PressableOpacity from '../Buttons/PressableOpacity';
import { useJoinCommunity, useLeaveCommunity } from '@/hooks/routes/community';

export interface CommunityHeaderProps {
  id: Id;
  name: string;
  memberCount: number;
  isMember: boolean;
  description: string;
  iconUrl: string | null;
  bannerUrl: string | null;
  ongoingEvent: {
    id: Id;
    name: string;
    city: string;
    state: string;
    iconUrl: Url | null;
  } | null;
}

const CommunityHeader: FC<CommunityHeaderProps> = ({
  id,
  name,
  memberCount,
  isMember,
  description,
  iconUrl,
  bannerUrl,
  ongoingEvent,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { mutate: joinCommunity } = useJoinCommunity(id);
  const { mutate: leaveCommunity } = useLeaveCommunity(id);
  const insets = useSafeAreaInsets();

  const handlePress = () => {
    if (isMember) {
      leaveCommunity();
    } else {
      console.log('HELLO');
      joinCommunity();
    }
  };

  return (
    <View style={{ marginTop: -insets.top }}>
      <Image style={styles.banner} source={{ uri: bannerUrl }} />
      <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerButtons}>
          <BackButton />
          <UploadButton />
        </View>
        <View style={styles.content}>
          <View style={styles.nameContainer}>
            <ProfileIcon
              variant="community"
              size={64}
              url={iconUrl ?? undefined}
            />
            <View style={styles.memberContainer}>
              <HeadingText variant="h5">{name}</HeadingText>
              <MemberCount count={memberCount} />
            </View>
          </View>

          <PressableOpacity onPress={() => setExpanded(!expanded)}>
            <BodyText
              variant="md-medium"
              numberOfLines={expanded ? undefined : 2}
            >
              {description}
            </BodyText>
          </PressableOpacity>
          {ongoingEvent && (
            <OngoingEvent
              id={ongoingEvent.id}
              name={ongoingEvent.name}
              city={ongoingEvent.city}
              state={ongoingEvent.state}
              iconUrl={ongoingEvent.iconUrl}
            />
          )}

          <PlazaButton
            title={isMember ? 'Joined' : 'Join'}
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

const BANNER_HEIGHT = Dimensions.get('window').height * 0.25;

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    padding: 8,
    gap: 24,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  memberContainer: {
    gap: 4,
  },
  banner: {
    position: 'absolute',
    width: '100%',
    height: BANNER_HEIGHT,
    backgroundColor: Color.SURFACE_SECONDARY,
  },
  content: {
    backgroundColor: Color.NEUTRALS_WHITE,
    borderRadius: Radius.LG,
    borderColor: Color.NEUTRALS_150,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
});

export default CommunityHeader;
