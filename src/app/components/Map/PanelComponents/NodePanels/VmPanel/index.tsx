import React from 'react';
import { PanelHeader, PanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { IVm } from 'lib/models/topology';
import MetricsTab from './MetricsTab';
import { PanelContent } from 'app/components/Basic/PanelBar/styles';

interface IProps {
  dataItem: IVm;
}

const VmPanel: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>{props.dataItem.name ? props.dataItem.name : props.dataItem.id}</PanelTitle>
      </PanelHeader>
      <OverflowContainer>
        <PanelContent>
          <MetricsTab dataItem={props.dataItem} />
        </PanelContent>
      </OverflowContainer>
    </>
  );
};

export default React.memo(VmPanel);
