import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const SelectStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        fontFamily: 'DMSans',
        fontSize: '14px',
        lineHeight: 'normal',
        borderRadius: '6px',
        width: '100%',
        color: 'var(--_primaryColor)',
        background: 'var(--_primaryBg)',
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: '6px',
          borderWidth: '1px !important',
          borderColor: 'var(--_defaultInputBorder) !important',
        },
        '& .icon svg': {
          transform: 'rotate(0deg)',
          transition: 'all 0.2s linear',
        },
        '& .open svg': {
          transform: 'rotate(180deg)',
        },
        '& .open .inheritFill': {
          fill: 'var(--_sHoverButtonColor)',
        },
      },
      select: {
        height: '40px',
        padding: '8px 32px 8px 8px',
        minHeight: '40px',
        boxSizing: 'border-box',
      },
      menuRoot: {
        fontFamily: 'DMSans',
        background: 'var(--_primaryButtonBg)',
        padding: '0',
        boxShadow: '0px 15px 50px rgba(132, 141, 163, 0.15)',
        margin: '2px 0 0 0',
        borderRadius: '6px',
        minHeight: '40px',
      },
    }),
  {
    index: 1,
  },
);
