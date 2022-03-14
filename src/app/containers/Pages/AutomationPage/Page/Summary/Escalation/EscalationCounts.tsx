import { ALERT_TIME_RANGE_QUERY_TYPES, paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import { AlertApi } from 'lib/api/ApiModels/Services/alert';
import { IAlertMeta, IAlertMetaDataRes, ModelalertType } from 'lib/api/ApiModels/Workflow/apiModel';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import React, { useEffect, useState } from 'react';
import { EscalationCountItem } from './EscalationCountItem';

interface EscalationCountsProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
}

export const EscalationCounts: React.FC<EscalationCountsProps> = ({ timeRange }) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGet } = useGet<IAlertMetaDataRes>();
  const [alertMetadata, setAlertMetadata] = useState<IAlertMeta[]>([]);

  useEffect(() => {
    const _param = paramBuilder(10, 1, timeRange);
    onGet(AlertApi.getAllMetadata(), userContext.accessToken!, _param);
  }, [timeRange]);

  useEffect(() => {
    if (response && response.alertMetadata && response.alertMetadata.length) {
      setAlertMetadata(response.alertMetadata);
    }
  }, [response]);

  const getAlertTriggerCount = (alertType: ModelalertType) => alertMetadata.find(alert => alert.type === alertType)?.triggerCount;

  return (
    <>
      <EscalationCountItem loading={loading} error={error} dataColor="#52984E" label="Latency" data={getAlertTriggerCount(ModelalertType.ANOMALY_LATENCY)} />
      <EscalationCountItem loading={loading} error={error} dataColor="#DC4545" label="Packet Loss" data={getAlertTriggerCount(ModelalertType.ANOMALY_PACKETLOSS)} />
      <EscalationCountItem loading={loading} error={error} dataColor="#F9BA55" label="Jitter" data={getAlertTriggerCount(ModelalertType.ANOMALY_JITTER)} />
      <EscalationCountItem loading={loading} error={error} dataColor="#437FEC" label="Device" data={getAlertTriggerCount(ModelalertType.DEVICE_CONNECTIVITY_HEALTH)} />
      <EscalationCountItem loading={loading} error={error} dataColor="#673AB7" label="Failover" data={null} />
    </>
  );
};
