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
      popupContainer: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: 30,
        backgroundColor: 'white',
        width: '70%',
        height: '93%',
        outline: 'none',
        borderRadius: 6,
      },
      closePopup: {
        marginTop: -10,
        marginRight: 60,
        float: 'right',
        cursor: 'pointer',
      },
      popupTitleContainer: {
        width: '100%',
        position: 'fixed',
      },
      popupContent: {
        marginTop: 60,
        overflow: 'auto',
        height: '85%',
      },
      popupTitle: {
        fontSize: 22,
        fontWeight: 700,
      },
      searchBar: {
        marginLeft: 30,
        height: 40,
        borderRadius: 6,
        width: '35%',
        border: '1px solid #CBD2DC',
        paddingLeft: 20,
      },
      searchIcon: {
        backgroundColor: 'white',
        marginLeft: -30,
        pointerEvents: 'none',
      },
      subDimensionContainer: {
        backgroundColor: '#F3F6FC',
        borderRadius: 6,
        width: '100%',
        marginTop: 20,
        padding: 20,
      },
      subDimensionTitle: {
        fontSize: 18,
        fontWeight: 700,
        marginLeft: 20,
      },
      subDimensionOptionsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      subDimensionOptionBox: {
        backgroundColor: 'white',
        width: '49%',
        borderRadius: 4,
        paddingTop: 20,
      },
      sourcesubDimensionOptionTitle: {
        fontSize: 16,
        paddingLeft: 17,
        fontWeight: 500,
      },
      sourceText: {
        borderLeft: '3px solid #52984E',
      },
      destinationText: {
        borderLeft: '3px solid #F69442',
      },
      subDimensionContentContainer: {
        padding: '20px 0px 10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
      },
      subDimensionIcon: {
        width: 24,
      },
      subDimensionContent: {
        width: '50%',
      },
      option: {
        paddingBottom: 10,
      },
      popupFooterContainer: {
        height: '7%',
      },
      verticalCenter: {
        marginTop: 'auto',
      },
      selectedDimensionText: {
        fontSize: 16,
        fontWeight: 700,
        marginRight: 15,
      },
      selectedDimensionCount: {
        backgroundColor: '#437FEC',
        fontSize: 12,
        color: 'white',
        padding: '2px 11px 2px 11px',
        borderRadius: 10,
      },
      blueSaveButton: {
        backgroundColor: '#437FEC',
        height: 40,
        borderRadius: 6,
        padding: '7px 25px 10px 25px',
      },
      buttonText: {
        fontSize: 12,
        fontWeight: 700,
      },
      saveButton: {
        color: 'white',
        marginRight: 15,
      },
      grayBorderButton: {
        border: '1px solid #CBD2DC',
        height: 40,
        borderRadius: 6,
        padding: '7px 25px 10px 25px',
        marginRight: 10,
      },
      whiteBorderBox: {
        width: '120%',
        marginLeft: '-10%',
        backgroundColor: 'white',
        borderTop: '1px solid #E7EDF9',
        borderRight: '1px solid #E7EDF9',
        borderBottom: '1px solid #E7EDF9',
        padding: '5px 10px 5px 10px',
        fontSize: 14,
      },
      removeDimension: {
        width: 'auto',
      },
    }),
  {
    index: 1,
  },
);
