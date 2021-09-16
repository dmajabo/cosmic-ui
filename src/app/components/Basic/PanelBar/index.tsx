import React from 'react';
import { PanelContent, Panel } from './styles';
import IconButton from 'app/components/Buttons/IconButton';
import { closeIcon } from 'app/components/SVGIcons/close';
import PanelWrapper from './PanelWrapper';
import { IPanelBarLayoutTypes } from 'lib/models/general';

interface IProps {
  type: IPanelBarLayoutTypes;
  show: boolean;
  children?: React.ReactNode;
  onHidePanel: () => void;
}

const PanelBar: React.FC<IProps> = (props: IProps) => {
  const onHide = () => {
    props.onHidePanel();
  };
  return (
    <PanelWrapper show={props.show} type={props.type}>
      <Panel>
        <IconButton styles={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'transparent', zIndex: 2 }} icon={closeIcon} onClick={onHide} />
        <PanelContent>{props.children}</PanelContent>
      </Panel>
    </PanelWrapper>
  );
};

export default React.memo(PanelBar);
