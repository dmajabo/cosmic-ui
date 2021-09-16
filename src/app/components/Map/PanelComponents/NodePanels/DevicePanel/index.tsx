import React from 'react';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { IDeviceNode } from 'lib/models/topology';
// import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { Tabs, Tab } from '@material-ui/core';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import MetricsTab from './MetricsTab';
import TabPanel from 'app/components/Tabs/TabPanel';
import RoutesTab from './RoutesTab';
import PolicyTab from './PolicyTab';
import { PanelTabWrapper, PanelHeader, PanelTitle } from '../../styles';

interface IProps {
  dataItem: IDeviceNode;
}

const DevicePanel: React.FC<IProps> = (props: IProps) => {
  // const { topology } = useTopologyDataContext();
  const [value, setValue] = React.useState(0);
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <PanelTabWrapper>
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabs}
          TabIndicatorProps={{
            style: {
              background: 'var(--_hoverButtonBg)',
              boxShadow: '0px 4px 7px rgba(67, 127, 236, 0.15)',
              borderRadius: '100px',
            },
          }}
        >
          <Tab label="Metrics" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} />
          <Tab label="Routes" classes={{ selected: classes.tabSelected }} {...TabComponentProps(1)} className={classes.tab} />
          <Tab label="Policy" classes={{ selected: classes.tabSelected }} {...TabComponentProps(2)} className={classes.tab} />
        </Tabs>
      </PanelTabWrapper>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>{props.dataItem.name ? props.dataItem.name : props.dataItem.id}</PanelTitle>
      </PanelHeader>
      <OverflowContainer>
        <TabPanel value={value} index={0}>
          <MetricsTab dataItem={props.dataItem} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RoutesTab dataItem={props.dataItem} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PolicyTab dataItem={props.dataItem} />
        </TabPanel>
      </OverflowContainer>
    </>
  );
};

export default React.memo(DevicePanel);
