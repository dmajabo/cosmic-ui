import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const AnalyticsStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      analyticsContainer: {
        padding: 30,
      },
      fixedTabBar: {
        position: 'fixed',
        width: '100%',
        marginTop: -20,
        paddingTop: 10,
        paddingBottom: 10,
        zIndex: 1,
        backgroundColor: '#F3F6FC',
      },
      tabLabel: {
        textTransform: 'none',
        color: '#848DA3',
        fontSize: 18,
        fontWeight: 700,
      },
      activeTabLabel: {
        textTransform: 'none',
        color: '#05143A',
        fontSize: 18,
        fontWeight: 700,
      },
      tabContainer: {
        marginTop: 60,
      },
      metricsExplorerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      leftBox: {},
      rightBox: {
        backgroundColor: 'white',
        height: '100vh',
        marginTop: -90,
        marginRight: -30,
        width: 450,
        zIndex: 3,
      },
    }),
  {
    index: 1,
  },
);
