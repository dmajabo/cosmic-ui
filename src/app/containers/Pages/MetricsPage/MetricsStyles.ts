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
    }),
  {
    index: 1,
  },
);