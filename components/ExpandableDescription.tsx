import { FC, useState } from 'react';
import StandardText from './Texts/StandardText';
import PressableOpacity from './Buttons/PressableOpacity';
import { StyleSheet } from 'react-native';

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
      <StandardText
        numberOfLines={expanded ? undefined : initialNumberOfLines}
        color={textColor}
        style={shadow ? styles.shdaowContainer : {}}
      >
        {description}
      </StandardText>
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
