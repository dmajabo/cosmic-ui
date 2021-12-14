import React from 'react';
import Search from 'app/components/Inputs/Search';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import { ActionPart, ActionRowStyles } from '../../Shared/styles';
import { filterIcon } from 'app/components/SVGIcons/filter';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';

interface Props {
  searchQuery: string;
  onCreateEdge: () => void;
  onOpenFilterPanel: () => void;
  handleSearchChange: (v: string | null) => void;
}

const Header: React.FC<Props> = (props: Props) => {
  return (
    <ActionRowStyles>
      <ActionPart width="50%" maxWidth="440px" minWidth="200px" margin="0 auto 0 0">
        <Search styles={{ width: '100%', height: '50px' }} searchQuery={props.searchQuery} onChange={props.handleSearchChange} />
      </ActionPart>
      <ActionPart width="50%" margin="0 0 0 auto" justifyContent="flex-end">
        <SecondaryButton height="50px" onClick={props.onOpenFilterPanel} styles={{ margin: '0 20px 0 0' }} withoutBorder label="Filter" icon={filterIcon} />
        <PrimaryButton height="50px" label="Create Transit" icon={addIcon} onClick={props.onCreateEdge} />
      </ActionPart>
    </ActionRowStyles>
  );
};

export default React.memo(Header);
