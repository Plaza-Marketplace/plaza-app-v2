import { Image, Pressable, View } from 'react-native';
import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import Color from '@/constants/Color';
import HeaderText from '../Texts/HeaderText';
import Community from '@/models/community';
import StandardText from '../Texts/StandardText';
import CommunityIcon from '../ProfileIcons/CommunityIcon';

interface CommunityHeaderProps {
  community: Community;
}

const CommunityHeader: FC<CommunityHeaderProps> = ({ community }) => {
  const [expanded, setExpanded] = useState(false);
  const { name, memberCount, description, iconUrl, backgroundUrl } = community;

  return (
    <View style={styles.headerContainer}>
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
  },
  banner: {
    width: '100%',
    height: 104,
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
});

export default CommunityHeader;
