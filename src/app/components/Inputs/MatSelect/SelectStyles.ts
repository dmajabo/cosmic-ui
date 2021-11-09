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
        '&.fullHeight': {
          height: '100%',
          '& .MuiSelect-select': {
            height: '100%',
          },
        },
      },
      select: {
        height: '40px',
        padding: '8px 32px 8px 16px',
        minHeight: '40px',
        boxSizing: 'border-box',
        '&:focus': {
          background: 'transparent !important',
        },
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
      menuList: {
        maxHeight: '278px',
        padding: '6px 0',
        fontSize: '14px',
        fontFamily: 'DMSans',
      },
      menuListItem: {
        width: '100%',
        overflow: 'hidden',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
        minHeight: '40px',
        fontWeight: 500,
        lineHeight: '18px',
        padding: '10px 20px',
        letterSpacing: 'unset',
        color: 'var(--_primaryColor)',
        background: 'transparent',
        margin: '2px 0',
        '&:hover': {
          background: 'var(--_vmBg)',
        },
        '&.Mui-selected:hover': {
          color: 'var(--_hoverButtonBg)',
          background: 'var(--_vmBg)',
        },
        '&.Mui-selected': {
          color: 'var(--_hoverButtonBg)',
          background: 'var(--_vmBg)',
        },
      },
    }),
  {
    index: 1,
  },
);
