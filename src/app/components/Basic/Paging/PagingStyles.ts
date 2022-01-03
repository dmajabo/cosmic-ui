import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const PagingStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        height: '100%',
        fontFamily: 'DMSans',
        background: 'transparent',
        '& *': {
          fontFamily: 'DMSans !important',
        },
        '& .MuiPagination-ul': {
          height: '100%',
        },
        '& .MuiPagination-ul li': {
          height: '40px',
        },
        '& .MuiPaginationItem-ellipsis': {
          width: '32px',
          margin: 0,
        },
        '& .MuiButtonBase-root': {
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '21px',
          height: '100%',
          color: 'var(--_disabledTextColor)',
          '&:hover:not(.Mui-disabled)': {
            color: 'var(--_primaryTextColor)',
          },
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },
        '& .MuiPaginationItem-root': {
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '0',
          letterSpacing: '0.1px',
          color: 'var(--_disabledTextColor)',
          '&.Mui-selected:hover': {
            background: 'transparent',
          },
          '&:hover': {
            background: 'transparent',
          },
        },
        '& .MuiButtonBase-root.Mui-selected': {
          background: 'transparent',
          color: 'var(--_primaryTextColor)',
        },
      },
    }),
  {
    index: 1,
  },
);
