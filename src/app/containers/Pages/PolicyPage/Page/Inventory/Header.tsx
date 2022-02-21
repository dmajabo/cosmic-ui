import React from 'react';
import { ActionPart, ActionRowStyles } from 'app/containers/Pages/Shared/styles';
import H2 from 'app/components/Basic/H2';
// import Search from 'app/components/Inputs/Search';
// import SecondaryButton from 'app/components/Buttons/SecondaryButton';
// import { filterIcon } from 'app/components/SVGIcons/filter';

interface Props {}

const Header: React.FC<Props> = (props: Props) => {
  // const onSearch = (v: string) => {};
  // const onOpenFilterPanel = () => {};

  return (
    <ActionRowStyles margin="0 0 30px 0">
      <ActionPart margin="0 auto 0 0">
        <H2>Inventory</H2>
      </ActionPart>
      {/* <ActionPart margin="0 0 0 auto" justifyContent="flex-end">
        <Search withBorder styles={{ width: 'calc(100% - 130px)', height: '50px', maxWidth: '440px' }} searchQuery={''} onChange={onSearch} />
        <SecondaryButton width="120px" height="50px" onClick={onOpenFilterPanel} styles={{ margin: '0 0 0 10px' }} label="Filter" icon={filterIcon} />
      </ActionPart> */}
    </ActionRowStyles>
  );
};

export default React.memo(Header);
