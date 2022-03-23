import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const TroubleshootingStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      troubleshootingPageContainer: {
        padding: 20,
      },
      fixedTabBar: {
        position: 'sticky',
        top: 80,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'var(--_appBg)',
        zIndex: 5,
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
      tabContainer: {
        flexGrow: 1,
        minHeight: 'calc(100% - 68px)', // 68px equal to tab panel height
      },
      hitsCount: {
        color: 'white',
        backgroundColor: '#2C82C9',
        textAlign: 'center',
        width: 50,
        borderRadius: 20,
      },
      circularImage: {
        width: 28,
        height: 28,
        borderRadius: '50%',
      },
      profileNameText: {
        marginLeft: 10,
      },
      tabTitleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      ellipsisText: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: 300,
      },
      policyLogsDetailsText: {
        color: '#437FEC',
        fontSize: 12,
        fontWeight: 700,
      },
      policyLogsViewDetailsButton: {
        cursor: 'pointer',
      },
      policyLogsArrowRight: {
        color: '#437FEC',
      },
      policyLogsContainer: {
        marginTop: 40,
      },
      policyLogsSearchBar: {
        height: 50,
        border: 'none',
        padding: 15,
        width: 500,
      },
      searchIcon: {
        backgroundColor: 'white',
        marginLeft: -30,
        marginRight: 30,
        pointerEvents: 'none',
      },
      otherButtonText: {
        fontSize: 12,
        fontWeight: 700,
        paddingRight: 10,
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
      anomalyTimeRangeText: {
        fontSize: 14,
        color: 'var(--_tabHeaderTextColor)',
        paddingRight: 20,
        paddingLeft: 10,
      },
      inlineSelect: {
        display: 'inline-block',
        width: 200,
      },
      policyLogsTableContainer: {
        marginTop: 20,
      },
      dialogTitle: {
        fontSize: 22,
        fontWeight: 700,
      },
      closeIcon: {
        cursor: 'pointer',
      },
      gridContainer: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
      },
      gridItem: {
        border: '1px solid #CBD2DC',
        margin: 20,
        borderRadius: 6,
        backgroundColor: '#FBFCFE',
      },
      gridItemTitle: {
        fontSize: 14,
        color: 'white',
        fontWeight: 500,
        borderRadius: '0px 0px 6px 6px',
        padding: '5px 20px 5px 20px',
        maxWidth: '40%',
        textAlign: 'center',
        margin: 'auto',
      },
      templateHeader: {
        backgroundColor: '#52984E',
      },
      changesHeader: {
        backgroundColor: '#437FEC',
      },
      gridItemContent: {
        padding: 20,
      },
      defaultPropertyItem: {
        padding: 7,
      },
      changedPropertyItem: {
        background: 'rgba(67,127,236,0.2)',
        padding: 7,
        width: '108%',
        position: 'relative',
        right: '4%',
        paddingLeft: '5.5%',
        paddingRight: '5.5%',
      },
      propertyValue: {
        color: '#7a808c',
        marginLeft: 5,
      },
      tablePropertyTitle: {
        fontWeight: 700,
        marginBottom: 15,
      },
      tableHeaderText: {
        fontWeight: 700,
        fontSize: 12,
        color: '#848DA3',
      },
      sortIcon: {
        marginLeft: 15,
      },
      flexContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      paginationText: {
        fontSize: 16,
        fontWeight: 500,
        color: 'black',
      },
      activePaginationText: {
        fontSize: 16,
        fontWeight: 500,
        color: 'black',
      },
      paginationButton: {
        border: 'none',
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
    }),
  {
    index: 1,
  },
);
