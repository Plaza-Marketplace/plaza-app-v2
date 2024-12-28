import { TabBarIcon } from '../Navigation/TabBarIcon';

interface ActionIconsProps {
  focused: boolean;
  color: string;
}

const ExploreIcon = ({ focused, color }: ActionIconsProps) => {
  return (
    <TabBarIcon
      name={focused ? 'storefront' : 'storefront-outline'}
      color={color}
    />
  );
};

const MingleIcon = ({ focused, color }: ActionIconsProps) => {
  return (
    <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
  );
};

const UploadIcon = ({ focused, color }: ActionIconsProps) => {
  return (
    <TabBarIcon
      name={focused ? 'add-circle' : 'add-circle-outline'}
      color={color}
    />
  );
};

const InboxIcon = ({ focused, color }: ActionIconsProps) => {
  return (
    <TabBarIcon name={focused ? 'albums' : 'albums-outline'} color={color} />
  );
};

const ProfileIcon = ({ focused, color }: ActionIconsProps) => {
  return (
    <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
  );
};

export { ExploreIcon, MingleIcon, UploadIcon, InboxIcon, ProfileIcon };
