import React from 'react';
import { IDevice } from 'lib/models/topology';
import { ContentWrapper, DataField } from './styles';

interface IProps {
  dataItem: IDevice;
}
const DevicePopup: React.FC<IProps> = (props: IProps) => {
  return (
    <ContentWrapper>
      <DataField>Id: {props.dataItem.id}</DataField>
      <DataField>Name: {props.dataItem.name}</DataField>
      <DataField>ExtId: {props.dataItem.extId}</DataField>
      <DataField>Type: {props.dataItem.type}</DataField>
      <DataField>Serial: {props.dataItem.serial}</DataField>
      <DataField>Model: {props.dataItem.model}</DataField>
      <DataField>NetworkId: {props.dataItem.networkId}</DataField>
      <DataField>PublicIp: {props.dataItem.publicIp}</DataField>
      <DataField>PrivateIp: {props.dataItem.privateIp}</DataField>
      <DataField>Description: {props.dataItem.description}</DataField>
    </ContentWrapper>
  );
};

export default React.memo(DevicePopup);
