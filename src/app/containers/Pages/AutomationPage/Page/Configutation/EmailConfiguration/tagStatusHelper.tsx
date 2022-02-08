import { AlertVerificationStatusTypes, IAlertVerificationStatus } from 'lib/api/ApiModels/Workflow/apiModel';
export interface ITagStyles {
  readonly bgColor: string;
  readonly textColor: string;
}

export const getStyles = (bg: string = 'var(--_pButtonBg)', color: string = 'var(--_pButtonBg)'): ITagStyles => ({ bgColor: bg, textColor: color });

export const getTagStyles = (tag: string, verificationObj: IAlertVerificationStatus): ITagStyles => {
  if (!tag || !verificationObj || !verificationObj.emailChannelStatus || !verificationObj.emailChannelStatus.emailStatuses) return getStyles();
  if (!verificationObj.emailChannelStatus.emailStatuses[tag]) return getStyles();
  if (
    verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.NotStarted ||
    verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.UNKNOWN_STATUS
  ) {
    return getStyles('var(--_disabledTextColor)', 'var(--_disabledTextColor)');
  }
  if (
    verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.TemporaryFailure ||
    verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.Failed
  ) {
    return getStyles('var(--_errorColor)', 'var(--_errorColor)');
  }
  if (verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.Success) {
    return getStyles('var(--_successColor)', 'var(--_successColor)');
  }
  if (verificationObj.emailChannelStatus.emailStatuses[tag] === AlertVerificationStatusTypes.Pending) {
    return getStyles('var(--_warningColor)', 'var(--_warningColor)');
  }
  return getStyles();
};
