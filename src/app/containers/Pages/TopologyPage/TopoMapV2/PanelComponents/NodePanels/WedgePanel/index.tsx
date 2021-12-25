import React from 'react';
import { PanelHeader, PanelTitle, SubPanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import RoutesTab from './RoutesTab';
import { ITGWNode } from 'lib/hooks/Topology/models';

interface IProps {
  dataItem: ITGWNode;
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
