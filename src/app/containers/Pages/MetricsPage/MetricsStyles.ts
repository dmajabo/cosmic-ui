import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { APP_HEADER_HEIGHT } from 'lib/constants/general';

export const MetricsStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      metricsPageContainer: {
        padding: 40,
      },
      tabContainer: {
        flexGrow: 1,
        minHeight: 'calc(100% - 68px)', // 68px equal to tab panel height
      },
      tabLabel: {
        textTransform: 'none',
        color: 'var(--_tabHeaderTextColor)',
        fontSize: 18,
        fontWeight: 700,
      },
      activeTabLabel: {
        textTransform: 'none',
        color: '#1976d2',
        fontSize: 18,
        fontWeight: 700,
      },
      fixedTabBar: {
        position: 'sticky',
        top: APP_HEADER_HEIGHT,
        paddingTop: 10,
        width: '100%',
        backgroundColor: 'var(--_appBg)',
        zIndex: 2,
      },
      endFlexContainer: {
        display: 'flex',
        justifyContent: 'end',
      },
      otherButtonText: {
        fontSize: 12,
        fontWeight: 700,
        paddingRight: 10,
      },
      anomalyTimeRangeText: {
        fontSize: 14,
        color: 'var(--_tabHeaderTextColor)',
        paddingRight: 20,
        paddingLeft: 10,
      },
      inlineSelect: {
        display: 'inline-block',
        width: 200,
      },
      pageComponentBackground: {
        backgroundColor: 'white',
        padding: 40,
        marginTop: 30,
      },
      pageComponentTitle: {
        fontSize: 22,
        fontWeight: 700,
        color: '#05143A',
        padding: '30px 0',
      },
      legendContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30,
      },
      legendText: {
        fontSize: 16,
        fontWeight: 500,
        paddingLeft: 10,
        paddingRight: '5vw',
      },
      pageComponentTitleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      metricComponentTitleContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      pillContainer: {
        marginLeft: '20px',
        backgroundColor: '#437FEC',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
      },
      pillText: {
        fontSize: '12px',
        fontWeight: 500,
        color: '#FFFFFF',
        lineHeight: '16px',
        padding: '0px 10px 0px 10px',
      },
      noChartText: {
        color: '#848DA3',
        fontSize: 14,
        fontWeight: 400,
      },
      noChartContainer: {
        padding: 250,
        textAlign: 'center',
      },
    }),
  {
    index: 1,
  },
);
