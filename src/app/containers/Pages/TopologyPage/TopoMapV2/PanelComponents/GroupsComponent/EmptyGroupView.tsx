import React from 'react';
import { Label, Wrapper } from './styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';

interface IProps {
  onOpenEditorGroup: () => void;
}

const EmptyGroupView: React.FC<IProps> = (props: IProps) => {
  const onOpenEditorGroup = () => {
    props.onOpenEditorGroup();
  };

  return (
    <Wrapper>
      <Label margin="0 auto 12px auto" color="var(--_primaryColor)">
        There is no groups yet
      </Label>
      <Label fontWeight="normal" margin="0 auto 40px auto" fontSize="14px" color="var(--_disabledTextColor)">
        To add new group click on the button below
      </Label>
      <SecondaryButton label="create group" icon={addIcon} onClick={onOpenEditorGroup} />
    </Wrapper>
  );
};

export default React.memo(EmptyGroupView);
