import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DashboardStyles } from './DashboardStyles';
import './react-grid-layout.css';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { styled } from '@mui/system';
import { TabsUnstyled } from '@mui/material';
import { DashboardItemContainer, DashboardItemContent, DashboardItemLabel } from './styles/ChartContainer';
import InOutBound from './components/ManagmentItem/InOutBound';
import ManagementLayer7 from './components/ManagmentItem/ManagementLayer7';
import ManagementDrifts from './components/ManagmentItem/ManagementDrifts';
import { DashboardSitesViewTab, Device, OnPremDevicesResponse, SITES_COLUMNS, SITES_DATA } from './enum';
import { Feature, Map } from './components/Map/Map';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import LoadingIndicator from 'app/components/Loading';
import Table from '../../../components/Basic/Table/TableComponent';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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

const DashboardPage: React.FC = () => {
  const classes = DashboardStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const [sitesViewTabName, setSitesViewTabName] = useState<DashboardSitesViewTab>(DashboardSitesViewTab.Map);

  const { loading, error, response, onGet } = useGet<OnPremDevicesResponse>();

  const onTabChange = (event: React.SyntheticEvent<Element, Event>, value: string | number) => {
    setSitesViewTabName(value as DashboardSitesViewTab);
  };

  useEffect(() => {
    onGet(TopoApi.getOnPremDeviceList(), userContext.accessToken!);
  }, []);

  const convertDataToFeatures = useCallback(
    (devices: Device[] = []): Feature[] => {
      return devices.map(device => ({
        type: 'Feature',
        properties: { title: '', description: '' },
        geometry: {
          coordinates: [device.lon, device.lat],
          type: 'Point',
          name: device.id,
        },
      }));
    },
    [response],
  );

  return (
    <div className={classes.flexContainer}>
      <div className={classes.sitesContainer}>
        <div className={classes.sitesHeader}>
          <div className={classes.sitesHeaderLeftSection}>
            <span className={classes.sites}>Sites</span>
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
          <TableWrapper className={classes.tableWrapper}>
            <DataTable className={classes.sitesTable} id="meraki_sites" responsiveLayout="scroll" value={SITES_DATA} scrollable={true} scrollDirection="both" scrollHeight="flex">
              <Column
                style={{
                  fontSize: '12px',
                  color: '#848DA3',
                  fontWeight: 700,
                  width: SITES_COLUMNS.name.width,
                  minWidth: SITES_COLUMNS.name.minWidth,
                }}
                field={SITES_COLUMNS.name.field}
                header={SITES_COLUMNS.name.label}
              ></Column>
              <Column
                style={{ fontSize: '12px', color: '#848DA3', fontWeight: 700, width: SITES_COLUMNS.name.width, minWidth: SITES_COLUMNS.name.minWidth }}
                field={SITES_COLUMNS.uplinkType.field}
                header={SITES_COLUMNS.uplinkType.label}
              ></Column>
              <Column
                style={{ fontSize: '12px', color: '#848DA3', fontWeight: 700, width: SITES_COLUMNS.name.width, minWidth: SITES_COLUMNS.name.minWidth }}
                field={SITES_COLUMNS.availability.field}
                header={SITES_COLUMNS.availability.label}
              ></Column>
              <Column
                style={{ fontSize: '12px', color: '#848DA3', fontWeight: 700, width: SITES_COLUMNS.name.width, minWidth: SITES_COLUMNS.name.minWidth }}
                field={SITES_COLUMNS.totalUsage.field}
                header={SITES_COLUMNS.totalUsage.label}
              ></Column>
              <Column
                style={{ fontSize: '12px', color: '#848DA3', fontWeight: 700, width: SITES_COLUMNS.name.width, minWidth: SITES_COLUMNS.name.minWidth }}
                field={SITES_COLUMNS.avgBandwidth.field}
                header={SITES_COLUMNS.avgBandwidth.label}
              ></Column>
              <Column
                style={{ fontSize: '12px', color: '#848DA3', fontWeight: 700, width: SITES_COLUMNS.name.width, minWidth: SITES_COLUMNS.name.minWidth }}
                field={SITES_COLUMNS.latency.field}
                header={SITES_COLUMNS.latency.label}
              ></Column>
              <Column
                style={{ fontSize: '12px', color: '#848DA3', fontWeight: 700, width: SITES_COLUMNS.name.width, minWidth: SITES_COLUMNS.name.minWidth }}
                field={SITES_COLUMNS.jitter.field}
                header={SITES_COLUMNS.jitter.label}
              ></Column>
              <Column
                style={{ fontSize: '12px', color: '#848DA3', fontWeight: 700, width: SITES_COLUMNS.name.width, minWidth: SITES_COLUMNS.name.minWidth }}
                field={SITES_COLUMNS.packetLoss.field}
                header={SITES_COLUMNS.packetLoss.label}
              ></Column>
              <Column
                style={{ fontSize: '12px', color: '#848DA3', fontWeight: 700, width: SITES_COLUMNS.name.width, minWidth: SITES_COLUMNS.name.minWidth }}
                field={SITES_COLUMNS.goodput.field}
                header={SITES_COLUMNS.goodput.label}
              ></Column>
            </DataTable>
          </TableWrapper>
        )}
      </div>
      <div className={classes.rightContainer}>
        <DashboardItemContainer margin="0 0 15px 0" height="calc(50% - 15px)" flex="1 1 calc(50% - 15px)">
          <DashboardItemLabel>Management</DashboardItemLabel>
          <DashboardItemContent>
            <ManagementDrifts />
            <InOutBound styles={{ margin: '0 20px' }} />
            <ManagementLayer7 />
          </DashboardItemContent>
        </DashboardItemContainer>
        <DashboardItemContainer margin="15px 0 0 0" height="calc(50% - 15px)" flex="1 1 calc(50% - 15px)">
          <DashboardItemLabel>Anomalies</DashboardItemLabel>
        </DashboardItemContainer>
      </div>
    </div>
  );
};

export default React.memo(DashboardPage);
