import React from 'react';
import { IWedge } from 'lib/models/topology';
import { ContentWrapper, DataField } from './styles';

interface IProps {
  dataItem: IWedge;
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
