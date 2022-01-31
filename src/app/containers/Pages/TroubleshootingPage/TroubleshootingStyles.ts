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
    }),
  {
    index: 1,
  },
);
