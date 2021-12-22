import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const TabsStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      tabs: {
        minHeight: '100%',
        fontFamily: 'DMSans',
      },
      tab: {
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
      },
      tabBigSize: {
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
      },
      tabSelected: {
        color: 'var(--_primaryColor)',
      },
    }),
  {
    index: 1,
  },
);
