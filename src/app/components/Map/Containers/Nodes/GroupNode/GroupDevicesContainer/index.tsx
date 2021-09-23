import React from 'react';
import { ContainerWrapper } from './styles';
import { IDeviceNode, INetworkGroupNode } from 'lib/models/topology';
import Device from '../../Device';
import DeviceLink from 'app/components/Map/Containers/Links/DeviceLink';

interface IProps {
  dataItem: INetworkGroupNode;
  className: string;
  onClickDevice: (dev: IDeviceNode) => void;
}

const GroupDevicesContainer: React.FC<IProps> = (props: IProps) => {
  const onClickDevice = (dev: IDeviceNode) => {
    props.onClickDevice(dev);
  };
  return (
    <ContainerWrapper className={props.className} x={props.dataItem.x} y={props.dataItem.y}>
      <circle pointerEvents="none" r={props.dataItem.r} fill="var(--_groupDevicesBg)" cx="-100" cy="50" />
      <g>
        {props.dataItem.links.map(link => (
          <DeviceLink key={`${link.id}`} dataItem={link} />
        ))}
        {props.dataItem.devices.map((device, index) => (
          <Device key={`${device.id}`} dataItem={device} disabled onClickDevice={onClickDevice} />
        ))}
      </g>
    </ContainerWrapper>
  );
};

export default React.memo(GroupDevicesContainer);
