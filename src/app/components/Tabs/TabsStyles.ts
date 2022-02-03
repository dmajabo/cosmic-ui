import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const TabsStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      tabs: {
        '&.MuiTabs-root': {
          minHeight: '100%',
          fontFamily: 'DMSans',
          direction: 'ltr',
        },
      },
      tab: {
        '&.MuiTab-root': {
          height: 40,
          minHeight: 40,
          minWidth: 130,
          padding: '0 12px',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '23px',
          textAlign: 'center',
          textTransform: 'capitalize',
          color: 'var(--_disabledTextColor)',
          borderBottom: '1px solid',
          borderBottomColor: 'rgba(132, 141, 163, 0.1)',
          fontFamily: 'DMSans',
          letterSpacing: 'unset',
        },
      },
      tabBigSize: {
        '&.MuiTab-root': {
          height: '48px',
          minHeight: '48px',
          minWidth: 130,
          padding: '0 30px',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '23px',
          textAlign: 'center',
          textTransform: 'capitalize',
          color: 'var(--_disabledTextColor)',
          borderBottom: '1px solid',
          borderBottomColor: 'rgba(132, 141, 163, 0.1)',
          fontFamily: 'DMSans',
          letterSpacing: 'unset',
        },
      },
      popupTab: {
        '&.MuiTab-root': {
          height: '24px',
          minHeight: '24px',
          minWidth: 80,
          padding: '0 12px',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '16px',
          textAlign: 'center',
          textTransform: 'capitalize',
          color: 'var(--_disabledTextColor)',
          borderBottom: '1px solid',
          borderBottomColor: 'rgba(132, 141, 163, 0.1)',
          fontFamily: 'DMSans',
          letterSpacing: 'unset',
        },
      },
      tabSelected: {
        color: 'var(--_primaryTextColor)',
      },
    }),
  {
    index: 1,
  },
);
