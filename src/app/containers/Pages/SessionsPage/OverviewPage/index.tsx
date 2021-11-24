import React, { useContext } from 'react';
import { ActionPart, ActionRowStyles, CardWrapper, ContentWrapper, TableWrapper } from '../../Shared/styles';
import SessionCard from 'app/components/SessionCard';
import { sourcesIcon } from 'app/components/SVGIcons/sessionsIcons/sources';
import { tgwIcon } from 'app/components/SVGIcons/sessionsIcons/tgw';
import { destinationIcon } from 'app/components/SVGIcons/sessionsIcons/destination';
// import { dropsIcon } from 'app/components/SVGIcons/sessionsIcons/drops';
// import { securityHitsIcon } from 'app/components/SVGIcons/sessionsIcons/securityHits';
import Grid from 'app/components/Grid';
import { GridColDef } from '@mui/x-data-grid';
import ChartComponent from './ChartComponent';
import Dropdown from 'app/components/Inputs/Dropdown';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { SessionsSelectValuesTypes, SessionsTabTypes, SESSIONS_SELECT_VALUES } from 'lib/hooks/Sessions/model';
import { ISelectedListItem } from 'lib/models/general';
import { ISankeyRes } from 'lib/api/ApiModels/Sessions/apiModel';
import { SessionsApi } from 'lib/api/ApiModels/Sessions/endpoints';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
interface IProps {}
const OverviewPage: React.FC<IProps> = (props: IProps) => {
  const userContext = useContext<UserContextState>(UserContext);
  const { sessions } = useSessionsDataContext();
  const [columns] = React.useState<GridColDef[]>([
    { field: 'id', headerName: '', minWidth: 40 },
    { field: 'time', headerName: 'Time', minWidth: 120 },
    { field: 'sessionId', headerName: 'Session ID', minWidth: 150 },
    { field: 'sourceIp', headerName: 'Source IP', minWidth: 150 },
    { field: 'destinationIp', headerName: 'Destination IP', minWidth: 200 },
    { field: 'sourcePort', headerName: 'Source Port', minWidth: 150 },
    { field: 'destinationPort', headerName: 'Destination Port', minWidth: 200 },
    { field: 'protocol', headerName: 'Protocol', minWidth: 150 },
    { field: 'x', headerName: 'AWS TGW', minWidth: 150 },
    { field: 'application', headerName: 'Application', minWidth: 200 },
    { field: 'policyId', headerName: 'Policy ID', minWidth: 150 },
  ]);

  const { response, loading, error, onGet } = useGet<ISankeyRes>();
  const [data, setData] = React.useState<ISankeyRes>(null);
  React.useEffect(() => {
    if (sessions.sessionsOverviewPeriod) {
      onTryToLoadData(sessions.sessionsOverviewPeriod);
    }
  }, [sessions.sessionsOverviewPeriod]);

  React.useEffect(() => {
    if (response) {
      // const _d: ISankeyRes = {
      //   sankey: {
      //     time: '',
      //     nodes: [
      //       { node: 0, name: 'NETWORK_2', type: 'SANKEY_NETWORK' },
      //       { node: 1, name: 'DESTINATION_2', type: 'SANKEY_DESTINATION' },
      //       { node: 2, name: 'NETWORK_5', type: 'SANKEY_NETWORK' },
      //       { node: 3, name: 'DESTINATION_5', type: 'SANKEY_DESTINATION' },
      //       { node: 4, name: 'NETWORK_6', type: 'SANKEY_NETWORK' },
      //       { node: 5, name: 'DESTINATION_6', type: 'SANKEY_DESTINATION' },
      //       { node: 6, name: 'NETWORK_7', type: 'SANKEY_NETWORK' },
      //       { node: 7, name: 'DESTINATION_7', type: 'SANKEY_DESTINATION' },
      //       { node: 8, name: 'NETWORK_1', type: 'SANKEY_NETWORK' },
      //       { node: 9, name: 'DESTINATION_1', type: 'SANKEY_DESTINATION' },
      //       { node: 10, name: 'NETWORK_3', type: 'SANKEY_NETWORK' },
      //       { node: 11, name: 'DESTINATION_3', type: 'SANKEY_DESTINATION' },
      //       { node: 12, name: 'NETWORK_4', type: 'SANKEY_NETWORK' },
      //       { node: 13, name: 'DESTINATION_4', type: 'SANKEY_DESTINATION' },
      //       { node: 14, name: 'NETWORK_8', type: 'SANKEY_NETWORK' },
      //       { node: 15, name: 'DESTINATION_8', type: 'SANKEY_DESTINATION' },
      //       { node: 16, name: 'NETWORK_9', type: 'SANKEY_NETWORK' },
      //       { node: 17, name: 'DESTINATION_9', type: 'SANKEY_DESTINATION' },
      //       { node: 18, name: 'NETWORK_0', type: 'SANKEY_NETWORK' },
      //       { node: 19, name: 'DESTINATION_0', type: 'SANKEY_DESTINATION' },
      //     ],
      //     links: [
      //       { source: 0, target: 1, value: 34 },
      //       { source: 2, target: 3, value: 34 },
      //       { source: 4, target: 5, value: 34 },
      //       { source: 6, target: 7, value: 34 },
      //       { source: 8, target: 9, value: 34 },
      //       { source: 10, target: 11, value: 34 },
      //       { source: 12, target: 13, value: 34 },
      //       { source: 14, target: 15, value: 34 },
      //       { source: 16, target: 17, value: 34 },
      //       { source: 18, target: 19, value: 34 },
      //     ],
      //   },
      //   netcount: 10,
      //   tgwcount: 0,
      //   appcount: 1,
      // };
      setData({ ...response });
    }
  }, [response]);

  const onTryToLoadData = async (timePeriod: SessionsSelectValuesTypes) => {
    const _item = SESSIONS_SELECT_VALUES.find(it => it.id === timePeriod || it.value === timePeriod);
    await onGet(SessionsApi.getSankeyData(_item.data || '-7d'), userContext.accessToken!);
  };

  const onChangePeriod = (_value: ISelectedListItem<SessionsSelectValuesTypes>) => {
    sessions.onChangeSelectedPeriod(_value, SessionsTabTypes.Overview);
  };

  return (
    <>
      <ActionRowStyles>
        <ActionPart margin="0 0 0 auto">
          <Dropdown label="Show" selectedValue={sessions.sessionsOverviewPeriod} values={SESSIONS_SELECT_VALUES} onSelectValue={onChangePeriod} />
        </ActionPart>
      </ActionRowStyles>
      <CardWrapper>
        <SessionCard styles={{ margin: '0' }} label="Total Sources" value={data ? data.netcount : null} icon={sourcesIcon} valueColor="var(--_successColor)" />
        <SessionCard styles={{ margin: '0 30px' }} label="TGW" value={data ? data.tgwcount : null} icon={tgwIcon} valueColor="var(--_hoverButtonBg)" />
        <SessionCard styles={{ margin: '0' }} label="Destinations" value={data ? data.appcount : null} icon={destinationIcon} valueColor="var(--_warningColor)" />
        {/* <SessionCard styles={{ margin: '0 20px 0 0' }} label="Session Drops" value="5" icon={dropsIcon} valueColor="var(--_errorColor)" />
        <SessionCard label="Security Group Hits" value="6" icon={securityHitsIcon} valueColor="var(--_warningColor)" /> */}
      </CardWrapper>
      <ContentWrapper>
        <ChartComponent loading={loading} errorMessage={error ? error.message : null} data={data} />
        <TableWrapper>
          <Grid checkboxSelection rows={[]} columns={columns} />
        </TableWrapper>
      </ContentWrapper>
    </>
  );
};

export default React.memo(OverviewPage);
