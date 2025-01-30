import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import Color from '@/constants/Color';
import HeaderText from '../Texts/HeaderText';
import StandardText from '../Texts/StandardText';
import CommunityIcon from '../ProfileIcons/CommunityIcon';
import PressableOpacity from '../Buttons/PressableOpacity';
import { BackButton } from '../PlazaIcons/ActionIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';

interface CommunityHeaderProps {
  community: Community;
}

const CommunityHeader: FC<CommunityHeaderProps> = ({ community }) => {
  const [expanded, setExpanded] = useState(false);
  const { name, memberCount, description, iconUrl, backgroundUrl } = community;
  const inset = useSafeAreaInsets();
  return (
    <View style={styles.headerContainer}>
      <PressableOpacity
        style={[styles.backButton, { top: inset.top }]}
        onPress={() => router.back()}
      >
        <BackButton color={Color.GREY_100} size={20} />
        {/* <Text>Back</Text> */}
      </PressableOpacity>
      <Image style={styles.banner} source={{ uri: backgroundUrl }} />
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={styles.iconContainer}>
            <CommunityIcon
              size={64}
              url={iconUrl}
              borderStyle={styles.iconBorder}
            />
          </View>

          <View style={{ marginLeft: 70, padding: 5 }}>
            <HeaderText>{name}</HeaderText>
            <StandardText color={Color.TEXT_SUB_PRIMARY}>
              {memberCount} members
            </StandardText>
          </View>
        </View>

        <Pressable onPress={() => setExpanded(!expanded)}>
          <StandardText numberOfLines={expanded ? undefined : 2}>
            {description}
          </StandardText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Color.SURFACE_PRIMARY,
    position: 'relative',
  },
  banner: {
    width: '100%',
    height: 130,
    backgroundColor: Color.SURFACE_SECONDARY,
  },
  content: {
    gap: 8,
    paddingHorizontal: 16,
  },
  iconContainer: {
    position: 'absolute',
    bottom: -5,
  },
  iconBorder: {
    borderWidth: 4,
    borderRadius: 8,
    borderColor: Color.BORDER_TERTIARY,
  },
  backButton: {
    position: 'absolute',
    padding: 10,
    left: Spacing.SPACING_3,
    backgroundColor: '#00000088',
    borderRadius: 99,
    zIndex: 99,
  },
});

export default CommunityHeader;
