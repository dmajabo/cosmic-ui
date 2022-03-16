import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import cisco_sites from './Icons/cisco_sites.svg';

export const DashboardStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      sitesHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 0 20px 0px',
        flexShrink: 0,
      },
      mapContainerMain: {
        border: '1px solid #CBD2DC',
        borderRadius: '6px',
        overflow: 'hidden',
        flexGrow: 1,
      },
      tableWrapper: {
        width: '100%',
        maxHeight: 'calc(100% - 50px)',
        height: 'auto',
        flexGrow: 'unset',
        margin: '0 0 auto 0',
      },
      sitesTableHeaderCell: { fontSize: '12px', color: '#848DA3', fontWeight: 700 },
      sitesHeaderLeftSection: {
        display: 'flex',
        alignItems: 'center',
      },
      sites: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#05143A',
      },
      pillContainer: {
        marginLeft: '20px',
        backgroundColor: '#437FEC',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      pillText: {
        fontSize: '12px',
        fontWeight: 500,
        color: '#FFFFFF',
        lineHeight: '16px',
        padding: '2px 10px 2px 10px',
      },
      tabListContainer: {
        backgroundColor: 'var(--_tabContainerBg)',
        padding: '5px',
        borderRadius: '6px',
      },
      flexContainer: {
        display: 'flex',
        padding: '40px',
        minHeight: '100%',
      },
      network: {
        '&.MuiTypography-root': {
          color: 'black',
          display: 'inline',
          fontSize: 22,
          fontWeight: 700,
        },
      },
      endFlexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: '10px 20px',
        alignItems: 'center',
      },
      formControl: {
        minWidth: 160,
        marginLeft: 10,
      },
      dropdown: {
        padding: 5,
        backgroundColor: 'white',
      },
      mapWidth: {
        minWidth: '51vw',
      },
      statTile: {
        marginTop: -15,
        height: '180px',
      },
      chartWidth: {
        minWidth: '29vw',
        maxHeight: 403,
        marginBottom: 10,
      },
      valueUpText: {
        fontSize: 22,
        fontWeight: 700,
        marginLeft: '10%',
        color: 'green',
      },
      valueDownText: {
        fontSize: 22,
        fontWeight: 700,
        marginLeft: '10%',
        color: 'red',
      },
      cardWidth: {
        minWidth: '17vw',
      },
      cardContent: {
        fontWeight: 500,
        fontSize: 68,
        textAlign: 'center',
        marginTop: '-10%',
      },
      valueChangeContainer: {
        backgroundColor: '#F3F6FC',
        borderRadius: 10,
        width: '50%',
        textAlign: 'center',
        margin: 'auto',
      },
      mapLegend: {
        padding: 10,
      },
      removeTile: {
        color: 'red',
      },
      cardTitle: {
        fontWeight: 700,
        fontSize: 18,
      },
      cardHeaderRoot: {
        zIndex: 1,
      },
      troubleshootElementContainer: {
        width: '50%',
      },
      troubleshootContainer: {
        display: 'flex',
      },
      mapHeight: {
        height: '100%',
      },
      demoPopupContainer: {
        backgroundColor: '#FFFFFF',
        width: 543,
        padding: 70,
      },
      demoIconContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 80,
        paddingLeft: 80,
      },
      demoAwsIcon: {
        width: 80,
      },
      demoMerakiIcon: {
        width: 85,
      },
      demoPopupTitle: {
        color: '#05143A',
        fontWeight: 700,
        fontSize: 34,
        textAlign: 'center',
        width: 405,
        marginTop: 30,
      },
      demoPopupSubtitle: {
        color: '#848DA3',
        fontWeight: 400,
        fontSize: 20,
        textAlign: 'center',
        width: 405,
        marginTop: 20,
      },
      demoPopUpButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 40,
      },
      demoPopupButton: {
        width: 200,
        height: 60,
        backgroundColor: '#437FEC',
        color: 'white',
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 700,
        paddingTop: 20,
        paddingLeft: 60,
        cursor: 'pointer',
      },
      dashboardLabelContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      anomaliesRowsContainer: {
        maxHeight: '30vh',
        marginTop: '20px',
        overflowY: 'auto',
        border: '1px solid #E7EDF9',
        borderBottom: 0,
      },
      anomalyRow: {
        borderBottom: '1px solid #E7EDF9',
        padding: '25px 30px 22px 20px',
        display: 'inline-flex',
        justifyContent: 'space-between',
        width: '100%',
        cursor: 'pointer',
      },
      severityLabel: {
        fontWeight: 500,
        fontSize: '14px',
        padding: 8,
        lineHeight: '18px',
        color: '#ffffff',
      },
      ciscoPopupIcon: {
        backgroundImage: `url(${cisco_sites})`,
        width: 50,
        height: 70,
        marginTop: 40,
      },
      popupContainer: {
        textAlign: 'left',
      },
      verticalCenter: {
        marginTop: '10%',
      },
      horizontalCenter: {
        margin: 'auto',
      },
      loadMoreButton: {
        cursor: 'pointer',
        marginTop: 10,
        padding: 10,
        borderRadius: 6,
        border: '1px solid #cbd2dc',
        textAlign: 'center',
        width: 120,
      },
      popupHeaderContainer: {
        padding: 10,
      },
      popupItemContainer: {
        padding: '5px 5px 5px 10px',
      },
      popupTitle: {
        fontSize: '16px',
        fontWeight: 600,
      },
      popupContentLabel: {
        fontSize: '12px',
        fontWeight: 600,
        color: 'black',
      },
      popupContentValue: {
        fontSize: '12px',
        fontWeight: 500,
        color: '#848DA3',
      },
      timeDiffContainer: {
        width: 150,
        textAlign: 'right',
      },
      timeDiffText: {
        fontSize: 14,
        fontWeight: 400,
        color: '#848DA3',
      },
      popupHr: {},
      totalUsageIcon: {
        padding: '0px 5px 0px 5px',
      },
      connectivityContainer: {
        border: '1px solid black',
        height: 30,
        display: 'flex',
        maxWidth: 100,
      },
      connectivityAvailableItem: {
        width: 2,
        background: 'green',
      },
      connectivityUnavailableItem: {
        width: 2,
        background: 'red',
      },
      popupConnectivityContainer: {
        border: '1px solid black',
        height: 20,
        display: 'flex',
        marginLeft: 10,
      },
    }),
  {
    index: 1,
  },
);
