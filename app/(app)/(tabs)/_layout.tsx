import { Tabs } from 'expo-router';
import React from 'react';
import {
  ExploreIcon,
  InboxIcon,
  MingleIcon,
  UploadIcon,
  ProfileIcon,
} from '@/components/PlazaIcons/BottomNavBarIcons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Color from '@/constants/Color';

export default function TabLayout() {
  return (
    <BottomSheetModalProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Color.PRIMARY_DEFAULT,
        }}
      >
        <Tabs.Screen
          name="(marketplace)"
          options={{
            title: 'Market',
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
            title: 'Create',
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
          name="profile"
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
