import React from 'react';
import { ITopoRegionNode } from 'lib/hooks/Topology/models';
import StructureContainer from './StructureContainer';

interface Props {
  nodes: ITopoRegionNode[];
}

const StructuresWrapper: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props.nodes.map(it => (
        <StructureContainer key={`structureRegion${it.dataItem.id}`} region={it} />
      ))}
    </>
  );
};

export default React.memo(StructuresWrapper);
