import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const TableStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      container: {
        '&.MuiTableContainer-root': {
          width: '100%',
          background: 'var(--_tableBg)',
          minHeight: 88,
          position: 'relative',
          borderRadius: '6px 6px 0 0',
          border: '2px solid var(--_tableBg)',
        },
      },
      table: {
        '&.MuiTable-root': {
          fontFamily: 'DMSans',
          fontStyle: 'normal',
        },
      },
      tableHeadCell: {
        '&.MuiTableCell-head': {
          border: 'none',
          borderBottom: '1px solid var(--_rowBorder)',
          fontWeight: 700,
          fontSize: '12px',
          lineHeight: '16px',
          textTransform: 'uppercase',
          color: 'var(--_disabledTextColor)',
          padding: '12px',
          background: 'var(--_tableBg)',
          fontFamily: 'DMSans',
          textAlign: 'left',
          position: 'initial',
          letterSpacing: 'unset',
        },
      },
      tableCell: {
        '&.MuiTableCell-body': {
          background: 'transparent',
          border: 'none',
          color: 'var(--_primaryTextColor)',
          borderBottom: '1px solid var(--_rowBorder)',
          padding: '10px 12px',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: '18px',
          whiteSpace: 'nowrap',
          fontFamily: 'DMSans',
          textAlign: 'left',
          position: 'initial',
          letterSpacing: 'unset',
        },
        '&.MuiTableCell-body.cellStatusActive': {
          color: 'var(--_successColor)',
          textTransform: 'capitalize',
          textAlign: 'left',
        },
      },
      row: {
        '&.MuiTableRow-root': {
          background: 'var(--_rowBg)',
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderTopColor: 'var(--_rowBg)',
        },
      },
    }),
  {
    index: 1,
  },
);
