import { Tab, Tabs } from '@mui/material';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { AppNodeType } from 'lib/api/ApiModels/Topology/apiModels';
import { ITopoAppNode } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { useState } from 'react';
import { PanelHeader, PanelTabWrapper, PanelTitle } from '../../styles';
import MemberTable, { MemberRow } from './MemberTable';
import SiteTable from './SiteTable';

interface ApplicationPanelProps {
  dataItem: ITopoAppNode;
}

export const ApplicationPanel: React.FC<ApplicationPanelProps> = props => {
  const [value, setValue] = useState(0);
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue);

  const { topology } = useTopologyV2DataContext();
  const siteNames = topology.appAccessApiResponse.siteAccessInfo.links
    .filter(link => link.destinationId === props.dataItem.dataItem.nodeId)
    .map(link => {
      return topology.sites[link.sourceId].dataItem.name;
    });

  const node = topology.appAccessApiResponse.siteAccessInfo.nodes.find(node => node.nodeId === props.dataItem.dataItem.nodeId && node.nodeType === AppNodeType.Application);
  const members: MemberRow[] = node
    ? node.members
        .map(member => {
          if (node.nodeType !== AppNodeType.Application) {
            return undefined;
          }
          return {
            activeTime: member.appNodeData.activeTime,
            clients: member.appNodeData.clients,
            flows: member.appNodeData.flows,
            port: member.appNodeData.port,
            protocol: member.appNodeData.protocol,
            recv: member.appNodeData.recv,
            sent: member.appNodeData.sent,
            name: member.name,
          };
        })
        .filter(row => row)
    : [];

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
          <Tab disableRipple label="Sites" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} />
          <Tab disableRipple label="Traffic" classes={{ selected: classes.tabSelected }} {...TabComponentProps(1)} className={classes.tab} />
        </Tabs>
      </PanelTabWrapper>
      <OverflowContainer>
        <TabPanel value={value} index={0}>
          <SiteTable showLoader={false} data={siteNames} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MemberTable showLoader={false} data={members} />
        </TabPanel>
      </OverflowContainer>
    </>
  );
};
