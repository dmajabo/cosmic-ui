import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const GridStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      container: {
        width: '100%',
        background: 'transparent',
        minHeight: 200,
        position: 'relative',
        border: 'none',
        '& .MuiDataGrid-main': {
          fontFamily: 'DMSans',
          borderRadius: '6px 6px 0px 0px',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 700,
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--_disabledTextColor)',
        },
        '& .MuiDataGrid-columnsContainer': {
          background: 'var(--_appBg)',
          height: 50,
          borderBottom: '1px solid var(--_rowBorder)',
        },
        '& .MuiDataGrid-columnHeader': {
          outline: 'none !important',
        },
        '& .MuiDataGrid-row': {
          height: 50,
          '&:hover': {
            background: 'transparent',
          },
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-cell': {
          outline: 'none !important',
          fontWeight: 'normal',
          fontSize: '16px',
          lineHeight: '21px',
          color: 'var(--_primaryColor)',
          borderBottomColor: 'var(--_rowBorder)',
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          padding: 0,
        },
      },
      borderedRow: {
        width: '100%',
        background: 'transparent',
        minHeight: 200,
        position: 'relative',
        border: 'none',
        '& .MuiDataGrid-main': {
          fontFamily: 'DMSans',
          borderRadius: '6px 6px 0px 0px',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 700,
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--_disabledTextColor)',
        },
        '& .MuiDataGrid-columnsContainer': {
          background: 'var(--_appBg)',
          height: 50,
          borderBottom: '1px solid var(--_rowBorder)',
        },
        '& .MuiDataGrid-columnHeader': {
          outline: 'none !important',
        },
        '& .MuiDataGrid-row': {
          height: 50,
          background: 'var(--_primaryBg)',
          '&:hover': {
            background: 'var(--_primaryBg)',
          },
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-cell': {
          outline: 'none !important',
          fontWeight: 'normal',
          fontSize: '16px',
          lineHeight: '21px',
          color: 'var(--_primaryColor)',
          borderBottomColor: 'var(--_rowBorder)',
        },
        '& .MuiDataGrid-cell:first-child': {
          borderLeft: '1px solid var(--_rowBorder)',
        },
        '& .MuiDataGrid-cell:last-child': {
          borderRight: '1px solid var(--_rowBorder)',
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          padding: 0,
        },
      },
    }),
  {
    index: 1,
  },
);
