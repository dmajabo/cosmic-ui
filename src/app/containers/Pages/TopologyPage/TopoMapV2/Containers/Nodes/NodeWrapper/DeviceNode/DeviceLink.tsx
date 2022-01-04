import React from 'react';
import { IDeviceLink } from './helper';
interface Props {
  data: IDeviceLink;
}

const DeviceLink: React.FC<Props> = ({ data }) => {
  return <line className="deviceLink" stroke="#BBCDE7" x1={data.x1} y1={data.y1} x2={data.x2} y2={data.y2} />;
};

export default React.memo(DeviceLink);
