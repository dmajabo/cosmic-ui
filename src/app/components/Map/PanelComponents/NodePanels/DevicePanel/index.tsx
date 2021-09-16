import React from 'react';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { IDeviceNode } from 'lib/models/topology';
// import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import MetricsTab from './MetricsTab';
import { PanelHeader, PanelTitle } from '../../styles';
import { PanelContent } from 'app/components/Basic/PanelBar/styles';

interface IProps {
  dataItem: IDeviceNode;
}

const DevicePanel: React.FC<IProps> = (props: IProps) => {
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

export default React.memo(DevicePanel);
