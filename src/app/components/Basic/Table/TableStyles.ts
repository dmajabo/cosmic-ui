import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const TableStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      container: {
        width: '100%',
        background: 'var(--_tableBg)',
        minHeight: 300,
        position: 'relative',
        borderRadius: '6px 6px 0 0',
        border: '2px solid var(--_tableBg)',
      },
      table: {
        fontFamily: 'DMSans',
        fontStyle: 'normal',
      },
      tableHeadCell: {
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--_rowBorder)',
        fontWeight: 700,
        fontSize: '12px',
        lineHeight: '16px',
        textTransform: 'uppercase',
        color: 'var(--_disabledTextColor)',
        padding: '12px',
      },
      tableCell: {
        background: 'transparent',
        border: 'none',
        color: 'var(--_primaryColor)',
        borderBottom: '1px solid var(--_rowBorder)',
        padding: '12px',
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '18px',
        whiteSpace: 'nowrap',
      },
      row: {
        background: 'var(--_rowBg)',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderTopColor: 'var(--_rowBg)',
      },
    }),
  {
    index: 1,
  },
);
