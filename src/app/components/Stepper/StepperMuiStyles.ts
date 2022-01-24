import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const StepperStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        '&.MuiStepper-root.MuiStepper-horizontal': {
          margin: 'auto',
          minWidth: '40%',
          '& .MuiButtonBase-root': {
            cursor: 'pointer',
          },
          '& .MuiStep-root.MuiStep-horizontal': {
            padding: 0,
          },
          '& .MuiStepConnector-root.MuiStepConnector-horizontal': {
            padding: '0 8px',
            background: 'var(--_borderColor)',
            opacity: 0.5,
            width: '40px',
          },
          '& .MuiButtonBase-root.Mui-disabled': {
            cursor: 'default',
          },
          '& .MuiButtonBase-root .MuiStepLabel-root': {
            cursor: 'inherit',
          },
        },
      },
    }),
  {
    index: 1,
  },
);
