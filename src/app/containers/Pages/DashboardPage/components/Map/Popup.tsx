import { downRedArrow, upGreenArrow } from 'app/components/SVGIcons/arrows';
import { getCorrectedTimeString } from 'app/containers/Pages/MetricsPage/components/Utils';
import startCase from 'lodash/startCase';
import isNumber from 'lodash/isNumber';
import { DateTime } from 'luxon';
import React from 'react';
import { DashboardStyles } from '../../DashboardStyles';
import { Properties } from './Map';
import { DeviceMetrics } from '../../enum';
import { getAvailabilityArray, INPUT_TIME_FORMAT, AVAILABILITY_TIME_FORMAT } from '../../Page/MerakiDashboard';

interface PopupProps {
  readonly properties: Properties;
  readonly deviceMetrics: DeviceMetrics[];
}

export const Popup: React.FC<PopupProps> = ({ properties, deviceMetrics }) => {
  const classes = DashboardStyles();
  const selectedDeviceMetrics = deviceMetrics?.find(item => item.extId === properties.title);
  const bytesSent = selectedDeviceMetrics?.bytesSendUsage / 1000000;
  const bytesRecieved = selectedDeviceMetrics?.bytesReceivedUsage / 1000000;
  return (
    <>
      <div className={classes.popupContainer}>
        <div className={classes.popupHeaderContainer}>
          <span className={classes.popupTitle}>{properties.name}</span>
        </div>
        <hr className={classes.popupHr} />
        <div className={`${classes.popupItemContainer} ${classes.troubleshootContainer}`}>
          <div className={classes.popupContentLabel}>Availability: </div>
          <div className={classes.popupConnectivityContainer}>
            {getAvailabilityArray(selectedDeviceMetrics?.availabilityMetrics || []).map(item => {
              const timestamp = DateTime.fromFormat(getCorrectedTimeString(item.time), INPUT_TIME_FORMAT).toFormat(AVAILABILITY_TIME_FORMAT);
              if (Number(item.value) > 0) {
                return <div title={timestamp} key={item.time} className={classes.connectivityUnavailableItem} />;
              }
              return <div title={timestamp} key={item.time} className={classes.connectivityAvailableItem} />;
            })}
          </div>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Total Usage: </span>
          <span>
            <span className={classes.totalUsageIcon}>{upGreenArrow}</span>
            <span title="Bytes Sent">{`${bytesSent > 0 ? bytesSent.toFixed(2) : 0} MB`}</span>
            <span className={classes.totalUsageIcon}>{downRedArrow}</span>
            <span title="Bytes Recieved">{`${bytesRecieved > 0 ? bytesRecieved.toFixed(2) : 0} MB`}</span>
          </span>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Packet Loss: </span>
          <span className={classes.popupContentValue}>{isNumber(selectedDeviceMetrics?.packetloss) ? `${selectedDeviceMetrics.packetloss}%` : 'NaN'}</span>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Latency: </span>
          <span className={classes.popupContentValue}>{isNumber(selectedDeviceMetrics?.latency) ? `${selectedDeviceMetrics.latency.toFixed(2)} ms` : 'NaN'}</span>
        </div>
        <div className={classes.popupItemContainer}>
          <span className={classes.popupContentLabel}>Goodput: </span>
          <span className={classes.popupContentValue}>{isNumber(selectedDeviceMetrics?.goodput) ? `${selectedDeviceMetrics.goodput / 1000} mbps` : 'NaN'}</span>
        </div>
        <div className={classes.popupItemContainer}>
          {properties.uplinks.map(item => (
            <div key={item.extId}>
              <span className={classes.popupContentLabel}>{`${startCase(item.name)}(Uplink): `}</span>
              <span className={classes.popupContentValue}>{` ${startCase(item.status)}`}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
