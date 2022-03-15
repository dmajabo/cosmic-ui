import { AxiosError } from 'axios';
import React from 'react';
import { AlertData, AlertType } from '../SummaryComponent';
import { EscalationCountItem } from './EscalationCountItem';

interface EscalationCountsProps {
  readonly loading: boolean;
  readonly error: AxiosError;
  readonly data: AlertData[];
}

export const EscalationCounts: React.FC<EscalationCountsProps> = ({ loading, error, data }) => {
  const getAlertTriggerCount = (alertType: AlertType) => data.find(item => item.alertType === alertType)?.totalCount || 0;

  return (
    <>
      <EscalationCountItem loading={loading} error={error} dataColor="#52984E" label="Latency" data={getAlertTriggerCount(AlertType.ANOMALY_LATENCY)} />
      <EscalationCountItem loading={loading} error={error} dataColor="#DC4545" label="Packet Loss" data={getAlertTriggerCount(AlertType.ANOMALY_PACKETLOSS)} />
      <EscalationCountItem loading={loading} error={error} dataColor="#F9BA55" label="Jitter" data={getAlertTriggerCount(AlertType.ANOMALY_JITTER)} />
      <EscalationCountItem loading={loading} error={error} dataColor="#437FEC" label="Device" data={getAlertTriggerCount(AlertType.DEVICE_CONNECTIVITY_HEALTH)} />
      {/* <EscalationCountItem loading={loading} error={error} dataColor="#673AB7" label="Failover" data={getAlertTriggerCount(AlertType.CELLULAR_FAILOVER)} /> */}
    </>
  );
};
