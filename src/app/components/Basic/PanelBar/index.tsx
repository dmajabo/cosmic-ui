import React from 'react';
import { PanelContent, Panel, PanelWrapperStyles } from './styles';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import IconWrapper from 'app/components/Buttons/IconWrapper';

interface IProps {
  type?: IPanelBarLayoutTypes;
  show: boolean;
  maxWidth?: string;
  height?: string;
  children?: React.ReactNode;
  onHidePanel: () => void;
  styles?: Object;
}

const PanelBar: React.FC<IProps> = ({ type, maxWidth, height, show, children, styles, onHidePanel }) => {
  return (
    <PanelWrapperStyles style={styles} show={show} type={type || IPanelBarLayoutTypes.VERTICAL} maxWidth={maxWidth || '450px'} height={height || '100%'}>
      <Panel>
        <IconWrapper styles={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'transparent', zIndex: 2 }} icon={closeSmallIcon} onClick={onHidePanel} />
        <PanelContent>{children}</PanelContent>
      </Panel>
    </PanelWrapperStyles>
  );
};

export default React.memo(PanelBar);
