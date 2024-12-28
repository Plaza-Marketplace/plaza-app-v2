import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/Navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  ExploreIcon,
  InboxIcon,
  MingleIcon,
  UploadIcon,
  ProfileIcon,
} from '@/components/PlazaIcons/BottomNavBarIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(marketplace)"
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color, focused }) => (
            <ExploreIcon color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="(mingle)"
        options={{
          title: 'Mingle',
          tabBarIcon: ({ color, focused }) => (
            <MingleIcon color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="(upload)"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color, focused }) => (
            <UploadIcon color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="(inbox)"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, focused }) => (
            <InboxIcon color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
