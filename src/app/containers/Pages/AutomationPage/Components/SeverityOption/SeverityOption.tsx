import React from 'react';
import { AlertSeverity } from 'lib/api/ApiModels/Workflow/apiModel';
import { OptionWrap, OptionCircle, OptionLabel } from './styles';

interface Props {
  value: AlertSeverity;
}

const SeverityOption: React.FC<Props> = ({ value }) => {
  if (value === AlertSeverity.UNKNOWN_SEVERITY) {
    return (
      <OptionWrap>
        <OptionCircle />
        <OptionLabel>Unknown</OptionLabel>
      </OptionWrap>
    );
  }
  if (value === AlertSeverity.LOW) {
    return (
      <OptionWrap>
        <OptionCircle color="var(--_successColor)" />
        <OptionLabel>Low</OptionLabel>
      </OptionWrap>
    );
  }
  if (value === AlertSeverity.MEDIUM) {
    return (
      <OptionWrap>
        <OptionCircle color="var(--_warningColor)" />
        <OptionLabel>Medium</OptionLabel>
      </OptionWrap>
    );
  }
  if (value === AlertSeverity.HIGH) {
    return (
      <OptionWrap>
        <OptionCircle color="var(--_errorColor)" />
        <OptionLabel>High</OptionLabel>
      </OptionWrap>
    );
  }
  return null;
};
export default React.memo(SeverityOption);
