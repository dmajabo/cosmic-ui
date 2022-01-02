import React from 'react';
import { Tooltip, Fade } from '@mui/material';
import { withStyles } from '@mui/styles';
import { TooltipPlacement } from 'lib/models/general';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { InfoError, InfoErrorWrapper } from './styles';
import { warningInfo } from 'app/components/SVGIcons/warningInfo';
const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'var(--_primaryBg)',
    color: 'var(--_primaryTextColor)',
    maxWidth: 220,
    fontSize: 12,
    border: '1px solid',
    borderColor: 'var(--_disabledButtonBg)',
    padding: '2px 8px',
    margin: '8px 0 0 0',
    whiteSpace: 'normal',
  },
  arrow: {
    color: 'var(--_disabledButtonBg)',
    width: '16px',
    height: '8px',
    marginLeft: '8px',
  },
}))(Tooltip);

interface Props {
  stepNumber: number | string;
  errors: string[];
}

const WarningInfo: React.FC<Props> = (props: Props) => {
  return (
    <HtmlTooltip
      title={
        <InfoErrorWrapper>
          {props.errors.map((error, i) => (
            <InfoError key={`${props.stepNumber}${i}stepError`}>{error}</InfoError>
          ))}
        </InfoErrorWrapper>
      }
      placement={TooltipPlacement.BOTTOM_END}
      disableFocusListener
      disableTouchListener
      TransitionComponent={Fade}
      enterDelay={500}
      leaveDelay={200}
      PopperProps={{
        disablePortal: true,
      }}
    >
      <span style={{ margin: 'auto 30px auto auto', display: 'inline-block', flexShrink: 0 }}>
        <IconWrapper width="20px" height="20px" icon={warningInfo} />
      </span>
    </HtmlTooltip>
  );
};

export default React.memo(WarningInfo);
