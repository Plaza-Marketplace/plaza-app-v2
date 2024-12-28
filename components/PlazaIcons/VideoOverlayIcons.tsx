import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface VideoOverlayIconsProps {
  color: string;
}

const HeartIcon = ({ color }: VideoOverlayIconsProps) => {
  return <Ionicons name="heart" color={color} size={40} />;
};

const RatingIcon = ({ color }: VideoOverlayIconsProps) => {
  return <Ionicons name="heart" color={color} size={40} />;
};

const CommentIcon = ({ color }: VideoOverlayIconsProps) => {
  return <Ionicons name="chatbubble" color={color} size={40} />;
};

const ShareIcon = ({ color }: VideoOverlayIconsProps) => {
  return <FontAwesome name="share" color={color} size={40} />;
};

export { HeartIcon, RatingIcon, CommentIcon, ShareIcon };
