import React from 'react';
import { PanelHeader, PanelTabWrapper, PanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { Tab, Tabs } from '@mui/material';
import TabPanel from 'app/components/Tabs/TabPanel';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import InventoryTab from './Tabs/InventoryTab';
import MetricsTab from './Tabs/MetricsTab';
import PolicyTab from './Tabs/PolicyTab';

interface IProps {
  dataItem: INetworkVNetNode;
}

const VpcPanel: React.FC<IProps> = (props: IProps) => {
  const [value, setValue] = React.useState(0);
  // const [policyDisabled, setPolicyDisabled] = React.useState<boolean>(false);
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (!props.dataItem) return null;

  return (
    <>
      <PanelHeader margin="0 0 10px 0" direction="row" align="center">
        <PanelTitle margin="0" maxWidth="calc(100% - 32px)">
          VPC: {props.dataItem.name ? props.dataItem.name : props.dataItem.extId}
        </PanelTitle>
      </PanelHeader>
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
          {/* <Tab disableRipple label="Metrics" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} /> */}
          <Tab disableRipple label="Metrics" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} />
          <Tab disableRipple label="Policy" classes={{ selected: classes.tabSelected }} {...TabComponentProps(1)} className={classes.tab} />
          <Tab disableRipple label="Inventory" classes={{ selected: classes.tabSelected }} {...TabComponentProps(2)} className={classes.tab} />
        </Tabs>
      </PanelTabWrapper>

      <OverflowContainer>
        <TabPanel value={value} index={0}>
          <MetricsTab dataItem={props.dataItem} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PolicyTab dataItem={props.dataItem} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <InventoryTab dataItem={props.dataItem} />
        </TabPanel>
      </OverflowContainer>
    </>
  );
};

export default React.memo(VpcPanel);
