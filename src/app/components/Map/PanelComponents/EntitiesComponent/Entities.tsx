import React from 'react';
import { PanelBarContent, PanelHeader, PanelTitle } from '../styles';
import Search from 'app/components/Inputs/Search';
import EntitiesItem from './EntitiesItem';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';

interface IProps {}

const Entities: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();

  const onSearch = (_value: string) => {};

  return (
    <>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>Entities</PanelTitle>
        <Search searchQuery={''} onChange={onSearch} disabled={false} />
      </PanelHeader>
      <OverflowContainer>
        <PanelBarContent>
          {topology?.entityTypes.map(entity => (
            <EntitiesItem key={`key${entity.id}`} item={entity} />
          ))}
        </PanelBarContent>
      </OverflowContainer>
    </>
  );
};

export default React.memo(Entities);
