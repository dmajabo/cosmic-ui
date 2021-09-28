import React from 'react';
import { ITopologyGroup } from 'lib/models/topology';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { NODES_CONSTANTS } from 'app/components/Map/model';
import { Label, WrapStyles } from './style';
import { applicationGroupIcon } from 'app/components/SVGIcons/topologyIcons/applicationGroup';

interface IProps {
  dataItem: ITopologyGroup;
  onClick: (group: ITopologyGroup) => void;
}
const ApplicationGroup: React.FC<IProps> = (props: IProps) => {
  const onClick = () => {
    props.onClick(props.dataItem);
  };
  return (
    <WrapStyles title={props.dataItem.name} onClick={onClick}>
      <IconWrapper icon={applicationGroupIcon} width={`${NODES_CONSTANTS.APP_GROUP.iconSize}px`} height={`${NODES_CONSTANTS.APP_GROUP.iconSize}px`} />
      <Label>{props.dataItem.name}</Label>
    </WrapStyles>
  );
};

export default React.memo(ApplicationGroup);
