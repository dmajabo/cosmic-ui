import React, { useState } from 'react';
import { PanelHeader, PanelTabWrapper, PanelTitle, SubPanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { IWedgeNode } from 'lib/models/topology';
import RoutesTab from './RoutesTab';
import { Tab, Tabs } from '@mui/material';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import TabPanel from 'app/components/Tabs/TabPanel';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import MetricsTab from './MetricsTab';

interface WedgePanelProps {
  readonly dataItem: IWedgeNode;
}

const WedgePanel: React.FC<WedgePanelProps> = (props: WedgePanelProps) => {
  const [value, setValue] = useState(0);
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue);

  return (
    <>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>{props.dataItem.name ? props.dataItem.name : props.dataItem.extId}</PanelTitle>
        {props.dataItem.description && <SubPanelTitle>{props.dataItem.description}</SubPanelTitle>}
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
          <Tab label="Metrics" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} />
          <Tab label="Routes" classes={{ selected: classes.tabSelected }} {...TabComponentProps(1)} className={classes.tab} />
        </Tabs>
      </PanelTabWrapper>
      <OverflowContainer>
        <TabPanel value={value} index={0}>
          <MetricsTab dataItem={props.dataItem} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RoutesTab dataItem={props.dataItem} />
        </TabPanel>
      </OverflowContainer>
    </>
  );
};

export default React.memo(WedgePanel);
