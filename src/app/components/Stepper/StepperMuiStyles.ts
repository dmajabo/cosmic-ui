import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const StepperStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        '&.MuiStepper-root.MuiStepper-horizontal': {
          margin: 'auto',
          minWidth: '200px',
        },
      },
    }),
  {
    index: 1,
  },
);
