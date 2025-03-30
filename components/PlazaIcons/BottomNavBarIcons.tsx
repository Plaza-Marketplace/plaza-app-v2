import { Create, Inbox, Market, Plaza, Profile, Upload } from '../Icons';
import { TabBarIcon } from '../Navigation/TabBarIcon';

interface ActionIconsProps {
  focused: boolean;
  color: string;
}

const ExploreIcon = ({ focused, color }: ActionIconsProps) => {
  return <Market color={color} />;
};

const MingleIcon = ({ focused, color }: ActionIconsProps) => {
  return <Plaza color={color} />;
};

const UploadIcon = ({ focused, color }: ActionIconsProps) => {
  return <Create color={color} />;
};

const InboxIcon = ({ focused, color }: ActionIconsProps) => {
  return <Inbox color={color} />;
};

const ProfileIcon = ({ focused, color }: ActionIconsProps) => {
  return <Profile color={color} />;
};

export { ExploreIcon, MingleIcon, UploadIcon, InboxIcon, ProfileIcon };
