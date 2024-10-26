import { Image, View } from 'react-native';
import React, { FC } from 'react';
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
  const { name, memberCount, description, iconUrl, backgroundUrl } = community;
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.banner} source={{ uri: backgroundUrl }} />
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            height: '50%',
          }}
        >
          <View style={{ position: 'relative' }}>
            <View style={styles.iconContainer}>
              <CommunityIcon
                size={64}
                url={iconUrl}
                borderStyle={styles.iconBorder}
              />
            </View>
          </View>

          <View style={{ marginLeft: 70, padding: 5 }}>
            <HeaderText>{name}</HeaderText>
            <StandardText color={Color.TEXT_SUB_PRIMARY}>
              {memberCount} members
            </StandardText>
          </View>
        </View>

        <StandardText numberOfLines={2}>{description}</StandardText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 175,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  banner: {
    flex: 1,
    backgroundColor: 'grey',
  },
  content: {
    flex: 1,
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
    borderColor: 'white',
  },
});

export default CommunityHeader;
