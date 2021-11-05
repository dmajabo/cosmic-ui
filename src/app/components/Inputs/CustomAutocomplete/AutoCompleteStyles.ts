import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const AutoCompleteStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        height: 'auto',
        fontFamily: 'DMSans',
        background: 'transparent',
        '& .MuiInputBase-root': {
          color: 'var(--_primaryColor)',
          fontSize: '16px',
          fontFamily: 'inherit',
          fontWeight: 500,
          lineHeight: 'normal',
          letterSpacing: 'unset',
          borderRadius: '6px',
          padding: '6px',
          minHeight: '40px',
        },
        '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
          height: '22px',
          padding: '0px 8px !important',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: '1px !important',
          borderColor: 'var(--_defaultInputBorder) !important',
        },
        '& .MuiAutocomplete-endAdornment': {
          top: 'calc(50% - 12px)',
        },
        '& .MuiAutocomplete-endAdornment .MuiIconButton-root': {
          padding: '0px !important',
          width: '20px',
          height: '20px',
          margin: 'auto 4px',
          display: 'inline-flex',
          '&:hover': {
            background: 'transparent !important',
          },
          '& svg': {
            width: '12px',
            height: '12px',
            margin: 'auto',
          },
        },
        '& .MuiTouchRipple-root': {
          display: 'none',
        },
      },
      paper: {
        fontFamily: 'DMSans',
        background: 'var(--_primaryButtonBg)',
        padding: '0',
        boxShadow: '0px 15px 50px rgba(132, 141, 163, 0.15)',
        margin: '2px 0 0 0',
        '& .MuiAutocomplete-noOptions': {
          padding: '8px',
          color: 'var(--_primaryColor)',
          fontWeight: 500,
          fontSize: '14px',
        },
      },
      listbox: {
        maxHeight: '278px',
        padding: '6px 0',
      },
    }),
  {
    index: 1,
  },
);
