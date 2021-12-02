import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const AutoCompleteStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
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
