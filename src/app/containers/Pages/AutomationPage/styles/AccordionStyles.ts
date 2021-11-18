import { Theme, createStyles, makeStyles } from '@material-ui/core';

const accordionStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      accContainer: {
        margin: '0 0 20px 0 !important',
        background: 'var(--_chartBg) !important',
        boxShadow: 'none !important',
        fontFamily: 'DMSans !important',
        color: 'var(--_primaryColor) !important',
        border: '1px solid var(--_borderColor) !important',
        borderRadius: '6px !important',
        '&.Mui-expanded': {
          zIndex: 1,
        },
        '& .MuiCollapse-root': {
          padding: '0px !important',
        },
        '&:before': {
          display: 'none !important',
        },
      },
      panel: {
        padding: '20px !important',
        minHeight: '80px !important',
        width: '100%',
        '& .MuiAccordionSummary-content': {
          margin: '0 0 0 0 !important',
          alignItems: 'center',
        },
        '& .Mui-expanded': {
          margin: '0 0 0 0 !important',
        },
      },
      panelEdges: {
        padding: '20px 30px !important',
        minHeight: '80px !important',
        width: '100%',
        '& .MuiAccordionSummary-content': {
          margin: '0 0 0 0 !important',
          alignItems: 'center',
          flexDirection: 'column',
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
          position: 'absolute',
          top: '32px',
          right: '16px',
        },
        '& .Mui-expanded': {
          margin: '0 0 0 0 !important',
        },
      },
      deteilItem: {
        padding: '0 0 0 70px !important',
      },
      deteilItemEdges: {
        borderTop: '1px solid var(--_borderColor) !important',
        padding: '20px 30px 0 30px !important',
      },
    }),
  {
    index: 1,
  },
);

export default accordionStyles;
