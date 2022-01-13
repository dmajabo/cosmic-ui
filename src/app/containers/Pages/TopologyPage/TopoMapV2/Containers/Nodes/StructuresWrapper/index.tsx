import React from 'react';
import { ITopoRegionNode } from 'lib/hooks/Topology/models';
import StructureContainer from './StructureContainer';
import StructureNode from './StructureNode';

interface Props {
  nodes: ITopoRegionNode[];
}

const StructuresWrapper: React.FC<Props> = (props: Props) => {
  if (!props.nodes || !props.nodes.length) return null;
  return (
    <>
      {props.nodes.map(it => (
        <StructureContainer key={`structureRegion${it.id}`}>
          <StructureNode dataItem={it} />
        </StructureContainer>
      ))}
    </>
  );
};

export default React.memo(StructuresWrapper);
