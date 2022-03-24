import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { upRedArrow, downGreenArrow } from 'app/components/SVGIcons/arrows';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { INetworkwEdge, IWEdgesRes } from 'lib/api/ApiModels/Topology/apiModels';
import { AlertSeverity, IAlertMeta, IAlertMetaDataRes, ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { TrafficProvider, useTrafficActions } from 'lib/hooks/Traffic/useTrafficDataCont';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { isEmpty } from 'lodash';
import { DateTime } from 'luxon';
import LoadingIndicator from 'app/components/Loading';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getCorrectedTimeString } from '../../MetricsPage/components/Utils';
import { AWSManagementItem } from '../components/AwsManagementItem';
import { AWSMap } from '../components/AWSMap';
import { Feature } from '../components/Map/Map';
import { Segments } from '../components/Segments';
import { DashboardStyles } from '../DashboardStyles';
import { AnomalySummary, AnomaliesResponse, DashboardSitesViewTab, TRANSIT_GATEWAY_COLUNMNS, TransitGatewayData } from '../enum';
import { TabsUnstyled } from '@mui/material';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { styled } from '@mui/system';
import {
  AWSGridContainer,
  DashboardItemContainer,
  DashboardItemHeaderContainer,
  DashboardItemHeaderTitle,
  DashboardItemLabel,
  GridItemContainer,
  MarkerCountContainer,
} from '../styles/ChartContainer';
import { SeverityLabelContainer, ArrowContainer } from '../styles/DashboardStyledComponents';
import { INPUT_TIME_FORMAT } from './MerakiDashboard';
import { ALERT_TIME_RANGE_QUERY_TYPES, paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Paging from 'app/components/Basic/Paging';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/models/general';

const BASE_ANOMALIES_PAGE_SIZE = 10;

const Tab = styled(TabUnstyled)`
  color: #848da3;
  cursor: pointer;
  font-size: 12px;
  background: #f3f6fc;
  padding: 6px 40px 6px 40px;
  border: none;
  border-radius: 6px;
  display: flex;

  &.Mui-selected {
    color: #437fec;
    font-weight: bold;
  }

  &:hover {
    color: #437fec;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    color: #437fec;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  border-radius: 6px;
  display: flex;
  align-content: space-between;
`;

enum EscalationResult {
  downGreen = 'downGreen',
  upRed = 'upRed',
  showSeverity = 'showSeverity',
}

const dashboardHeaderStyle: React.CSSProperties = { fontSize: '12px', color: '#848DA3', fontWeight: 700, wordBreak: 'normal' };
const getDashboardRowStyle = (minWidth: string): React.CSSProperties => ({
  minWidth: minWidth,
  padding: 5,
  fontSize: 14,
  wordWrap: 'break-word',
  wordBreak: 'break-all',
});

export const AwsDashboard: React.FC = () => {
  const classes = DashboardStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const trafficActions = useTrafficActions();
  const { response, loading, error, onGet } = useGet<IWEdgesRes>();
  const [sitesViewTabName, setSitesViewTabName] = useState<DashboardSitesViewTab>(DashboardSitesViewTab.Map);
  const [anomalies, setAnomalies] = useState<AnomalySummary[]>([]);
  const [alertMetadata, setAlertMetadata] = useState<IAlertMeta[]>([]);
  const { loading: alertMetadataLoading, response: alertMetadaResponse, onGet: GetAlertMetadata } = useGet<IAlertMetaDataRes>();
  const [anomaliesPageSize, setAnomaliesPageSize] = useState<number>(BASE_ANOMALIES_PAGE_SIZE);
  const { response: anomaliesResponse, loading: anomaliesLoading, error: anomaliesError, onGet: getAnomalies } = useGet<AnomaliesResponse>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGING_DEFAULT_PAGE_SIZE);

  const getAnomalySummaryPage = (pageSize: number) => getAnomalies(AlertApi.getAnomalies(), userContext.accessToken!, { pageSize: pageSize });

  const onTabChange = (event: React.SyntheticEvent<Element, Event>, value: string | number) => {
    setSitesViewTabName(value as DashboardSitesViewTab);
  };

  const loadMoreAnomalies = () => {
    const newPageSize = anomaliesPageSize + BASE_ANOMALIES_PAGE_SIZE;
    setAnomaliesPageSize(newPageSize);
    getAnomalySummaryPage(newPageSize);
  };
  const getSeverityColour = (anomalyType: ModelalertType) => {
    const selectedAlert = alertMetadata.find(alert => alert.type === anomalyType);
    if (selectedAlert) {
      return selectedAlert.severity === AlertSeverity.LOW ? 'var(--_successColor)' : selectedAlert.severity === AlertSeverity.MEDIUM ? 'var(--_warningColor)' : 'var(--_errorColor)';
    }
    return 'var(--_disabledTextColor)';
  };

  const getSeverityText = (anomalyType: ModelalertType) => {
    const selectedAlert = alertMetadata.find(alert => alert.type === anomalyType);
    if (selectedAlert) {
      return selectedAlert.severity === AlertSeverity.LOW ? 'L' : selectedAlert.severity === AlertSeverity.MEDIUM ? 'M' : 'H';
    }
    return '?';
  };

  const checkAnomalyDescString = (anomalyString: string) => {
    if (anomalyString.includes('occurred once') || anomalyString.includes('occured once') || anomalyString.includes('increased') || anomalyString.includes('went up')) {
      return EscalationResult.upRed;
    }
    if (anomalyString.includes('decreased') || anomalyString.includes('went down')) {
      return EscalationResult.downGreen;
    }
    return EscalationResult.showSeverity;
  };

  const getEscalationHeader = (anomaly: AnomalySummary) => {
    const escalationResult = checkAnomalyDescString(anomaly.descString);
    return escalationResult === EscalationResult.showSeverity ? (
      <SeverityLabelContainer color={getSeverityColour(anomaly.anomalyType)}>
        <span className={classes.severityLabel}>{getSeverityText(anomaly.anomalyType)}</span>
      </SeverityLabelContainer>
    ) : escalationResult === EscalationResult.upRed ? (
      <ArrowContainer>{upRedArrow(20, 20)}</ArrowContainer>
    ) : (
      <ArrowContainer>{downGreenArrow(20, 20)}</ArrowContainer>
    );
  };

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
    // TODO: Modify this
    // onTryLoadAlertMetaData(size, page, selectedPeriod);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      // TODO: Modify this
      // onTryLoadAlertMetaData(size, page, selectedPeriod);
      return;
    }
    setPageSize(size);
    // onTryLoadAlertMetaData(size, currentPage, selectedPeriod);
  };

  useEffect(() => {
    if (anomaliesResponse && anomaliesResponse.anomalySummary && anomaliesResponse.anomalySummary.length) {
      setAnomalies(anomaliesResponse.anomalySummary);
    }
  }, [anomaliesResponse]);

  useEffect(() => {
    onGet(TopoApi.getWedges(), userContext.accessToken!);
    const _param = paramBuilder(50, 1, ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY);
    getAnomalySummaryPage(anomaliesPageSize);
    GetAlertMetadata(AlertApi.getAllMetadata(), userContext.accessToken!, _param);
  }, []);
  useEffect(() => {
    if (alertMetadaResponse && alertMetadaResponse.alertMetadata && alertMetadaResponse.alertMetadata.length) {
      setAlertMetadata(alertMetadaResponse.alertMetadata);
    }
  }, [alertMetadaResponse]);

  const convertWedgestoFeatures = useCallback(
    (wedges: INetworkwEdge[] = []): Feature[] =>
      wedges.map(wedge => ({
        type: 'Feature',
        properties: { title: wedge.regionDetail.name, id: wedge.extId || '', ownerId: wedge.ownerId || '', name: wedge.name || '' },
        geometry: { coordinates: [wedge.regionDetail.long, wedge.regionDetail.lat], type: 'Point', name: wedge.regionDetail.id },
      })),
    [response],
  );

  const convertWedgesToTransitGatewayData = useCallback(
    (wedges: INetworkwEdge[] = []): TransitGatewayData[] =>
      wedges.map(wedge => ({
        name: wedge.name,
        id: wedge.extId,
        accountId: wedge.ownerId,
        region: wedge.regionDetail.name,
      })),
    [response],
  );

  return (
    <TrafficProvider actions={trafficActions}>
      <AWSGridContainer>
        <GridItemContainer gridArea="1 / 1 / 2 / 2">
          <DashboardItemContainer>
            <DashboardItemHeaderContainer>
              <MarkerCountContainer>
                <DashboardItemHeaderTitle>Transit Gateway</DashboardItemHeaderTitle>
                <div className={classes.pillContainer}>
                  <span className={classes.pillText}>{response?.totalCount || 0}</span>
                </div>
              </MarkerCountContainer>
              <div>
                <TabsUnstyled value={sitesViewTabName} onChange={onTabChange}>
                  <div className={classes.tabListContainer}>
                    <TabsList>
                      <Tab value={DashboardSitesViewTab.Map}>{DashboardSitesViewTab.Map.toUpperCase()}</Tab>
                      <Tab value={DashboardSitesViewTab.List}>{DashboardSitesViewTab.List.toUpperCase()}</Tab>
                    </TabsList>
                  </div>
                </TabsUnstyled>
              </div>
            </DashboardItemHeaderContainer>
            {sitesViewTabName === DashboardSitesViewTab.Map && (
              <div className={classes.mapContainerMain}>
                <AWSMap features={convertWedgestoFeatures(response?.wEdges)} />
              </div>
            )}
            {sitesViewTabName === DashboardSitesViewTab.List && (
              <div>
                <TableWrapper className={classes.awsTableWrapper}>
                  <DataTable className="tableSX fixedToParentHeight" id="aws_tgws" responsiveLayout="scroll" value={convertWedgesToTransitGatewayData(response?.wEdges)} scrollable scrollHeight="34vh">
                    <Column
                      headerStyle={dashboardHeaderStyle}
                      style={getDashboardRowStyle(TRANSIT_GATEWAY_COLUNMNS.name.minWidth)}
                      field={TRANSIT_GATEWAY_COLUNMNS.name.field}
                      header={TRANSIT_GATEWAY_COLUNMNS.name.label}
                    />
                    <Column
                      headerStyle={dashboardHeaderStyle}
                      style={getDashboardRowStyle(TRANSIT_GATEWAY_COLUNMNS.id.minWidth)}
                      field={TRANSIT_GATEWAY_COLUNMNS.id.field}
                      header={TRANSIT_GATEWAY_COLUNMNS.id.label}
                    />
                    <Column
                      headerStyle={dashboardHeaderStyle}
                      style={getDashboardRowStyle(TRANSIT_GATEWAY_COLUNMNS.accountId.minWidth)}
                      field={TRANSIT_GATEWAY_COLUNMNS.accountId.field}
                      header={TRANSIT_GATEWAY_COLUNMNS.accountId.label}
                    />
                    <Column
                      headerStyle={dashboardHeaderStyle}
                      style={getDashboardRowStyle(TRANSIT_GATEWAY_COLUNMNS.region.minWidth)}
                      field={TRANSIT_GATEWAY_COLUNMNS.region.field}
                      header={TRANSIT_GATEWAY_COLUNMNS.region.label}
                    />
                  </DataTable>
                </TableWrapper>
                <Paging
                  disabled={totalCount === 0}
                  hideRange={1024}
                  count={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onChangePage={onChangeCurrentPage}
                  onChangePageSize={onChangePageSize}
                  pagingWrapStyles={{ display: totalCount < pageSize ? 'none' : '' }}
                />
              </div>
            )}
          </DashboardItemContainer>
        </GridItemContainer>
        <GridItemContainer gridArea="1 / 2 / 2 / 2">
          <DashboardItemContainer>
            <DashboardItemLabel>Management</DashboardItemLabel>
            <AWSManagementItem wedges={response?.wEdges} loading={loading} error={error} />
          </DashboardItemContainer>
        </GridItemContainer>
        <GridItemContainer gridArea="2 / 1 / 2 / 2">
          <DashboardItemContainer>
            <DashboardItemLabel>Segments</DashboardItemLabel>
            <Segments />
          </DashboardItemContainer>
        </GridItemContainer>
        <GridItemContainer gridArea="2 / 2 / 2 / 2">
          <DashboardItemContainer>
            <div className={classes.dashboardLabelContainer}>
              <DashboardItemLabel style={{ marginBottom: '0px' }}>Escalations</DashboardItemLabel>
            </div>
            <div className={classes.anomaliesRowsContainer}>
              {anomaliesLoading && alertMetadataLoading && (
                <div className={classes.verticalCenter}>
                  <LoadingIndicator margin="auto" />
                </div>
              )}

              {anomaliesError && <div>Something went wrong. Please try again</div>}

              {!anomaliesLoading && !alertMetadataLoading && isEmpty(anomalies) && (
                <div className={classes.verticalCenter}>
                  <EmptyText>No Data</EmptyText>
                </div>
              )}
              {!anomaliesLoading &&
                !alertMetadataLoading &&
                !anomaliesError &&
                anomalies.map(anomaly => {
                  const now = DateTime.now();
                  const timestamp = DateTime.fromFormat(getCorrectedTimeString(anomaly.timestamp), INPUT_TIME_FORMAT);
                  const diff = now.diff(timestamp, ['years', 'months', 'days', 'hours', 'minutes']).toObject();
                  let diffString: string[] = [];
                  ['years', 'months', 'days', 'hours', 'minutes'].forEach(item => {
                    if (diff[item] > 0) {
                      diffString.push(`${Math.round(diff[item])} ${item} ago`);
                      return;
                    }
                  });
                  return (
                    <div key={`${anomaly.timestamp}_${anomaly.descString}_${anomaly.boldDescString}_${anomaly.regularDescString}`} className={classes.anomalyRow}>
                      <div className={classes.troubleshootContainer}>
                        {getEscalationHeader(anomaly)}
                        {anomaly.boldDescString && anomaly.regularDescString ? (
                          <div>
                            <span>{anomaly.boldDescString}</span>
                            <span>{anomaly.regularDescString}</span>
                          </div>
                        ) : (
                          <div>
                            <span>{anomaly.descString}</span>
                          </div>
                        )}
                      </div>
                      <div className={classes.timeDiffContainer}>
                        <span className={classes.timeDiffText}>{diffString[0]}</span>
                      </div>
                    </div>
                  );
                })}
              <div hidden={anomaliesLoading ? true : anomaliesResponse?.totalCount < anomaliesPageSize} className={`${classes.horizontalCenter} ${classes.loadMoreButton}`} onClick={loadMoreAnomalies}>
                Load More
              </div>
            </div>
          </DashboardItemContainer>
        </GridItemContainer>
      </AWSGridContainer>
    </TrafficProvider>
  );
};
