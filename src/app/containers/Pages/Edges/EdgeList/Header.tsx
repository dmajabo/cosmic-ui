import React from 'react';
import Search from 'app/components/Inputs/Search';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import { ActionPart, ActionRowStyles } from '../../Shared/styles';

interface Props {
  searchQuery: string;
  onCreateEdge: () => void;
  handleSearchChange: (v: string | null) => void;
}

const Header: React.FC<Props> = (props: Props) => {
  const onCreateEdge = () => {
    props.onCreateEdge();
  };

  return (
    <ActionRowStyles>
      <ActionPart width="50%" maxWidth="440px" minWidth="200px" margin="0 auto 0 0">
        <Search styles={{ width: '100%' }} searchQuery={props.searchQuery} onChange={props.handleSearchChange} />
      </ActionPart>
      <ActionPart width="50%" margin="0 0 0 auto" justifyContent="flex-end">
        <PrimaryButton label="Create new" icon={addIcon} onClick={onCreateEdge} />
      </ActionPart>
    </ActionRowStyles>
  );
};

export default React.memo(Header);
