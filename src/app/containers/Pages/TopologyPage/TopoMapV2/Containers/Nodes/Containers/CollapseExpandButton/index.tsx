import React from 'react';
import { CollapseExpandState } from 'lib/models/general';
interface Props {
  id: string;
  x: number | string;
  y: number | string;
  isCollapse?: boolean;
  onClick: (state: CollapseExpandState) => void;
}

const CollapseExpandButton: React.FC<Props> = (props: Props) => {
  const onCollaspse = () => {
    props.onClick(CollapseExpandState.COLLAPSE);
  };
  const onExpand = () => {
    props.onClick(CollapseExpandState.EXPAND);
  };
  if (props.isCollapse) {
    return <use id={props.id} href="#collapseButton" transform={`translate(${props.x}, ${props.y})`} onClick={onExpand} className="collapseExpandButton" pointerEvents="all" />;
  }
  return <use id={props.id} href="#expandButton" transform={`translate(${props.x}, ${props.y})`} onClick={onCollaspse} className="collapseExpandButton" pointerEvents="all" />;
};

export default React.memo(CollapseExpandButton);
