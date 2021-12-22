import React from 'react';
import { IDeviceNode, INetworkGroupNode } from 'lib/models/topology';
import Device from '../../Device';
import DeviceLink from 'app/containers/Pages/TopologyPage/TopoMapV2/Containers/Links/DeviceLink';
import { ContainerWrapper } from './styles';
import NodeName from '../../../Shared/NodeName';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';

interface IProps {
  dataItem: INetworkGroupNode;
  className?: string;
  onClickDevice: (dev: IDeviceNode) => void;
}

const GroupDevicesContainer: React.FC<IProps> = (props: IProps) => {
  const onClickDevice = (dev: IDeviceNode) => {
    props.onClickDevice(dev);
  };

  return (
    <ContainerWrapper className={props.className}>
      <circle pointerEvents="none" r={props.dataItem.r} fill="var(--_groupDevicesBg)" cx={-props.dataItem.r + NODES_CONSTANTS.NETWORK_GROUP.r} cy={NODES_CONSTANTS.NETWORK_GROUP.r} />
      <g>
        {props.dataItem.links.map(link => (
          <DeviceLink
            key={`${link.id}`}
            id={link.id}
            type={link.type}
            targetId={link.targetId}
            sourceId={link.sourceId}
            targetType={link.targetType}
            sourceType={link.sourceType}
            x1={link.sourceCoord.x}
            y1={link.sourceCoord.y}
            x2={link.targetCoord.x}
            y2={link.targetCoord.y}
          />
        ))}
        {props.dataItem.devices.map((device, index) => (
          <Device key={`${device.id}`} dataItem={device} disabled onClickDevice={onClickDevice} />
        ))}
      </g>
      <NodeName styles={{ maxHeight: '30px', overflow: 'hidden' }} name={props.dataItem.name} dx={-props.dataItem.r} dy={-props.dataItem.r + NODES_CONSTANTS.NETWORK_GROUP.r + 10} />
    </ContainerWrapper>
  );
};

export default React.memo(GroupDevicesContainer);
