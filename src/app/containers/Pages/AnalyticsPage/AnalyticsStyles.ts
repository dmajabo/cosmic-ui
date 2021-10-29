import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const AnalyticsStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      analyticsContainer: {
        padding: 30,
        position: 'fixed',
      },
      fixedTabBar: {
        position: 'fixed',
        width: '100%',
        marginTop: -20,
        paddingTop: 10,
        paddingBottom: 10,
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
        height: '100%',
      },
      metricsExplorerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        width: '100vw',
      },
      leftBox: {},
      rightBox: {
        backgroundColor: 'white',
        marginTop: -90,
        marginRight: 120,
        width: 450,
        height: '100vh',
        zIndex: 3,
        padding: 30,
        overflow: 'scroll',
      },
      containerTitle: {
        fontSize: 22,
        fontWeight: 700,
        color: '#05143A',
        marginBottom: 20,
        position: 'fixed',
        backgroundColor: 'white',
        width: 450,
        marginLeft: -30,
        marginTop: -30,
        paddingLeft: 30,
        paddingTop: 20,
        paddingBottom: 10,
      },
      rightBoxContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 60,
      },
      customizationTabContainer: {
        background: '#FBFCFE',
        border: '1px solid #CBD2DC',
        boxSizing: 'border-box',
        borderRadius: 6,
        width: 390,
        marginBottom: 10,
        padding: 17,
      },
      tabTitleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      tabTitle: {
        fontSize: 16,
        fontWeight: 500,
        marginLeft: 15,
      },
      countText: {
        fontSize: 12,
        fontWeight: 500,
        color: '#437FEC',
        marginLeft: 15,
      },
      operationImage: {
        marginRight: 20,
        cursor: 'pointer',
      },
      arrow: {
        cursor: 'pointer',
      },
      hidden: {
        display: 'none',
      },
      tabContent: {
        marginTop: 20,
        width: 270,
        margin: 'auto',
      },
      tabContentText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#848DA3',
      },
    }),
  {
    index: 1,
  },
);
