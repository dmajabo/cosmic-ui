import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const CollapseStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        fontFamily: 'DMSans',
        borderRadius: 6,
      },
    }),
  {
    index: 1,
  },
);
