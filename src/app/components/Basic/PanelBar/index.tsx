import React from 'react';
import { PanelContent, Panel, PanelWrapperStyles } from './styles';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { IPanelBarLayoutTypes } from 'lib/models/general';
import IconWrapper from 'app/components/Buttons/IconWrapper';

interface IProps {
  type: IPanelBarLayoutTypes;
  show: boolean;
  children?: React.ReactNode;
  onHidePanel: () => void;
}

const PanelBar: React.FC<IProps> = ({ type, show, children, onHidePanel }) => {
  return (
    <PanelWrapperStyles show={show} type={type}>
      <Panel>
        <IconWrapper styles={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'transparent', zIndex: 2 }} icon={closeSmallIcon} onClick={onHidePanel} />
        <PanelContent>{children}</PanelContent>
      </Panel>
    </PanelWrapperStyles>
  );
};

export default React.memo(PanelBar);
