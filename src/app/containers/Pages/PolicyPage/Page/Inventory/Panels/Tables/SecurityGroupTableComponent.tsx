import React from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGetChainData } from 'lib/api/http/useAxiosHook';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { INetworkRule, INetworkSecurityGroup, IToposvcGetSecurityGroupByExtIdResponse } from 'lib/api/ApiModels/Topology/apiModels';
import { IGridColumnField } from 'lib/models/grid';
import { SecurityGroupTableGridColumns } from '../models';
import * as cellTemplates from 'app/components/Basic/Table/CellTemplates';
import { ActionPart, ActionRowStyles } from 'app/containers/Pages/Shared/styles';
import { GridCount, GridLabel } from 'app/containers/Pages/TrafficPage/SessionPage/Table/styles';
import { PanelTableWrapper } from '../../styles';
import { Tab, Tabs } from '@mui/material';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import { PanelTabWrapper } from 'app/containers/Pages/TopologyPage/TopoMapV2/PanelComponents/styles';
import TabCustomLabel from 'app/components/Tabs/TabCustomLabel';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { PolicyTableKeyEnum } from 'lib/api/ApiModels/Metrics/apiModel';
import SimpleTable from './SimpleTable';

interface IChaineRes {
  securityGroup: IToposvcGetSecurityGroupByExtIdResponse;
  segment: ISegmentSegmentP;
}

interface IMappedNetworkRule extends INetworkRule {
  segment: ISegmentSegmentP;
}

interface Props {
  dataItem: INetworkSecurityGroup;
}
const SecurityGroupTableComponent: React.FC<Props> = (props: Props) => {
  const { accessToken } = React.useContext<UserContextState>(UserContext);
  const { response, loading, error, onGetChainData } = useGetChainData<IChaineRes>();
  const [inColumns] = React.useState<IGridColumnField[]>([
    { ...SecurityGroupTableGridColumns.extId },
    { ...SecurityGroupTableGridColumns.segment, body: (d: IMappedNetworkRule) => cellTemplates.cellSegmentTemplate(d.segment) },
    { ...SecurityGroupTableGridColumns.protocol, body: (d: IMappedNetworkRule) => cellTemplates.cellClassNameTemplate(d.ipProtocol, 'cellToUpperCase') },
    { ...SecurityGroupTableGridColumns.source, body: (d: IMappedNetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.cidrs, 'name') },
    { ...SecurityGroupTableGridColumns.portRange, body: (d: IMappedNetworkRule) => cellTemplates.cellFrom_ToTemplate(d.fromPort, d.toPort, 'all') },
  ]);
  const [outColumns] = React.useState<IGridColumnField[]>([
    { ...SecurityGroupTableGridColumns.extId },
    { ...SecurityGroupTableGridColumns.segment, body: (d: IMappedNetworkRule) => cellTemplates.cellSegmentTemplate(d.segment) },
    { ...SecurityGroupTableGridColumns.protocol, body: (d: IMappedNetworkRule) => cellTemplates.cellClassNameTemplate(d.ipProtocol, 'cellToUpperCase') },
    { ...SecurityGroupTableGridColumns.destination, body: (d: IMappedNetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.cidrs, 'name') },
    { ...SecurityGroupTableGridColumns.portRange, body: (d: IMappedNetworkRule) => cellTemplates.cellFrom_ToTemplate(d.fromPort, d.toPort, 'all') },
  ]);
  const [inboundData, setInboundData] = React.useState<IMappedNetworkRule[]>([]);
  const [outboundData, setOutboundData] = React.useState<IMappedNetworkRule[]>([]);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const classes = TabsStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  React.useEffect(() => {
    getDataAsync();
  }, []);

  React.useEffect(() => {
    if (response && response.securityGroup) {
      const _segment: ISegmentSegmentP = response.segment ? response.segment : null;
      const _in: IMappedNetworkRule[] = [];
      const _out: IMappedNetworkRule[] = [];
      if (response.securityGroup.securityGroup.rules && response.securityGroup.securityGroup.rules.length) {
        response.securityGroup.securityGroup.rules.forEach((it: INetworkRule) => {
          if (it.ruleType && it.ruleType === PolicyTableKeyEnum.Inbound) {
            _in.push({ ...it, segment: _segment });
            return;
          }
          if (it.ruleType && it.ruleType === PolicyTableKeyEnum.Outbound) {
            _out.push({ ...it, segment: _segment });
            return;
          }
        });
      }
      console.log('in', _in);
      console.log('out', _out);
      setInboundData(_in);
      setOutboundData(_out);
    } else {
      setInboundData([]);
      setOutboundData([]);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      setInboundData([]);
      setOutboundData([]);
    }
  }, [error]);

  const getDataAsync = async () => {
    const _segmentUrl = props.dataItem.vnets[0].segmentId ? PolicyApi.getSegmentsById(props.dataItem.vnets[0].segmentId) : null;
    if (!_segmentUrl) {
      await onGetChainData([TopoApi.getSecurityGroupsByExtId(props.dataItem.extId)], ['securityGroup'], accessToken!);
      return;
    }
    await onGetChainData([TopoApi.getSecurityGroupsByExtId(props.dataItem.extId), PolicyApi.getSegmentsById(props.dataItem.vnets[0].segmentId)], ['securityGroup', 'segment'], accessToken!);
  };
  return (
    <PanelTableWrapper margin="0 0 40px 0">
      <ActionRowStyles height="30px" margin="0 0 10px 0" zIndex="unset">
        <ActionPart margin="0 auto 0 0" alignItems="flex-end">
          <GridLabel className="textOverflowEllips">{props.dataItem.name || props.dataItem.extId}</GridLabel>
        </ActionPart>
      </ActionRowStyles>
      <PanelTabWrapper>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          className={classes.tabs}
          TabIndicatorProps={{
            style: {
              background: 'var(--_hoverButtonBg)',
              boxShadow: '0px 4px 7px rgba(67, 127, 236, 0.15)',
              borderRadius: '100px',
            },
          }}
          sx={{ width: '100%' }}
        >
          <Tab
            sx={{ minWidth: '50% !important', flexDirection: 'row' }}
            disableRipple
            label={
              <TabCustomLabel label="Inbound Rules">
                {props.dataItem.inboundRulesCount ? <GridCount className={selectedTab !== 0 ? 'disabled' : ''}>{props.dataItem.inboundRulesCount}</GridCount> : null}
              </TabCustomLabel>
            }
            classes={{ selected: classes.tabSelected }}
            {...TabComponentProps(0)}
            className={classes.tab}
          />
          <Tab
            sx={{ minWidth: '50% !important', flexDirection: 'row' }}
            disableRipple
            label={
              <TabCustomLabel label="Outbound Rules">
                {props.dataItem.outboundRulesCount ? <GridCount className={selectedTab !== 1 ? 'disabled' : ''}>{props.dataItem.outboundRulesCount}</GridCount> : null}
              </TabCustomLabel>
            }
            classes={{ selected: classes.tabSelected }}
            {...TabComponentProps(1)}
            className={classes.tab}
          />
        </Tabs>
      </PanelTabWrapper>
      <TabPanel value={selectedTab} index={0} styles={{ display: 'flex' }}>
        <SimpleTable id={`inbound${props.dataItem.extId}`} data={inboundData} columns={inColumns} loading={loading} error={error ? error.message : null} />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} styles={{ display: 'flex' }}>
        <SimpleTable id={`outbound${props.dataItem.extId}`} data={outboundData} columns={outColumns} loading={loading} error={error ? error.message : null} />
      </TabPanel>
    </PanelTableWrapper>
  );
};
export default React.memo(SecurityGroupTableComponent);
