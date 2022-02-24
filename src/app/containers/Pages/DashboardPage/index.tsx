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
import { AnomaliesResponse, AnomalySummary, DashboardSitesViewTab, Device, OnPremDevicesResponse, SITES_COLUMNS, SITES_DATA } from './enum';
import { Feature, Map } from './components/Map/Map';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import LoadingIndicator from 'app/components/Loading';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Paging from 'app/components/Basic/Paging';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/models/general';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import sortBy from 'lodash/sortBy';
import { isEmpty } from 'lodash';
import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';

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

const DashboardPage: React.FC = () => {
  const classes = DashboardStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const [sitesViewTabName, setSitesViewTabName] = useState<DashboardSitesViewTab>(DashboardSitesViewTab.Map);

  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [anomalies, setAnomalies] = useState<AnomalySummary[]>([]);
  const [anomaliesPageSize, setAnomaliesPageSize] = useState<number>(BASE_ANOMALIES_PAGE_SIZE);

  const { loading, error, response, onGet } = useGet<OnPremDevicesResponse>();
  const { response: anomaliesResponse, loading: anomaliesLoading, error: anomaliesError, onGet: getAnomalies } = useGet<AnomaliesResponse>();

  const onTabChange = (event: React.SyntheticEvent<Element, Event>, value: string | number) => {
    setSitesViewTabName(value as DashboardSitesViewTab);
  };

  const getAnomalySummaryPage = (pageSize: number) => getAnomalies(AlertApi.getAnomalies(), userContext.accessToken!, { pageSize: pageSize });

  useEffect(() => {
    onGet(TopoApi.getOnPremDeviceList(), userContext.accessToken!);
    getAnomalySummaryPage(anomaliesPageSize);
  }, []);

  const convertDataToFeatures = useCallback(
    (devices: Device[] = []): Feature[] => {
      return devices.map(device => ({
        type: 'Feature',
        properties: { title: device.extId, city_name: device.cityName },
        geometry: {
          coordinates: [device.lon, device.lat],
          type: 'Point',
          name: device.id,
        },
      }));
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

  return (
    <GridContainer>
      <GridItemContainer gridArea="1 / 1 / 3 / 2" minResponciveHeight="500px">
        <DashboardItemContainer>
          <div className={classes.sitesHeader}>
            <div className={classes.sitesHeaderLeftSection}>
              <span className={classes.sites}>Devices</span>
              <div className={classes.pillContainer}>
                <span className={classes.pillText}>{response?.totalCount}</span>
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
              <Map features={convertDataToFeatures(response?.devices)} />
            </div>
          )}

          {!loading && sitesViewTabName === DashboardSitesViewTab.List && (
            <>
              <TableWrapper className={classes.tableWrapper}>
                <DataTable className="tableSM fixedToParentHeight" id="meraki_sites" responsiveLayout="scroll" value={SITES_DATA} scrollable>
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
                    style={{ minWidth: SITES_COLUMNS.totalUsage.minWidth }}
                    field={SITES_COLUMNS.totalUsage.field}
                    header={SITES_COLUMNS.totalUsage.label}
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
              />
            </>
          )}
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
              anomalies.map(anomaly => (
                <div key={anomaly.timestamp} className={classes.anomalyRow}>
                  <div className={classes.severityLabelContainer}>
                    <span className={classes.severityLabel}>H</span>
                  </div>
                  <div>
                    <span>{anomaly.descString}</span>
                  </div>
                </div>
              ))}
          </div>
          <div hidden={anomaliesResponse?.totalCount < anomaliesPageSize || true} className={`${classes.horizontalCenter} ${classes.loadMoreButton}`} onClick={loadMoreAnomalies}>
            Load More
          </div>
        </DashboardItemContainer>
      </GridItemContainer>
    </GridContainer>
  );
};

export default React.memo(DashboardPage);
