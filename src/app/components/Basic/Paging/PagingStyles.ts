import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const PagingStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        height: '100%',
        fontFamily: 'DMSans',
        background: 'var(--_primaryBg)',
        '& *': {
          fontFamily: 'DMSans !important',
        },
        '& .MuiPagination-ul': {
          height: '100%',
        },
        '& .MuiPagination-ul li': {
          height: '40px',
        },
        '& .MuiButtonBase-root': {
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '21px',
          height: '100%',
          color: 'var(--_disabledTextColor)',
          '&:hover:not(.Mui-disabled)': {
            color: 'var(--_primaryColor)',
          },
        },
        '& .MuiPaginationItem-root': {
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '0',
          letterSpacing: '0.1px',
          color: 'var(--_disabledTextColor)',
          '&:hover': {
            background: 'transparent',
          },
        },
        '& .MuiButtonBase-root.Mui-selected': {
          background: 'transparent',
          color: 'var(--_primaryColor)',
        },
      },
    }),
  {
    index: 1,
  },
);
