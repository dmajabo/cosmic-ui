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

    '--_pButtonBg': '#437FEC',
    '--_pButtonBorder': '#437FEC',
    '--_pButtonColor': '#FFFFFF',
    '--_pHoverButtonBg': '#2969DC',
    '--_pHoverButtonBorder': '#2969DC',
    '--_pHoverButtonColor': '#FFFFFF',
    '--_pDisabledButtonBg': '#E5E8ED',
    '--_pDisabledButtonBorder': '#E5E8ED',
    '--_pDisabledButtonColor': '#848DA3',

    '--_sButtonBg': '#FFFFFF',
    '--_sButtonBorder': '#CBD2DC',
    '--_sButtonColor': '#05143A',
    '--_sHoverButtonBg': '#FFFFFF',
    '--_sHoverButtonBorder': '#437FEC',
    '--_sHoverButtonColor': '#437FEC',
    '--_sDisabledButtonBg': '#FFFFFF',
    '--_sDisabledButtonBorder': '#F2F3F5',
    '--_sDisabledButtonColor': '#848DA3',

    // Inputs
    '--_defaultInputColor': '#848DA3',
    '--_defaultInputBorder': 'rgba(109, 121, 134, 0.3)',
    '--_errorColor': '#DC4545',
    '--_successColor': '#52984E',
    '--_warningColor': '#F69442',
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
    // SWITCH
    '--_offBg': '#DEE3EE',
    '--_onBg': '#1565C0',
    '--_thumbBg': '#FFFFFF',
    // STEPPER
    '--_defStepperBgColor': '#F3F6FC',
    '--_defStepperLabelColor': '#848DA3',
    '--_defStepperNumberTextColor': '#848DA3',
    '--_selectedStepperBgColor': '#437FEC',
    '--_selectedStepperLabelColor': '#05143A',
    '--_selectedStepperNumberTextColor': '#FFFFFF',
    '--_completedStepperBgColor': '#52984E',
    '--_completedStepperLabelColor': '#05143A',
    '--_completedStepperNumberTextColor': '#FFFFFF',
    '--_stepperEdgeColor': '#CBD2DC',
    '--_stepperStateCompleteColor': '#52984E',
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
