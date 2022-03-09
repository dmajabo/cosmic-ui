import { Tab, Tabs } from '@mui/material';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { ITopoAppNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { useState } from 'react';
import { PanelHeader, PanelTabWrapper, PanelTitle } from '../../styles';
import SiteTable from './SiteTable';
import { TrafficTab } from './TrafficTab';

interface ApplicationPanelProps {
  dataItem: ITopoAppNode;
}

export const ApplicationPanel: React.FC<ApplicationPanelProps> = props => {
  const [value, setValue] = useState(0);
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue);

  const { topology } = useTopologyV2DataContext();
  const siteNames = topology.topologTrafficSegmentsApiResponse.topology.links
    .filter(link => link.destinationId === props.dataItem.dataItem?.nodeId)
    .map(link => {
      return topology.sites[link.sourceId]?.dataItem?.name || '';
    })
    .filter(name => name);

  return (
    <>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>{props.dataItem.dataItem.name ? props.dataItem.dataItem.name : props.dataItem.dataItem.extId}</PanelTitle>
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
          <Tab disableRipple label="Traffic" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} />
          <Tab disableRipple label="Sites" classes={{ selected: classes.tabSelected }} {...TabComponentProps(1)} className={classes.tab} />
        </Tabs>
      </PanelTabWrapper>
      <OverflowContainer>
        <TabPanel value={value} index={0}>
          <TrafficTab dataItem={props.dataItem} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SiteTable showLoader={false} data={siteNames} />
        </TabPanel>

      </OverflowContainer>
    </>
  );
};
