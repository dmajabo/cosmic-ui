import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { borderRadius } from 'react-select/src/theme';
import DragIcon from './icons/metrics explorer/drag.svg';

export const AnalyticsStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      analyticsContainer: {
        padding: 30,
        position: 'relative',
        width: '100%',
        height: '90%',
      },
      fixedTabBar: {
        position: 'sticky',
        top: 80,
        marginTop: -20,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#F3F6FC',
        zIndex: 2,
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
        height: '100%',
      },
      metricsExplorerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        maxHeight: '90%',
        maxWidth: '100vw',
      },
      leftBox: {
        backgroundColor: 'white',
        padding: '0px 20px 20px 20px',
        width: 'calc(100% - 450px)',
        borderRadius: 6,
        height: '78vh',
        overflow: 'auto',
      },
      rightBox: {
        backgroundColor: 'white',
        position: 'fixed',
        right: 35,
        marginTop: -130,
        marginRight: -30,
        width: 450,
        height: '100vh',
        zIndex: 3,
        padding: 30,
        overflowY: 'scroll',
        overflowX: 'hidden',
      },
      rightContainerTitle: {
        fontSize: 22,
        fontWeight: 700,
        color: '#05143A',
        padding: '20px 0px 20px 20px',
        position: 'sticky',
        marginLeft: -20,
        zIndex: 2,
        top: 0,
        backgroundColor: 'white',
        width: 450,
      },
      rightBoxContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        marginRight: 30,
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
        flexDirection: 'column',
      },
      subDimensionIcon: {
        width: 24,
      },
      subDimensionContent: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      subDimensionItem: {
        width: '49%',
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
        cursor: 'pointer',
      },
      dataSourceDropdownImg: {
        width: 20,
        marginRight: 10,
      },
      dataSourceOptionBox: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 4,
      },
      dataSourceContentContainer: {
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      },
      dataSourceOptionContent: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
      dataSourceSingleColumnOptionContent: {
        display: 'grid',
        gridAutoFlow: 'row',
      },
      leftContainerTitle: {
        fontSize: 22,
        fontWeight: 700,
        color: '#05143A',
      },
      metricsChartTitleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 20,
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
      overflowXHide: {
        maxWidth: '85%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      metricsChartSubtitle: {
        color: '#848DA3',
        fontSize: 14,
        paddingBottom: 10,
      },
      fixedPosition: {
        position: 'sticky',
        top: 0,
        width: '100%',
        backgroundColor: 'white',
      },
      metricsChartContents: {},
      noChartText: {
        color: '#848DA3',
        fontSize: 14,
        fontWeight: 400,
      },
      noChartContainer: {
        textAlign: 'center',
        border: '1px solid #CBD2DC',
        backgroundColor: '#FBFCFE',
        borderRadius: 6,
        padding: '22vh 0vw 22vh 0vw',
      },
      metricsTableContainer: {
        marginTop: 30,
      },
      metricsTableSearchBar: {
        borderRadius: 6,
        border: '1px solid #CBD2DC',
        paddingLeft: 20,
        height: 40,
        width: '25vw',
        marginBottom: 40,
      },
      metricsTableDimensionName: {
        color: '#437FEC',
      },
      metricsTableDimensionSubtitle: {
        fontSize: 14,
        color: '#848DA3',
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 250,
      },
      dragIcon: {
        background: `url(${DragIcon})`,
        width: 15,
        height: 15,
      },
      timeTabContainer: {
        position: 'relative',
        right: 30,
        width: '121%',
        backgroundColor: '#F3F6FC',
        padding: 3,
      },
      indicator: {
        backgroundColor: 'transparent',
      },
      selectedTab: {
        backgroundColor: 'white',
        borderRadius: 6,
      },
      tableHeaderText: {
        fontWeight: 700,
        fontSize: 12,
        color: '#848DA3',
      },
      lookbackContainer: {
        position: 'relative',
        right: 20,
        marginTop: 10,
      },
      customContainer: {
        position: 'relative',
        right: 40,
        marginTop: 10,
        width: '130%',
      },
      lookbackSelect: {
        margin: 10,
        marginLeft: -5,
        width: '120%',
      },
      dateTimeInput: {
        height: 40,
        width: '70%',
        border: '1px solid #CBD2DC',
        borderRadius: 6,
      },
      labelContainer: {
        display: 'inline-block',
        width: 50,
      },
      dateTimeLabelText: {
        color: '#848DA3',
        fontSize: 14,
      },
      blockContainer: {
        display: 'block',
        paddingTop: 5,
        paddingBottom: 5,
      },
      showSelect: {
        margin: 10,
        marginLeft: -5,
        width: '60%',
      },
      selectBlockContainer: {
        display: 'block',
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 10,
      },
      anomalyContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 30,
      },
      anomalyTabContainer: {
        backgroundColor: '#F3F6FC',
        padding: 5,
        borderRadius: 6,
      },
      anomalyTimeRangeText: {
        fontSize: 14,
        color: '#848DA3',
        paddingRight: 20,
      },
      inlineSelect: {
        display: 'inline-block',
        width: 200,
      },
      anomalyTabPanelContainer: {
        marginTop: 40,
        width: '100%',
      },
      anomalyTableContainer: {
        marginTop: 40,
      },
      anomalyTableTitle: {
        color: '#05143A',
        fontSize: 20,
        fontWeight: 700,
        marginRight: 15,
      },
      anomalyCount: {
        fontSize: 16,
        color: '#437FEC',
        fontWeight: 500,
        borderRadius: 20,
        backgroundColor: '#F3F6FC',
        padding: '5px 20px 5px 20px',
      },
      anomalyExperienceTableTitle: {
        marginBottom: 20,
      },
      sortIcon: {
        marginLeft: 15,
      },
      hitsCount: {
        color: 'white',
        backgroundColor: '#2C82C9',
        textAlign: 'center',
        width: 50,
        borderRadius: 20,
      },
      severityText: {
        marginLeft: 10,
      },
      anomalySubcomponentTitle: {
        fontSize: 16,
        fontWeight: 700,
        color: '#05143A',
      },
      averageQoeText: {
        paddingTop: 5,
      },
      qoeValueText: {
        paddingLeft: 5,
        paddingRight: 10,
      },
      sessionLogs: {
        paddingTop: 20,
        paddingBottom: 10,
      },
    }),
  {
    index: 1,
  },
);
