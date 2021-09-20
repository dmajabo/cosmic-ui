interface ITheme {
  dark: string;
}
export const APP_THEME: ITheme = {
  dark: 'dark',
};

const Themes = {
  dark: {
    '--_primaryBg': '#FFFFFF',
    '--_primaryColor': '#05143A',
    '--_appBg': '#F3F6FC', //'#CBD2DC',
    '--_sidebarBorder': '#437FEC',
    '--_sidebarGradient': 'linear-gradient(90deg, #437FEC 0%, rgba(67, 127, 236, 0) 100%)',
    '--_defaultIconColor': '#3A5277',
    '--_interfaceBg': '#F3F6FC',

    // Text Color
    '--_primaryTextColor': '#FFFFFF',
    '--_secondaryTextColor': '#CECECE',
    '--_disabledTextColor': '#848DA3',
    // Buttons
    '--_primaryButtonBg': '#FFFFFF',
    '--_primaryButtonBorder': '#CBD2DC',
    '--_hoverButtonBg': '#437FEC',
    '--_hoverButtonColor': '#FFFFFF',
    '--_disabledButtonBg': '#E5E8ED',
    '--_disabledButtonColor': '#62707F',

    // Inputs
    '--_defaultInputColor': '#848DA3',
    '--_errorColor': '#DC4545',
    '--_successColor': '#52984E',
    // NODES
    // GROUP
    '--_groupDevicesBg': '#E9EFF9',
    // Device
    '--_devicerBg': '#FFFFFF',

    // VNET
    '--_vnetBg': '#FFFFFF',
    '--_vnetHeaderBg': '#FF9900',
    '--_vnetHeaderColor': '#FFFFFF',
    // VM
    '--_vmBg': '#EFF3FB',
    '--_vmsContainerBg': '#E9EEF9',
    // ORGANIZATION
    '--_organizationBg': '#FFFFFF',
    '--_organizationInsideBg': '#7AC142',
    // LINKS
    '--_defaultLinkFill': '#D3DBE7',
    '--_hoverLinkFill': '#437FEB',
    // SCROLL
    '--_scrollBarThumb': '#848DA3',
    '--_scrollBarTrack': '#F3F6FC',
    // CHARTR
    '--_chartBg': '#FBFCFE',
    '--_borderColor': '#CBD2DC',
    '--_titleColor': '#05143A',
    '--_defaultColor': '#848DA3',
    '--_highlightColor': '#437FEC',
    // TABLES
    '--_tableBg': '#F3F6FC',
    '--_rowBg': '#FFFFFF',
    '--_rowBorder': '#E7EDF9',
  },
};

export const setupAppTheme = (theme?: string) => {
  let themeName = theme || localStorage.getItem('OCULIS') || APP_THEME.dark;
  if (!themeName || themeName === 'null') {
    themeName = APP_THEME.dark;
  }
  const _theme = Themes[themeName];
  const keys = Object.keys(_theme);
  const appStyle = document.documentElement.style;
  keys.forEach(it => {
    appStyle.setProperty(it, _theme[it]);
  });
};
