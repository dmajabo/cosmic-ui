import { ALERT_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import React from 'react';
import { DeviceHealth } from './Escalation/DeviceHealth';
import { EscalationCounts } from './Escalation/EscalationCounts';
import { Failover } from './Escalation/Failover';
import { NetworkAggregatedEscalation } from './Escalation/NetworkAggregatedEscalation';
import { GridContainer, SummaryItemContainer, SummaryItemContent, SummaryItemDivider, SummaryItemLabel } from './styles';
import { ApplicationTable } from './Traffic/ApplicationTable';
import { NetworkTable } from './Traffic/NetworkTable';

interface SummaryComponentProps {
  readonly timeRange: ALERT_TIME_RANGE_QUERY_TYPES;
}

export const SummaryComponent = React.forwardRef(({ timeRange }: SummaryComponentProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      <GridContainer>
        <SummaryItemContainer>
          <SummaryItemLabel>Escalations</SummaryItemLabel>
          <SummaryItemContent>
            <EscalationCounts timeRange={timeRange} />
          </SummaryItemContent>
          <SummaryItemDivider />
          <NetworkAggregatedEscalation timeRange={timeRange} />
          <SummaryItemDivider style={{ marginTop: 30, marginBottom: 20 }} />
          <Failover timeRange={timeRange} />
          <SummaryItemDivider />
          <DeviceHealth timeRange={timeRange} />
        </SummaryItemContainer>
        <SummaryItemContainer>
          <SummaryItemLabel>Traffic</SummaryItemLabel>
          <NetworkTable timeRange={timeRange} />
          <ApplicationTable timeRange={timeRange} />
        </SummaryItemContainer>
      </GridContainer>
    </div>
  );
});
