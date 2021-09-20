import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const PerformanceDashboardStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      tabLabel: {
        textTransform: 'none',
        fontSize: 18,
        fontWeight: 700,
      },
      performanceDashboardContainer: {
        padding: 20,
      },
      slaTestListContainer: {
        marginTop: 30,
      },
      itemContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
        marginBottom: 30,
      },
      flexContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      itemTitle: {
        fontSize: 22,
        color: 'black',
        fontWeight: 700,
      },
      slaTestButton: {
        backgroundColor: '#437FEC',
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
      packetLossValueText: {
        color: 'red',
        paddingLeft: 5,
        paddingRight: 10,
      },
      latencyValueText: {
        color: 'green',
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
        color: '#848DA3',
      },
      activePaginationText: {
        fontSize: 16,
        fontWeight: 500,
        color: '#05143A',
      },
      paginationButton: {
        border: 'none',
        backgroundColor: 'white',
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
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
      },
      slaFormElementContainer: {
        width: 560,
        padding: 20,
        backgroundColor: 'white',
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
        width: 330,
        borderRadius: 6,
        padding: 5,
        marginBottom: 20,
      },
      selectedTab: {
        backgroundColor: 'white',
        borderRadius: 6,
      },
      indicator: {
        backgroundColor: 'transparent',
      },
    }),
  {
    index: 1,
  },
);
