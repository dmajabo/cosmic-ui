import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const TopologyStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      deviceDataDrawer: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0 20px',
        alignItems: 'center',
      },
      showText: {
        color: '#848DA3',
        fontSize: 14,
        marginTop: 3,
        marginLeft: 15,
      },
      formControl: {
        minWidth: 160,
        marginLeft: 5,
      },
      dropdown: {
        padding: 5,
        backgroundColor: 'white',
      },
      cardTitle: {
        fontWeight: 700,
        fontSize: 18,
      },
      deviceDrawerPaper: {
        width: 450,
        marginTop: 81,
      },
      drawerGap: {
        paddingTop: 80,
      },
      deviceName: {
        color: 'black',
        display: 'inline',
        fontSize: 22,
        fontWeight: 700,
      },
      startFlexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: '20px 20px',
        alignItems: 'center',
      },
      deviceDataChartContainer: {
        backgroundColor: '#FBFCFE',
        margin: 15,
        border: 'solid 1px lightgray',
        borderRadius: 6,
      },
      linkText: {
        textDecoration: 'none',
        color: 'blue',
        marginTop: 4,
        cursor: 'pointer',
        marginLeft: 4,
      },
      textFlexContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingBottom: 20,
      },
      chartContainer: {
        margin: 15,
      },
    }),
  {
    index: 1,
  },
);
