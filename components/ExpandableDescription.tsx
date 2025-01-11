import { FC, useState } from 'react';
import StandardText from './Texts/StandardText';
import PressableOpacity from './Buttons/PressableOpacity';

interface ExpandableDescriptionProps {
  description: string;
  initialNumberOfLines?: number;
}

const ExpandableDescription: FC<ExpandableDescriptionProps> = ({
  description,
  initialNumberOfLines = 1,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <PressableOpacity onPress={() => setExpanded(!expanded)}>
      <StandardText numberOfLines={expanded ? undefined : initialNumberOfLines}>
        {description}
      </StandardText>
    </PressableOpacity>
  );
};

export default ExpandableDescription;
