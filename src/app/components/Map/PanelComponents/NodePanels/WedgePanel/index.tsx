import React from 'react';
import { PanelHeader, PanelTitle, SubPanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { IWedgeNode } from 'lib/models/topology';
import RoutesTab from './RoutesTab';

interface IProps {
  dataItem: IWedgeNode;
}

const WedgePanel: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>{props.dataItem.name ? props.dataItem.name : props.dataItem.extId}</PanelTitle>
        {props.dataItem.description && <SubPanelTitle>{props.dataItem.description}</SubPanelTitle>}
      </PanelHeader>
      <OverflowContainer>
        <RoutesTab dataItem={props.dataItem} />
      </OverflowContainer>
    </>
  );
};

export default React.memo(WedgePanel);
