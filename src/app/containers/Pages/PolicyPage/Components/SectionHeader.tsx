import React from 'react';
import { SectionHeaderWrapper, SectionName } from './styles';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';

interface Props {
  label: string;
  onCreate: () => void;
}

const SectionHeader: React.FC<Props> = (props: Props) => {
  return (
    <SectionHeaderWrapper>
      <SectionName>{props.label}</SectionName>
      <SecondaryButton icon={addIcon} label="Add segment" onClick={props.onCreate} styles={{ margin: 'auto 0 auto auto' }} />
    </SectionHeaderWrapper>
  );
};

export default React.memo(SectionHeader);
