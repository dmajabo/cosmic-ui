import React from 'react';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import Segment from './Segment';

interface IProps {
  segments: ITopologyGroup[];
  onSelectSegment: (_group: ITopologyGroup) => void;
  onDublicateSegment: (_group: ITopologyGroup) => void;
  onDeleteSegment: (_group: ITopologyGroup) => void;
}

const AllSegmentsView: React.FC<IProps> = (props: IProps) => {
  const onSelectSegment = (_group: ITopologyGroup) => {
    props.onSelectSegment(_group);
  };

  const onDublicateSegment = (_group: ITopologyGroup) => {
    props.onDublicateSegment(_group);
  };

  const onDeleteSegment = (_group: ITopologyGroup) => {
    props.onDeleteSegment(_group);
  };

  return (
    <>
      {props.segments.map(s => (
        <Segment key={`topologygroup${s.id}`} segment={s} onSelectSegment={onSelectSegment} onDublicateSegment={onDublicateSegment} onDeleteSegment={onDeleteSegment} />
      ))}
    </>
  );
};

export default React.memo(AllSegmentsView);
