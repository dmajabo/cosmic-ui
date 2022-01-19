import React from 'react';
import { Label, Wrapper } from './styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';

interface IProps {
  onOpenEditorSegment: () => void;
}

const EmptySegmentView: React.FC<IProps> = (props: IProps) => {
  const onOpenEditorSegment = () => {
    props.onOpenEditorSegment();
  };

  return (
    <Wrapper>
      <Label margin="0 auto 12px auto" color="var(--_primaryTextColor)">
        There is no segments yet
      </Label>
      <Label fontWeight="normal" margin="0 auto 40px auto" fontSize="14px" color="var(--_disabledTextColor)">
        To add new segment click on the button below
      </Label>
      <SecondaryButton label="create segment" icon={addIcon} onClick={onOpenEditorSegment} />
    </Wrapper>
  );
};

export default React.memo(EmptySegmentView);
