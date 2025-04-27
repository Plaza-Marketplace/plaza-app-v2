import { FC, useState } from 'react';
import PressableOpacity from './Buttons/PressableOpacity';
import { StyleSheet } from 'react-native';
import BodyText from './Texts/BodyText';

interface ExpandableDescriptionProps {
  description: string;
  initialNumberOfLines?: number;
  textColor?: string;
  shadow?: boolean;
}

const ExpandableDescription: FC<ExpandableDescriptionProps> = ({
  description,
  initialNumberOfLines = 1,
  textColor = 'black',
  shadow = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <PressableOpacity onPress={() => setExpanded(!expanded)}>
      <BodyText
        variant="md"
        numberOfLines={expanded ? undefined : initialNumberOfLines}
        color={textColor}
        style={shadow ? styles.shdaowContainer : {}}
      >
        {description}
      </BodyText>
    </PressableOpacity>
  );
};

export default ExpandableDescription;

const styles = StyleSheet.create({
  shdaowContainer: {
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
});
