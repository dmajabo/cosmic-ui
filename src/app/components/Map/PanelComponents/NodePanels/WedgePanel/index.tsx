import React from 'react';
import { PanelHeader, PanelTabWrapper, PanelTitle, SubPanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { IWedgeNode } from 'lib/models/topology';
import { Tabs, Tab } from '@material-ui/core';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import RoutesTab from './RoutesTab';
import PolicyTab from './PolicyTab';

interface IProps {
  dataItem: IWedgeNode;
}

const WedgePanel: React.FC<IProps> = (props: IProps) => {
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
          <Tab label="Routes" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} />
          <Tab label="Policy" classes={{ selected: classes.tabSelected }} {...TabComponentProps(1)} className={classes.tab} />
        </Tabs>
      </PanelTabWrapper>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>{props.dataItem.name ? props.dataItem.name : props.dataItem.extId}</PanelTitle>
        {props.dataItem.description && <SubPanelTitle>{props.dataItem.description}</SubPanelTitle>}
      </PanelHeader>
      <OverflowContainer>
        <TabPanel value={value} index={0}>
          <RoutesTab dataItem={props.dataItem} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PolicyTab dataItem={props.dataItem} />
        </TabPanel>
      </OverflowContainer>
    </>
  );
};

export default React.memo(WedgePanel);
