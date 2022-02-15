import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const DashboardStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      sitesContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
      },
      sitesHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '37px 33px 30px 30px',
      },
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
        padding: '40px',
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
        height: '375px',
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
    }),
  {
    index: 1,
  },
);
