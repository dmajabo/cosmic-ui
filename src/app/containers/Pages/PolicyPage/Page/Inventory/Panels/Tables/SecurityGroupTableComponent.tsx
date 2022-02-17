import React from 'react';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGetChainData } from 'lib/api/http/useAxiosHook';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { INetworkRule, INetworkSecurityGroup, IToposvcGetSecurityGroupByExtIdResponse, ToposvcRuleType } from 'lib/api/ApiModels/Topology/apiModels';
import { IGridColumnField, ISortObject } from 'lib/models/grid';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import * as gridHelper from 'lib/helpers/gridHelper';
import { SecurityGroupTableGridColumns } from '../models';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
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
  const [columns] = React.useState<IGridColumnField[]>([
    { ...SecurityGroupTableGridColumns.name },
    { ...SecurityGroupTableGridColumns.ruleType, body: (d: IMappedNetworkRule) => SecurityGroupTableGridColumns.ruleType.format(d.ruleType) },
    { ...SecurityGroupTableGridColumns.protocol, body: (d: IMappedNetworkRule) => cellTemplates.cellClassNameTemplate(d.ipProtocol, 'cellToUpperCase') },
    { ...SecurityGroupTableGridColumns.source, body: (d: IMappedNetworkRule) => cellTemplates.cellValueFromArrayTemplate(d.srcCidrs, 'name') },
  ]);
  const [sortObject, setSortObject] = React.useState<ISortObject>(null);
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
          if (it.ruleType && it.ruleType.toLowerCase() === ToposvcRuleType.L3_Inbound.toLowerCase()) {
            _in.push({ ...it, segment: _segment });
            return;
          }
          if (it.ruleType && it.ruleType.toLowerCase() === ToposvcRuleType.L3_Outbound.toLowerCase()) {
            _out.push({ ...it, segment: _segment });
            return;
          }
        });
      }
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

  const onSort = (e: DataTablePFSEvent) => {
    const _sortObject = gridHelper.singelSortHelper(sortObject, e);
    setSortObject(_sortObject);
  };

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
            label={<TabCustomLabel label="Inbound Rules">{props.dataItem.inboundRulesCount ? <GridCount>{props.dataItem.inboundRulesCount}</GridCount> : null}</TabCustomLabel>}
            classes={{ selected: classes.tabSelected }}
            {...TabComponentProps(0)}
            className={classes.tab}
          />
          <Tab
            sx={{ minWidth: '50% !important', flexDirection: 'row' }}
            disableRipple
            label={<TabCustomLabel label="Outbound Rules">{props.dataItem.outboundRulesCount ? <GridCount>{props.dataItem.outboundRulesCount}</GridCount> : null}</TabCustomLabel>}
            classes={{ selected: classes.tabSelected }}
            {...TabComponentProps(1)}
            className={classes.tab}
          />
        </Tabs>
      </PanelTabWrapper>
      <TabPanel value={selectedTab} index={0} styles={{ display: 'flex' }}>
        <TableWrapper style={{ minHeight: !inboundData || !inboundData.length ? '200px' : 'auto', flexGrow: '0', flexShrink: 0 }}>
          <DataTable
            className="tableSM"
            emptyMessage={!error ? 'No data' : ' '}
            value={inboundData}
            responsiveLayout="scroll"
            onSort={onSort}
            sortField={sortObject ? sortObject.field : null}
            sortOrder={sortObject ? sortObject.order : null}
            sortMode="single"
          >
            {columns.map(col => {
              if (col.hide) return null;
              return (
                <Column
                  key={`route${col.field}${props.dataItem.extId}`}
                  style={{ width: col.width, minWidth: col.minWidth, maxWidth: col.maxWidth }}
                  field={col.field}
                  header={col.label}
                  sortable={col.sortable}
                  body={col.body || null}
                />
              );
            })}
          </DataTable>
          {loading && (
            <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          )}

          {error && (
            <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px" opacity="1">
              <ErrorMessage margin="auto" fontSize={20}>
                {error ? error.message : 'Something went wrong'}
              </ErrorMessage>
            </AbsLoaderWrapper>
          )}
        </TableWrapper>
      </TabPanel>
      <TabPanel value={selectedTab} index={1} styles={{ display: 'flex' }}>
        <TableWrapper style={{ minHeight: !outboundData || !outboundData.length ? '200px' : 'auto', flexGrow: '0', flexShrink: 0 }}>
          <DataTable
            className="tableSM"
            emptyMessage={!error ? 'No data' : ' '}
            value={outboundData}
            responsiveLayout="scroll"
            onSort={onSort}
            sortField={sortObject ? sortObject.field : null}
            sortOrder={sortObject ? sortObject.order : null}
            sortMode="single"
          >
            {columns.map(col => {
              if (col.hide) return null;
              return (
                <Column
                  key={`route${col.field}${props.dataItem.extId}`}
                  style={{ width: col.width, minWidth: col.minWidth, maxWidth: col.maxWidth }}
                  field={col.field}
                  header={col.label}
                  sortable={col.sortable}
                  body={col.body || null}
                />
              );
            })}
          </DataTable>
          {loading && (
            <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          )}

          {error && (
            <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px" opacity="1">
              <ErrorMessage margin="auto" fontSize={20}>
                {error ? error.message : 'Something went wrong'}
              </ErrorMessage>
            </AbsLoaderWrapper>
          )}
        </TableWrapper>
      </TabPanel>
    </PanelTableWrapper>
  );
};
export default React.memo(SecurityGroupTableComponent);
