import React from 'react';
import { ContentWrapper, DataField } from './styles';
import { INetworkVNetwork } from 'lib/api/ApiModels/Topology/apiModels';

interface IProps {
  dataItem: INetworkVNetwork;
}
const VnetPopup: React.FC<IProps> = (props: IProps) => {
  return (
    <ContentWrapper>
      <DataField>Id: {props.dataItem.id}</DataField>
      <DataField>Name: {props.dataItem.name}</DataField>
      <DataField>ExtId: {props.dataItem.extId}</DataField>
      <DataField>Description: {props.dataItem.description}</DataField>
    </ContentWrapper>
  );
};

export default React.memo(VnetPopup);
