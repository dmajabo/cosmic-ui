import React from 'react';
import { IVnet } from 'lib/models/topology';
import { ContentWrapper, DataField } from './styles';

interface IProps {
  dataItem: IVnet;
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
