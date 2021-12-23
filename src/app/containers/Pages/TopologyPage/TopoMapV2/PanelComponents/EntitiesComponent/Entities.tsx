import React from 'react';
import { PanelBarContent, PanelHeader, PanelTitle } from '../styles';
import EntitiesItem from './EntitiesItem';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { IEntity } from 'lib/models/entites';

interface IProps {}

const Entities: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();

  const onEntityChange = (_item: IEntity, _selected: boolean) => {
    topology.onSelectEntity(_item, _selected);
  };

  return (
    <>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>Entities</PanelTitle>
      </PanelHeader>
      <OverflowContainer>
        <PanelBarContent>
          {topology?.entityTypes.map(entity => (
            <EntitiesItem key={`key${entity.id}`} item={entity} onCheckedChange={onEntityChange} />
          ))}
        </PanelBarContent>
      </OverflowContainer>
    </>
  );
};

export default React.memo(Entities);
