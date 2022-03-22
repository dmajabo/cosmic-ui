import { EmptyText } from 'app/components/Basic/NoDataStyles/NoDataStyles';
import { upRedArrow, downGreenArrow } from 'app/components/SVGIcons/arrows';
import transitGatewayIcon from 'app/components/SVGIcons/dashboardIcons/transitGatewayIcon';
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
import { AnomalySummary, AnomaliesResponse } from '../enum';
import {
  AWSGridContainer,
  DashboardItemContainer,
  DashboardItemHeaderContainer,
  DashboardItemHeaderTitle,
  DashboardItemLabel,
  GridItemContainer,
  MarkerCountContainer,
  MarkerIconContainer,
} from '../styles/ChartContainer';
import { SeverityLabelContainer, ArrowContainer } from '../styles/DashboardStyledComponents';
import { INPUT_TIME_FORMAT } from './MerakiDashboard';

const BASE_ANOMALIES_PAGE_SIZE = 10;

enum EscalationResult {
  downGreen = 'downGreen',
  upRed = 'upRed',
  showSeverity = 'showSeverity',
}

export const AwsDashboard: React.FC = () => {
  const classes = DashboardStyles();
  const userContext = useContext<UserContextState>(UserContext);
  const trafficActions = useTrafficActions();
  const { response, loading, error, onGet } = useGet<IWEdgesRes>();
  const [anomalies, setAnomalies] = useState<AnomalySummary[]>([]);
  const [alertMetadata, setAlertMetadata] = useState<IAlertMeta[]>([]);
  const { loading: alertMetadataLoading, response: alertMetadaResponse, onGet: GetAlertMetadata } = useGet<IAlertMetaDataRes>();
  const [anomaliesPageSize, setAnomaliesPageSize] = useState<number>(BASE_ANOMALIES_PAGE_SIZE);
  const { response: anomaliesResponse, loading: anomaliesLoading, error: anomaliesError, onGet: getAnomalies } = useGet<AnomaliesResponse>();

  const getAnomalySummaryPage = (pageSize: number) => getAnomalies(AlertApi.getAnomalies(), userContext.accessToken!, { pageSize: pageSize });

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

  useEffect(() => {
    if (anomaliesResponse && anomaliesResponse.anomalySummary && anomaliesResponse.anomalySummary.length) {
      setAnomalies(anomaliesResponse.anomalySummary);
    }
  }, [anomaliesResponse]);

  useEffect(() => {
    onGet(TopoApi.getWedges(), userContext.accessToken!);
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

  return (
    <TrafficProvider actions={trafficActions}>
      <AWSGridContainer>
        <GridItemContainer gridArea="1 / 1 / 2 / 2">
          <DashboardItemContainer>
            <DashboardItemHeaderContainer>
              <DashboardItemHeaderTitle>Transit Gateway</DashboardItemHeaderTitle>
              <div className={classes.pillContainer}>
                <span className={classes.pillText}>{response?.totalCount || 0}</span>
              </div>
            </DashboardItemHeaderContainer>
            <div className={classes.mapContainerMain}>
              <AWSMap features={convertWedgestoFeatures(response?.wEdges)} />
            </div>
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
