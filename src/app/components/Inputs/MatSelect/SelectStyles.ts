import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const SelectStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      outlined: {
        fontFamily: 'DMSans',
        fontSize: '14px',
        lineHeight: 'normal',
        borderRadius: '6px',
        width: '100%',
        color: 'var(--_primaryTextColor)',
        background: 'var(--_primaryBg)',
        border: '1px solid var(--_defaultInputBorder) !important',
        boxSizing: 'border-box',
        '& .MuiOutlinedInput-notchedOutline': {
          display: 'none !important',
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
            height: '100% !important',
            boxSizing: 'border-box',
            background: 'var(--_primaryBg) !important',
          },
        },
        '&.withLabel': {
          height: 'calc(100% - 22px)',
          '& .MuiSelect-select': {
            height: '100% !important',
            boxSizing: 'border-box',
            background: 'var(--_primaryBg) !important',
          },
        },
        '& .MuiSelect-select': {
          fontWeight: 500,
          background: 'var(--_primaryBg) !important',
        },
      },
      select: {
        paddingTop: '8px !important',
        paddingBottom: '8px !important',
        paddingLeft: '16px !important',
        minHeight: '100% !important',
        boxSizing: 'border-box',
        color: 'var(--_primaryTextColor) !important',
        fontSize: '14px !important',
        fontFamily: 'DMSans !important',
        fontWeight: 500,
        height: '100% !important',
        '&:focus': {
          background: 'transparent !important',
        },
      },
      menuRoot: {
        '&.MuiPaper-root': {
          fontFamily: 'DMSans',
          background: 'var(--_primaryWhiteColor)',
          padding: '0',
          boxShadow: '0px 15px 50px rgba(132, 141, 163, 0.15) !important',
          margin: '2px 0 0 0',
          borderRadius: '6px !important',
          minHeight: '40px !important',
        },
      },
      menuList: {
        '&.MuiMenu-list': {
          maxHeight: '278px',
          padding: '6px 0',
          fontSize: '14px',
          fontFamily: 'DMSans',
        },
      },
      menuListItem: {
        '&.MuiMenuItem-root': {
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
          color: 'var(--_primaryTextColor)',
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
      },
    }),
  {
    index: 1,
  },
);
