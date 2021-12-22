import React from 'react';
import { ContentWrapper, DataField } from './styles';
import { INetworkwEdge } from 'lib/api/ApiModels/Topology/apiModels';

interface IProps {
  dataItem: INetworkwEdge;
}
const WedgePopup: React.FC<IProps> = (props: IProps) => {
  return (
    <ContentWrapper>
      <DataField>Id: {props.dataItem.id}</DataField>
      <DataField>Name: {props.dataItem.name}</DataField>
      <DataField>ExtId: {props.dataItem.extId}</DataField>
      <DataField>Vnetkey: {props.dataItem.vnetkey}</DataField>
      <DataField>Description: {props.dataItem.description}</DataField>
    </ContentWrapper>
  );
};

export default React.memo(WedgePopup);
