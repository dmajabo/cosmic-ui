import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DashboardStyles } from './DashboardStyles';
import './react-grid-layout.css';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { styled } from '@mui/system';
import { TabsUnstyled } from '@mui/material';
import { DashboardItemContainer, DashboardItemContent, DashboardItemLabel, GridContainer, GridItemContainer } from './styles/ChartContainer';
import InOutBound from './components/ManagmentItem/InOutBound';
import ManagementLayer7 from './components/ManagmentItem/ManagementLayer7';
import ManagementDrifts from './components/ManagmentItem/ManagementDrifts';
import { AnomaliesResponse, AnomalySummary, DashboardSitesViewTab, Device, DeviceMetrics, MapDeviceDataResponse, OnPremDevicesResponse, SitesData, SITES_COLUMNS, SITES_DATA } from './enum';
import { Feature, Map } from './components/Map/Map';
import { useGet, useGetChainData } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import LoadingIndicator from 'app/components/Loading';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Paging from 'app/components/Basic/Paging';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/models/general';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import isEmpty from 'lodash/isEmpty';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
import { DateTime } from 'luxon';
import { getCorrectedTimeString } from '../MetricsPage/components/Utils';
import BandwidthComponent from '../TrafficPage/Trends/Components/BandwidthComponent';
import { downRedArrow, upGreenArrow } from 'app/components/SVGIcons/arrows';
import { useHistory } from 'react-router-dom';
import { ROUTE } from 'lib/Routes/model';

const Tab = styled(TabUnstyled)`
  color: #848da3;
  cursor: pointer;
  font-size: 12px;
  background: #f3f6fc;
  padding: 15px 40px 15px 40px;
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

const BASE_ANOMALIES_PAGE_SIZE = 10;

export const INPUT_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss ZZZ z';

export const AVAILABILITY_TIME_FORMAT = 'EEE, MMM dd yyyy, hh:mm a';

const DashboardPage: React.FC = () => {
  const classes = DashboardStyles();
  const history = useHistory();
  const userContext = useContext<UserContextState>(UserContext);
  const [sitesViewTabName, setSitesViewTabName] = useState<DashboardSitesViewTab>(DashboardSitesViewTab.Map);

  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [anomalies, setAnomalies] = useState<AnomalySummary[]>([]);
  const [anomaliesPageSize, setAnomaliesPageSize] = useState<number>(BASE_ANOMALIES_PAGE_SIZE);

  const { loading, error, response, onGetChainData } = useGetChainData<MapDeviceDataResponse>();
  const { response: anomaliesResponse, loading: anomaliesLoading, error: anomaliesError, onGet: getAnomalies } = useGet<AnomaliesResponse>();

  const onTabChange = (event: React.SyntheticEvent<Element, Event>, value: string | number) => {
    setSitesViewTabName(value as DashboardSitesViewTab);
  };

  const getAnomalySummaryPage = (pageSize: number) => getAnomalies(AlertApi.getAnomalies(), userContext.accessToken!, { pageSize: pageSize });

  useEffect(() => {
    onGetChainData([TopoApi.getOnPremDeviceList(), TelemetryApi.getDeviceMetrics()], ['devices', 'deviceMetrics'], userContext.accessToken!, { startTime: '-1d', endTime: '-0m' });
    getAnomalySummaryPage(anomaliesPageSize);
  }, []);

  const convertDataToFeatures = useCallback(
    (devices: Device[] = [], deviceMetrics: DeviceMetrics[] = []): Feature[] => {
      return devices.map(device => {
        const selectedDeviceMetrics: DeviceMetrics = deviceMetrics.find(deviceMetric => device.extId === deviceMetric.extId);
        return {
          type: 'Feature',
          properties: { title: device.extId, uplinks: device.uplinks, ...selectedDeviceMetrics },
          geometry: {
            coordinates: [device.lon, device.lat],
            type: 'Point',
            name: device.id,
          },
        };
      });
    },
    [response],
  );

  const convertDataToSitesData = useCallback(
    (devices: Device[] = [], deviceMetrics: DeviceMetrics[] = []): SitesData[] => {
      return deviceMetrics.map(deviceMetric => {
        const selectedDevice = devices.find(device => device.extId === deviceMetric.extId);
        const tagArray = selectedDevice?.vnetworks.reduce((acc, vnetwork) => acc.concat(vnetwork.tags), []).map(tag => tag.value);
        const bytesSent = deviceMetric?.bytesSendUsage / 1000000;
        const bytesRecieved = deviceMetric?.bytesReceivedUsage / 1000000;
        return {
          name: deviceMetric?.name || '',
          totalUsage: (
            <div>
              <span className={classes.totalUsageIcon}>{upGreenArrow}</span>
              <span title="Bytes Sent">{`${bytesSent > 0 ? bytesSent.toFixed(2) : 0} MB`}</span>
              <span className={classes.totalUsageIcon}>{downRedArrow}</span>
              <span title="Bytes Recieved">{`${bytesRecieved > 0 ? bytesRecieved.toFixed(2) : 0} MB`}</span>
            </div>
          ),
          avgBandwidth: '',
          latency: `${deviceMetric?.latency.toFixed(2)} ms` || '',
          packetLoss: `${deviceMetric?.packetloss}%` || '',
          goodput: `${deviceMetric?.goodput / 1000} mbps`,
          jitter: '',
          clients: selectedDevice?.vnetworks.reduce((acc, vnetwork) => acc + vnetwork.numberOfOnetClients, 0),
          tags: tagArray.join(', '),
          uplinks: selectedDevice.uplinks.map(uplink => uplink.name).join(', '),
          availability: isEmpty(deviceMetric.availabilityMetrics) ? (
            <div />
          ) : (
            <div className={classes.connectivityContainer}>
              {deviceMetric.availabilityMetrics?.map(item => {
                const timestamp = DateTime.fromFormat(getCorrectedTimeString(item.time), INPUT_TIME_FORMAT).toFormat(AVAILABILITY_TIME_FORMAT);
                if (Number(item.value) > 0) {
                  return <div title={timestamp} key={item.time} className={classes.connectivityUnavailableItem} />;
                }
                return <div title={timestamp} key={item.time} className={classes.connectivityAvailableItem} />;
              })}
            </div>
          ),
        };
      });
    },
    [response],
  );

  const loadMoreAnomalies = () => {
    const newPageSize = anomaliesPageSize + BASE_ANOMALIES_PAGE_SIZE;
    setAnomaliesPageSize(newPageSize);
    getAnomalySummaryPage(newPageSize);
  };

  useEffect(() => {
    if (anomaliesResponse && anomaliesResponse.anomalySummary && anomaliesResponse.anomalySummary.length) {
      setAnomalies(anomaliesResponse.anomalySummary);
    }
  }, [anomaliesResponse]);

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

  const onAnomalyClick = () => {
    history.push(ROUTE.app + ROUTE.metrics);
  };

  return (
    <GridContainer>
      <GridItemContainer gridArea="1 / 1 / 2 / 2" minResponciveHeight="500px">
        <DashboardItemContainer>
          <div className={classes.sitesHeader}>
            <div className={classes.sitesHeaderLeftSection}>
              <span className={classes.sites}>Sites</span>
              <div className={classes.pillContainer}>
                <span className={classes.pillText}>{response?.devices.totalCount}</span>
              </div>
            </div>
            <TabsUnstyled value={sitesViewTabName} onChange={onTabChange}>
              <div className={classes.tabListContainer}>
                <TabsList>
                  <Tab value={DashboardSitesViewTab.Map}>{DashboardSitesViewTab.Map.toUpperCase()}</Tab>
                  <Tab value={DashboardSitesViewTab.List}>{DashboardSitesViewTab.List.toUpperCase()}</Tab>
                </TabsList>
              </div>
            </TabsUnstyled>
          </div>
          {loading && <LoadingIndicator margin="auto" />}

          {error && <div>Something went wrong. Please try again</div>}

          {!loading && sitesViewTabName === DashboardSitesViewTab.Map && (
            <div className={classes.mapContainerMain}>
              <Map features={convertDataToFeatures(response?.devices.devices, response?.deviceMetrics.deviceMetrics)} />
            </div>
          )}

          {!loading && sitesViewTabName === DashboardSitesViewTab.List && (
            <>
              <TableWrapper className={classes.tableWrapper}>
                <DataTable
                  className="tableSM fixedToParentHeight"
                  id="meraki_sites"
                  responsiveLayout="scroll"
                  value={convertDataToSitesData(response?.devices.devices, response?.deviceMetrics.deviceMetrics)}
                  scrollable
                >
                  <Column
                    headerStyle={{ fontSize: '12px', color: '#848DA3', fontWeight: 700 }}
                    style={{
                      minWidth: SITES_COLUMNS.name.minWidth,
                    }}
                    field={SITES_COLUMNS.name.field}
                    header={SITES_COLUMNS.name.label}
                  ></Column>
                  <Column
                    headerStyle={{ fontSize: '12px', color: '#848DA3', fontWeight: 700 }}
                    style={{
                      minWidth: SITES_COLUMNS.uplinks.minWidth,
                    }}
                    field={SITES_COLUMNS.uplinks.field}
                    header={SITES_COLUMNS.uplinks.label}
                  ></Column>
                  <Column
                    headerStyle={{ fontSize: '12px', color: '#848DA3', fontWeight: 700 }}
                    style={{
                      minWidth: SITES_COLUMNS.totalUsage.minWidth,
                    }}
                    field={SITES_COLUMNS.totalUsage.field}
                    header={SITES_COLUMNS.totalUsage.label}
                  ></Column>
                  <Column
                    headerStyle={{ fontSize: '12px', color: '#848DA3', fontWeight: 700 }}
                    style={{ minWidth: SITES_COLUMNS.clients.minWidth }}
                    field={SITES_COLUMNS.clients.field}
                    header={SITES_COLUMNS.clients.label}
                  ></Column>
                  <Column
                    headerStyle={{ fontSize: '12px', color: '#848DA3', fontWeight: 700 }}
                    style={{ minWidth: SITES_COLUMNS.tags.minWidth }}
                    field={SITES_COLUMNS.tags.field}
                    header={SITES_COLUMNS.tags.label}
                  ></Column>
                  <Column
                    headerStyle={{ fontSize: '12px', color: '#848DA3', fontWeight: 700 }}
                    style={{ minWidth: SITES_COLUMNS.latency.minWidth }}
                    field={SITES_COLUMNS.latency.field}
                    header={SITES_COLUMNS.latency.label}
                  ></Column>
                  <Column
                    headerStyle={{ fontSize: '12px', color: '#848DA3', fontWeight: 700 }}
                    style={{ minWidth: SITES_COLUMNS.packetLoss.minWidth }}
                    field={SITES_COLUMNS.packetLoss.field}
                    header={SITES_COLUMNS.packetLoss.label}
                  ></Column>
                  <Column
                    headerStyle={{ fontSize: '12px', color: '#848DA3', fontWeight: 700 }}
                    style={{ minWidth: SITES_COLUMNS.goodput.minWidth }}
                    field={SITES_COLUMNS.goodput.field}
                    header={SITES_COLUMNS.goodput.label}
                  ></Column>
                  <Column
                    headerStyle={{ fontSize: '12px', color: '#848DA3', fontWeight: 700 }}
                    style={{ minWidth: SITES_COLUMNS.availability.minWidth }}
                    field={SITES_COLUMNS.availability.field}
                    header={SITES_COLUMNS.availability.label}
                  ></Column>
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
            </>
          )}
        </DashboardItemContainer>
      </GridItemContainer>
      <GridItemContainer gridArea="2 / 1 / 2 / 2">
        <DashboardItemContainer>
          <DashboardItemLabel>Sankey</DashboardItemLabel>
          <DashboardItemContent>
            <BandwidthComponent />
          </DashboardItemContent>
        </DashboardItemContainer>
      </GridItemContainer>
      <GridItemContainer gridArea="1 / 2 / 2 / 3">
        <DashboardItemContainer>
          <DashboardItemLabel>Management</DashboardItemLabel>
          <DashboardItemContent>
            <ManagementDrifts />
            <InOutBound styles={{ margin: '0 20px' }} />
            <ManagementLayer7 />
          </DashboardItemContent>
        </DashboardItemContainer>
      </GridItemContainer>
      <GridItemContainer gridArea="2 / 2 / 3 / 3">
        <DashboardItemContainer>
          <div className={classes.dashboardLabelContainer}>
            <DashboardItemLabel style={{ marginBottom: '0px' }}>Anomalies</DashboardItemLabel>
            <div className={classes.pillContainer} style={{ marginLeft: '4px' }}>
              <span className={classes.pillText}>{anomaliesResponse?.totalCount}</span>
            </div>
          </div>
          <div className={classes.anomaliesRowsContainer}>
            {anomaliesLoading && (
              <div className={classes.verticalCenter}>
                <LoadingIndicator margin="auto" />
              </div>
            )}

            {anomaliesError && <div>Something went wrong. Please try again</div>}

            {!anomaliesLoading && isEmpty(anomalies) && (
              <div className={classes.verticalCenter}>
                <EmptyText>No Data</EmptyText>
              </div>
            )}
            {!anomaliesLoading &&
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
                  <div key={`${anomaly.timestamp}_${anomaly.descString}`} className={classes.anomalyRow} onClick={onAnomalyClick}>
                    <div className={classes.troubleshootContainer}>
                      <div className={classes.severityLabelContainer}>
                        <span className={classes.severityLabel}>H</span>
                      </div>
                      <div>
                        <span>{anomaly.descString}</span>
                      </div>
                    </div>
                    <div className={classes.timeDiffContainer}>
                      <span className={classes.timeDiffText}>{diffString[0]}</span>
                    </div>
                  </div>
                );
              })}
          </div>
          <div hidden={anomaliesResponse?.totalCount < anomaliesPageSize} className={`${classes.horizontalCenter} ${classes.loadMoreButton}`} onClick={loadMoreAnomalies}>
            Load More
          </div>
        </DashboardItemContainer>
      </GridItemContainer>
    </GridContainer>
  );
};

export default React.memo(DashboardPage);
