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
        zIndex: 5,
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
        marginBottom: 30,
      },
    }),
  {
    index: 1,
  },
);
