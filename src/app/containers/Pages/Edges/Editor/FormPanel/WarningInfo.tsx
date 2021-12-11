import React from 'react';
import { infoIcon } from 'app/components/SVGIcons/infoIcon';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { TooltipPlacement } from 'lib/models/general';
import Fade from '@material-ui/core/Fade';
import IconWrapper from 'app/components/Buttons/IconWrapper';
const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'var(--_primaryBg)',
    color: 'var(--_primaryColor)',
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
        <>
          {props.errors.map((error, i) => (
            <span key={`${props.stepNumber}${i}stepError`}>{error}</span>
          ))}
        </>
      }
      placement={TooltipPlacement.BOTTOM_END}
      disableFocusListener
      disableTouchListener
      TransitionComponent={Fade}
      enterDelay={500}
      leaveDelay={200}
      interactive
      PopperProps={{
        disablePortal: true,
      }}
    >
      <span style={{ margin: 'auto 30px auto auto', display: 'inline-block', flexShrink: 0 }}>
        <IconWrapper width="20px" height="20px" icon={infoIcon} />
      </span>
    </HtmlTooltip>
  );
};

export default React.memo(WarningInfo);
