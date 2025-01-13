import Ionicons from '@expo/vector-icons/Ionicons';

const ExitButton = () => {
  return <Ionicons name="close-outline" size={32} />;
};

const BackButton = ({ color, size = 32 }: { color: string; size?: number }) => {
  return <Ionicons name="arrow-back" size={size} color={color} />;
};

export { ExitButton, BackButton };
