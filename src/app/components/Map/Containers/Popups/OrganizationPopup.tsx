import React from 'react';
import { IOrganization } from 'lib/models/topology';
import { ContentWrapper, DataField } from './styles';

interface IProps {
  dataItem: IOrganization;
}
const OrganizationPopup: React.FC<IProps> = (props: IProps) => {
  return (
    <ContentWrapper>
      <DataField>Id: {props.dataItem.id}</DataField>
      <DataField>Name: {props.dataItem.name}</DataField>
      <DataField>ExtId: {props.dataItem.extId}</DataField>
      <DataField>ExtType: {props.dataItem.extType}</DataField>
      <DataField>ExtUrl: {props.dataItem.extUrl}</DataField>
      <DataField>Vendor Type: {props.dataItem.vendorType}</DataField>
      <DataField>Description: {props.dataItem.description}</DataField>
    </ContentWrapper>
  );
};

export default React.memo(OrganizationPopup);
