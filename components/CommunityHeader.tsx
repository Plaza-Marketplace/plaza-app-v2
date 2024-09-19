import { View, Text } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import HeaderText from './Texts/HeaderText';
import CaptionText from './Texts/CaptionText';
import PlazaText from './Texts/PlazaText';

interface CommunityHeaderProps {
  name: string;
  memberCount: number;
  description: string;
  icon: string;
  background: string;
}

const CommunityHeader = (props: CommunityHeaderProps) => {
  const { name, memberCount, description, icon, background } = props;
  return (
    <View style={styles.headerContainer}>
      <View style={styles.banner}></View>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            height: '50%',
          }}
        >
          <View style={{ position: 'relative' }}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'grey',
                width: 75,
                height: 75,
                bottom: 0,
                borderColor: 'white',
                borderWidth: 5,
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{ marginLeft: 75, padding: 10 }}>
            <HeaderText>{name}</HeaderText>
            <CaptionText>{memberCount}</CaptionText>
          </View>
        </View>

        <View style={{ height: '50%', paddingVertical: 10 }}>
          <PlazaText>{description}</PlazaText>
        </View>
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
    paddingLeft: 20,
  },
});

export default CommunityHeader;
