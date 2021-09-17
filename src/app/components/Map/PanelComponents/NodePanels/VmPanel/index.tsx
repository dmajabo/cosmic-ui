import React from 'react';
import { PanelHeader, PanelTabWrapper, PanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { IVM_PanelDataNode } from 'lib/models/topology';
import MetricsTab from './MetricsTab';
import { Tab, Tabs } from '@material-ui/core';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import RoutesTab from './RoutesTab';
import PolicyTab from './PolicyTab';

interface IProps {
  dataItem: IVM_PanelDataNode;
}

const VmPanel: React.FC<IProps> = (props: IProps) => {
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
        <PanelTitle>{props.dataItem.vm.name ? props.dataItem.vm.name : props.dataItem.vm.id}</PanelTitle>
      </PanelHeader>
      <OverflowContainer>
        <TabPanel value={value} index={0}>
          <MetricsTab dataItem={props.dataItem.vm} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RoutesTab dataItem={props.dataItem.vnet} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PolicyTab dataItem={props.dataItem.vm} />
        </TabPanel>
      </OverflowContainer>
    </>
  );
};

export default React.memo(VmPanel);
