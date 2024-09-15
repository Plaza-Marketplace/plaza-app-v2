import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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
            <TabBarIcon
              name={focused ? 'storefront' : 'storefront-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(mingle)"
        options={{
          title: 'Mingle',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'people' : 'people-outline'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(upload)"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'people' : 'people-outline'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(inbox)"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'people' : 'people-outline'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'people' : 'people-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
