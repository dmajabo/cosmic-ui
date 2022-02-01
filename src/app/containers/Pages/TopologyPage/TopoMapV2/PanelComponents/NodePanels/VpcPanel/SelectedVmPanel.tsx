import React from 'react';
import { PanelHeader, PanelTabWrapper, PanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { Tab, Tabs } from '@mui/material';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import { returnArrow } from 'app/components/SVGIcons/arrows';
import IconButton from 'app/components/Buttons/IconButton';
// import MetricsTab from './VmTabs/MetricsTab';
import RoutesTab from './VmTabs/RoutesTab';
import PolicyTab from './VmTabs/PolicyTab';
import { INetworkVM } from 'lib/api/ApiModels/Topology/apiModels';

interface IProps {
  vnetExtId: string;
  dataItem: INetworkVM;
  onReturnBack: () => void;
}

const SelectedItemPanel: React.FC<IProps> = (props: IProps) => {
  const [value, setValue] = React.useState(0);
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const onReturn = () => {
    props.onReturnBack();
  };

  return (
    <>
      <PanelHeader direction="row" align="center">
        <IconButton styles={{ margin: '0 12px 0 0', width: '40px', height: '40px', flexShrink: 0 }} icon={returnArrow} title="Back" onClick={onReturn} />
        <PanelTitle maxWidth="calc(100% - 32px)">VM: {props.dataItem.name ? props.dataItem.name : props.dataItem.extId}</PanelTitle>
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
          <Tab disableRipple label="Routes" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} />
          <Tab disableRipple label="Policy" classes={{ selected: classes.tabSelected }} {...TabComponentProps(1)} className={classes.tab} />
        </Tabs>
      </PanelTabWrapper>
      <OverflowContainer>
        {/* <TabPanel value={value} index={0}>
          <MetricsTab dataItem={props.dataItem} />
        </TabPanel> */}
        <TabPanel value={value} index={0}>
          <RoutesTab extId={props.vnetExtId} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PolicyTab dataItem={props.dataItem} />
        </TabPanel>
      </OverflowContainer>
    </>
  );
};

export default React.memo(SelectedItemPanel);
