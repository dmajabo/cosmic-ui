import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const PerformanceDashboardStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      tabLabel: {
        textTransform: 'none',
        fontSize: 18,
        fontWeight: 700,
      },
      pageCenter: {
        marginTop: '40vh',
      },
      slaTestListContainer: {
        paddingTop: 20,
        backgroundColor: 'var(--_primaryBg)',
      },
      itemContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: 'var(--_primaryBg)',
        marginBottom: 30,
      },
      flexContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      itemTitle: {
        fontSize: 22,
        marginTop: 10,
        color: 'var(--_primaryTextColor)',
        fontWeight: 700,
      },
      slaTestButton: {
        backgroundColor: '#437FEC',
        height: 50,
      },
      slaTestButtonText: {
        fontSize: 12,
        fontWeight: 700,
        paddingRight: 10,
      },
      otherButton: {
        backgroundColor: 'white',
        border: '1px solid #CBD2DC',
        marginRight: 20,
        height: 50,
      },
      otherButtonText: {
        fontSize: 12,
        fontWeight: 700,
        paddingRight: 10,
      },
      subTitleText: {
        color: '#848DA3',
        fontSize: 14,
        paddingTop: 10,
        fontWeight: 400,
      },
      tableContainer: {
        marginTop: 20,
      },
      tableHeaderText: {
        fontWeight: 700,
        fontSize: 12,
        color: '#848DA3',
      },
      tableRowText: {
        fontSize: 16,
        fontWeight: 500,
      },
      averageQoeText: {
        paddingTop: 10,
      },
      qoeValueText: {
        paddingLeft: 5,
        paddingRight: 10,
      },
      checkbox: {
        width: 20,
        height: 20,
        marginTop: 5,
      },
      paginationText: {
        fontSize: 16,
        fontWeight: 500,
        color: 'var(--_primaryTextColor)',
        backgroundColor: 'var(--_primaryBg)',
      },
      activePaginationText: {
        fontSize: 16,
        fontWeight: 500,
        backgroundColor: 'var(--_primaryBg)',
        color: 'var(--_primaryTextColor)',
      },
      paginationButton: {
        border: 'none',
        backgroundColor: 'var(--_primaryBg)',
        cursor: 'pointer',
      },
      paginationSelect: {
        width: 60,
        height: 35,
        border: '1px solid #CBD2DC',
        borderRadius: 6,
        marginLeft: 10,
        marginRight: 10,
      },
      createSlaTestContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      slaFormElementContainer: {
        width: 560,
        padding: 20,
        backgroundColor: 'var(--_primaryBg)',
      },
      formInputContainer: {
        marginTop: 20,
      },
      slaTestButtonConatiner: {
        marginTop: 20,
      },
      slaFormButton: {
        backgroundColor: '#437FEC',
        height: 60,
      },
      slaInput: {
        width: '100%',
        height: 60,
        borderRadius: 6,
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 500,
        border: '1px solid rgba(109, 121, 134, 0.3)',
      },
      tabContainer: {
        backgroundColor: '#F3F6FC',
        width: 490,
        borderRadius: 6,
        padding: 5,
        marginBottom: 20,
      },
      performanceTabContainer: {
        backgroundColor: 'var(--_tabContainerBg)',
        padding: 5,
        borderRadius: 6,
      },
      selectedTab: {
        backgroundColor: 'white',
        borderRadius: 6,
      },
      indicator: {
        backgroundColor: 'transparent',
      },
      sortIcon: {
        marginLeft: 15,
      },
      fixedTabBar: {
        position: 'fixed',
        width: '100%',
        marginTop: -20,
        paddingTop: 10,
        paddingBottom: 10,
        zIndex: 4,
        backgroundColor: '#F3F6FC',
      },
      tabTitleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      timeRangeContainer: {
        width: 250,
        display: 'flex',
        justifyContent: 'space-between',
        float: 'right',
      },
      timeRangeText: {
        color: '#848DA3',
        fontSize: 14,
        paddingTop: 10,
        fontWeight: 400,
        marginLeft: 10,
        marginRight: 5,
      },
      lineChartContainer: {
        marginTop: 40,
      },
      noChartText: {
        color: '#848DA3',
        fontSize: 14,
        fontWeight: 400,
      },
      noChartContainer: {
        padding: 150,
        textAlign: 'center',
      },
      deleteTest: {
        color: 'red',
      },
      hrLine: { backgroundColor: '#CBD2DC', marginBottom: 30 },
      startFlexContainer: {
        display: 'flex',
        justifyContent: 'start',
        marginTop: 40,
      },
      legendContainer: {
        minWidth: 200,
        paddingBottom: 20,
      },
      heatMapContainer: {
        marginTop: 30,
        marginLeft: 20,
        paddingBottom: 20,
        width: '100%',
      },
      legendGap: {
        marginTop: 30,
      },
      legendText: {
        color: '#848DA3',
        fontSize: 14,
        fontWeight: 400,
        marginLeft: 20,
        marginBottom: 10,
      },
      testName: {
        fontSize: 14,
        fontWeight: 500,
        height: 60,
        width: 180,
        color: '#05143A',
        textAlign: 'center',
        paddingTop: 20,
        padding: 10,
      },
      deviceName: {
        fontSize: 14,
        fontWeight: 500,
        color: '#05143A',
        height: 60,
        width: 180,
        paddingTop: 20,
        textAlign: 'right',
        padding: 10,
      },
      heatmapCell: {
        fontSize: 12,
        fontWeight: 500,
        padding: 10,
        width: 180,
        paddingTop: 20,
        borderRadius: 6,
        height: 60,
        color: 'white',
        textAlign: 'center',
      },
      nACell: {
        backgroundColor: '#FBFCFE',
        fontSize: 12,
        fontWeight: 500,
        borderRadius: 6,
        width: 180,
        paddingTop: 20,
        padding: 10,
        height: 60,
        color: '#05143A',
        textAlign: 'center',
      },
      popoverContainer: {
        padding: '10px 0px 10px 25px',
      },
      popoverItem: {
        border: '1px solid #e7edf9',
        backgroundColor: '#fbfcfe',
        paddingRight: 10,
      },
      popoverText: {
        fontSize: 12,
        fontWeight: 700,
      },
      marginButton: {
        marginRight: 20,
        position: 'relative',
      },
      searchBar: {
        border: '1px solid #CBD2DC',
        padding: 13,
        borderRadius: 6,
        width: '25vw',
      },
      searchIcon: {
        position: 'absolute',
        right: 15,
        bottom: 0,
      },
    }),
  {
    index: 1,
  },
);
