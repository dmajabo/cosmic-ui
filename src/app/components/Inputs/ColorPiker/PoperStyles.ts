import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
export const PoperStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        fontFamily: 'DMSans',
        background: 'transparent',
      },
      paper: {
        background: 'var(--_primaryBg) !important',
        marginTop: '4px',
        padding: '12px',
        boxShadow: '0px 10px 30px rgba(5, 20, 58, 0.1) !important',
        borderRadius: '6px',
      },
    }),
  {
    index: 1,
  },
);
