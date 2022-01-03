import React from 'react';
import { DashboardStyles } from '../DashboardStyles';
import { NetworkValueTrend } from '../enum/NetworkValueTrend';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { Typography, CardContent } from '@mui/material';
import { ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
/* eslint-disable react/style-prop-object */
interface NetworkTileProps {
  readonly value: number;
  readonly change: number;
  readonly arrowDirection: NetworkValueTrend;
}

const NetworkTile: React.FC<NetworkTileProps> = ({ value, change, arrowDirection }) => {
  const classes = DashboardStyles();

  const changeValueStyling = arrowDirection === NetworkValueTrend.Up ? classes.valueUpText : classes.valueDownText;

  const arrowIcon =
    arrowDirection === NetworkValueTrend.Up ? <ArrowUpwardIcon className={changeValueStyling} fontSize="medium" /> : <ArrowDownwardIcon className={changeValueStyling} fontSize="medium" />;

  return (
    <CardContent className={classes.cardWidth}>
      <Typography className={classes.cardContent}>{value}</Typography>
      <div className={classes.valueChangeContainer}>
        <IntlProvider locale={navigator.language}>
          <Typography className={changeValueStyling}>
            <FormattedNumber value={change / 100} style="percent" />
            {arrowIcon}
          </Typography>
        </IntlProvider>
      </div>
    </CardContent>
  );
};
export default NetworkTile;
