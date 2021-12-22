import React, { useContext } from 'react';
import { ActionPart, ActionRowStyles, CardWrapper, ContentWrapper, PageContentWrapper, TableWrapper } from '../../Shared/styles';
import SessionCard from 'app/components/SessionCard';
import { sourcesIcon } from 'app/components/SVGIcons/sessionsIcons/sources';
import { tgwIcon } from 'app/components/SVGIcons/sessionsIcons/tgw';
import { destinationIcon } from 'app/components/SVGIcons/sessionsIcons/destination';
// import { dropsIcon } from 'app/components/SVGIcons/sessionsIcons/drops';
// import { securityHitsIcon } from 'app/components/SVGIcons/sessionsIcons/securityHits';

import ChartComponent from './ChartComponent';
import Dropdown from 'app/components/Inputs/Dropdown';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
import { SessionsTabTypes, SESSIONS_SELECT_VALUES } from 'lib/hooks/Sessions/model';
import { ISelectedListItem } from 'lib/models/general';
import { ISankeyAppDetail, ISankeyDetailRes, ISankeyRes } from 'lib/api/ApiModels/Sessions/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import GridComponent from './GridComponent';
import { SESSIONS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { TelemetryApi } from 'lib/api/ApiModels/Services/telemetry';
interface IProps {}
const OverviewPage: React.FC<IProps> = (props: IProps) => {
  const userContext = useContext<UserContextState>(UserContext);
  const { sessions } = useSessionsDataContext();
  const { response, loading, error, onGet } = useGet<ISankeyRes>();
  const { response: resDetails, loading: detailsLoading, error: detailsError, onGet: onGetDetails } = useGet<ISankeyDetailRes>();
  const [data, setData] = React.useState<ISankeyRes>(null);
  const [detailData, setDetailData] = React.useState<ISankeyAppDetail>(null);
  React.useEffect(() => {
    if (sessions.sessionsOverviewPeriod) {
      setDetailData(null);
      onTryToLoadData(sessions.sessionsOverviewPeriod);
    }
  }, [sessions.sessionsOverviewPeriod]);

  React.useEffect(() => {
    if (response) {
      setData({ ...response });
    }
  }, [response]);

  React.useEffect(() => {
    if (resDetails && resDetails.sankeydetail) {
      setDetailData(resDetails.sankeydetail);
    } else {
      setDetailData(null);
    }
  }, [resDetails]);

  const onLoadDetails = (netName: string, destName: string) => {
    const _item = SESSIONS_SELECT_VALUES.find(it => it.id === sessions.sessionsOverviewPeriod || it.value === sessions.sessionsOverviewPeriod);
    const time = _item && _item.data ? _item.data : '-7d';
    onTryToLoadDetails(netName, destName, time);
  };

  const onTryToLoadData = async (timePeriod: SESSIONS_TIME_RANGE_QUERY_TYPES) => {
    const _item = SESSIONS_SELECT_VALUES.find(it => it.id === timePeriod || it.value === timePeriod);
    await onGet(TelemetryApi.getSankeyData(_item.data || '-7d'), userContext.accessToken!);
  };

  const onTryToLoadDetails = async (netName: string, destName: string, timePeriod: string) => {
    await onGetDetails(TelemetryApi.getAppDetails(netName, destName, timePeriod), userContext.accessToken!);
  };

  const onChangePeriod = (_value: ISelectedListItem<SESSIONS_TIME_RANGE_QUERY_TYPES>) => {
    sessions.onChangeSelectedPeriod(_value, SessionsTabTypes.Overview);
  };

  return (
    <PageContentWrapper>
      <ActionRowStyles margin="0 0 30px 0">
        <ActionPart margin="0 0 0 auto">
          <Dropdown
            wrapStyles={{ height: '50px', border: '1px solid var(--_primaryButtonBorder)', borderRadius: '6px' }}
            label="Show"
            selectedValue={sessions.sessionsOverviewPeriod}
            values={SESSIONS_SELECT_VALUES}
            onSelectValue={onChangePeriod}
          />
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
        <ChartComponent loading={loading} errorMessage={error ? error.message : null} data={data} onLoadDetails={onLoadDetails} />
        <TableWrapper>
          <GridComponent data={detailData} loading={detailsLoading} errorMessage={detailsError && detailsError.message} />
        </TableWrapper>
      </ContentWrapper>
    </PageContentWrapper>
  );
};

export default React.memo(OverviewPage);
