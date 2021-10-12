import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const AccordionStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      accContainer: {
        margin: '0 0 20px 0 !important',
        background: 'transparent !important',
        boxShadow: 'none !important',
        fontFamily: 'DMSans !important',
        color: 'var(--_primaryColor) !important',
        border: '1px solid var(--_disabledTextColor) !important',
        borderRadius: '6px !important',
        '&.Mui-expanded': {
          zIndex: 1,
        },
        '&:before': {
          display: 'none !important',
        },
      },
      panel: {
        padding: '12px !important',
        minHeight: '40px !important',
        '& .MuiAccordionSummary-content': {
          margin: '0 0 0 0 !important',
        },
        '& .Mui-expanded': {
          margin: '0 0 0 0 !important',
        },
      },
      deteilItem: {
        padding: '0 12px !important',
      },
    }),
  {
    index: 1,
  },
);
