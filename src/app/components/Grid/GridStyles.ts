import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const GridStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      container: {
        '&.MuiDataGrid-root': {
          width: '100%',
          background: 'transparent',
          minHeight: 200,
          position: 'relative',
          border: 'none',
        },
        '&.MuiDataGrid-root .MuiDataGrid-overlay': {
          background: 'transparent',
        },
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
        '& .MuiDataGrid-columnHeaderWrapper': {
          height: '100%',
        },
        '& .MuiDataGrid-columnHeaders': {
          borderBottom: '1px solid var(--_rowBorder)',
          '& .MuiDataGrid-columnHeadersInner': {
            height: '100%',
          },
          '& .MuiDataGrid-columnHeader': {
            outline: 'none !important',
            background: 'transparent',
            height: '100%',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-iconButtonContainer': {
            '& .MuiIconButton-root:hover': {
              background: 'transparent',
            },
            '& .MuiTouchRipple-root': {
              display: 'none',
            },
          },
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
          height: 70,
          '&:hover': {
            background: 'transparent',
          },
        },
        '& .MuiDataGrid-cell': {
          outline: 'none !important',
          fontWeight: 'normal',
          fontSize: '16px',
          lineHeight: '21px',
          color: 'var(--_primaryTextColor)',
          borderBottomColor: 'var(--_rowBorder)',
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          padding: 0,
        },
        '& .MuiDataGrid-virtualScrollerContent': {
          minHeight: '200px',
        },
      },
      nestedGrid: {
        '&.MuiDataGrid-root': {
          width: '100%',
          background: 'transparent',
          minHeight: 0,
          position: 'relative',
          border: 'none',
        },
        '& .MuiDataGrid-main': {
          paddingBottom: '20px',
        },
        '&.MuiDataGrid-root .MuiDataGrid-overlay': {
          background: 'transparent',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 700,
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--_disabledTextColor)',
        },
        '& .MuiDataGrid-columnHeaderWrapper': {
          height: '100%',
        },
        '& .MuiDataGrid-columnsContainer': {
          background: 'transparent !important',
          height: 40,
          border: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          borderBottom: '1px solid var(--_rowBorder)',
          '& .MuiDataGrid-columnHeadersInner': {
            height: '100%',
          },
          '& .MuiDataGrid-columnHeader': {
            outline: 'none !important',
            background: 'transparent',
            height: '100%',
            padding: '0 4px !important',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-iconButtonContainer': {
            '& .MuiIconButton-root:hover': {
              background: 'transparent',
            },
            '& .MuiTouchRipple-root': {
              display: 'none',
            },
          },
        },
        '& .MuiDataGrid-row': {
          height: 50,
          background: 'var(--_primaryBg)',
          border: '1px solid var(--_rowBorder)',
          boxSizing: 'border-box',
          '&:hover': {
            background: 'var(--_primaryBg)',
          },
          '&.Mui-selected': {
            background: 'var(--_primaryBg)',
          },
          '&.Mui-selected:hover': {
            background: 'var(--_primaryBg)',
          },
        },
        '& .MuiDataGrid-cell': {
          outline: 'none !important',
          fontWeight: 'normal',
          fontSize: '16px',
          lineHeight: '21px',
          padding: '0 20px',
          color: 'var(--_primaryTextColor)',
          border: 'none',
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          padding: 0,
        },
      },
      borderedRow: {
        '&.MuiDataGrid-root': {
          width: '100%',
          background: 'transparent',
          minHeight: 200,
          position: 'relative',
          border: 'none',
        },
        '& .MuiDataGrid-main': {
          fontFamily: 'DMSans',
          borderRadius: '6px 6px 0px 0px',
        },
        '& .MuiDataGrid-columnHeaders': {
          borderBottom: '1px solid var(--_rowBorder)',
          height: '50px',
          '& .MuiDataGrid-columnHeadersInner': {
            height: '100%',
          },
          '& .MuiDataGrid-columnHeader': {
            outline: 'none !important',
            background: 'transparent',
            height: '100%',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-iconButtonContainer': {
            '& .MuiIconButton-root:hover': {
              background: 'transparent',
            },
            '& .MuiTouchRipple-root': {
              display: 'none',
            },
          },
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

        '& .MuiDataGrid-row': {
          height: 50,
          background: 'var(--_primaryBg)',
          '&:hover': {
            background: 'var(--_primaryBg)',
          },
        },
        '& .MuiDataGrid-row.Mui-selected': {
          background: 'var(--_primaryBg)',
          '&:hover': {
            background: 'var(--_primaryBg)',
          },
        },

        '& .MuiDataGrid-cell': {
          outline: 'none !important',
          fontWeight: 'normal',
          fontSize: '16px',
          lineHeight: '21px',
          color: 'var(--_primaryTextColor)',
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
        '& .MuiDataGrid-virtualScrollerContent': {
          minHeight: '200px',
        },
      },
    }),
  {
    index: 1,
  },
);
