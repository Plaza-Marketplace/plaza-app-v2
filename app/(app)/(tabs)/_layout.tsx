import { Tabs } from 'expo-router';
import React from 'react';
// import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  ExploreIcon,
  InboxIcon,
  MingleIcon,
  UploadIcon,
  ProfileIcon,
} from '@/components/PlazaIcons/BottomNavBarIcons';
import { Platform } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <BottomSheetModalProvider>
      <Tabs
        screenOptions={{
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
            title: 'Plaza',
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
    </BottomSheetModalProvider>
  );
}
