import { AlertVerificationStatusTypes, IAlertVerificationStatus } from 'lib/api/ApiModels/Workflow/apiModel';
export interface ITagStyles {
  readonly bgColor: string;
  readonly textColor: string;
  readonly status: AlertVerificationStatusTypes;
}

export const getStyles = (status: AlertVerificationStatusTypes, bg: string = 'var(--_pButtonBg)', color: string = 'var(--_pButtonBg)'): ITagStyles => ({
  bgColor: bg,
  textColor: color,
  status: status,
});

export const getTagStyles = (tag: string, verificationObj: IAlertVerificationStatus): ITagStyles => {
  if (!tag || !verificationObj || !verificationObj.emailChannelStatus || !verificationObj.emailChannelStatus.emailStatuses) return getStyles(null);
  if (!verificationObj.emailChannelStatus.emailStatuses[tag]) return getStyles(null);
  if (
    verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.NotStarted ||
    verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.UNKNOWN_STATUS
  ) {
    return getStyles(verificationObj.emailChannelStatus.emailStatuses[tag], 'var(--_disabledTextColor)', 'var(--_disabledTextColor)');
  }
  if (
    verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.TemporaryFailure ||
    verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.Failed
  ) {
    return getStyles(verificationObj.emailChannelStatus.emailStatuses[tag], 'var(--_errorColor)', 'var(--_errorColor)');
  }
  if (verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.Success) {
    return getStyles(verificationObj.emailChannelStatus.emailStatuses[tag], 'var(--_successColor)', 'var(--_successColor)');
  }
  if (verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.Pending) {
    return getStyles(verificationObj.emailChannelStatus.emailStatuses[tag], 'var(--_warningColor)', 'var(--_warningColor)');
  }
  return getStyles(null);
};
