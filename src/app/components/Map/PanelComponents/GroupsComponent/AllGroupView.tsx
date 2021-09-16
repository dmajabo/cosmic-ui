import React from 'react';
import TopologyGroup from '../TopologyGroup';
import { ITopologyGroup } from 'lib/models/topology';

interface IProps {
  groups: ITopologyGroup[];
  onSelectGroup: (_group: ITopologyGroup) => void;
  onDublicateGroup: (_group: ITopologyGroup) => void;
  onDeleteGroup: (_group: ITopologyGroup) => void;
}

const AllGroupView: React.FC<IProps> = (props: IProps) => {
  const onSelectGroup = (_group: ITopologyGroup) => {
    props.onSelectGroup(_group);
  };

  const onDublicateGroup = (_group: ITopologyGroup) => {
    props.onDublicateGroup(_group);
  };

  const onDeleteGroup = (_group: ITopologyGroup) => {
    props.onDeleteGroup(_group);
  };

  return (
    <>
      {props.groups.map(group => (
        <TopologyGroup key={`topologygroup${group.id}`} group={group} onSelectGroup={onSelectGroup} onDublicateGroup={onDublicateGroup} onDeleteGroup={onDeleteGroup} />
      ))}
    </>
  );
};

export default React.memo(AllGroupView);
