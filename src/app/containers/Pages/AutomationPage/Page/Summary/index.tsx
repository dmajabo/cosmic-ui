import MatSelect from 'app/components/Inputs/MatSelect';
import { pdfIcon } from 'app/components/SVGIcons/pdfIcon';
import SecondaryButtonwithEvent from 'app/containers/Pages/AnalyticsPage/components/SecondaryButtonwithEvent';
import React, { useRef, useState } from 'react';
import { SummaryHeaderContainer } from './styles';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SummaryComponent } from './SummaryComponent';
import { ALERT_TIME_RANGE_QUERY_TYPES, convertPeriodToUserFriendlyString } from 'lib/api/ApiModels/paramBuilders';
import { MetricsProvider, useMetricsActions } from 'lib/hooks/Metrics/useMetricsDataContent';

export const Summary: React.FC = () => {
  const componentRef = useRef(null);
  const [timeRange, setTimeRange] = useState<ALERT_TIME_RANGE_QUERY_TYPES>(ALERT_TIME_RANGE_QUERY_TYPES.LAST_WEEK);
  const metricsActions = useMetricsActions();

  const onTimeRangeChange = (value: ALERT_TIME_RANGE_QUERY_TYPES) => setTimeRange(value);

  const handlePrint = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Summary.pdf');
  };

  return (
    <MetricsProvider actions={metricsActions}>
      <SummaryHeaderContainer>
        <SecondaryButtonwithEvent styles={{ border: 'none' }} label="Download as PDF" icon={pdfIcon} onClick={handlePrint} />
        <MatSelect
          id="logsTimePeriod"
          label="Show"
          labelStyles={{ margin: 'auto 10px auto 0' }}
          value={timeRange}
          options={[ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY, ALERT_TIME_RANGE_QUERY_TYPES.LAST_WEEK]}
          onChange={onTimeRangeChange}
          renderValue={(v: ALERT_TIME_RANGE_QUERY_TYPES) => convertPeriodToUserFriendlyString(v)}
          renderOption={(v: ALERT_TIME_RANGE_QUERY_TYPES) => convertPeriodToUserFriendlyString(v)}
          styles={{ height: '50px', minHeight: '50px', width: 'auto', display: 'inline-flex', alignItems: 'center' }}
          selectStyles={{ height: '50px', width: 'auto', minWidth: '240px', border: '1px solid transparent' }}
        />
      </SummaryHeaderContainer>
      <SummaryComponent ref={componentRef} timeRange={timeRange} />
    </MetricsProvider>
  );
};
