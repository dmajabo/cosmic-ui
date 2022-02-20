import React from 'react';
import { PanelContent, Panel, ResizablePanelWrapperStyles } from './styles';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import IconWrapper from 'app/components/Buttons/IconWrapper';
// import { getSessionStoragePreference, updateSessionStoragePreference } from 'lib/helpers/localStorageHelpers';
import { ToogleButton } from 'app/components/Sidebar/styles';
import { toggleSideBarIcon } from 'app/components/SVGIcons/toggleSideBarIcon';

interface IProps {
  show: boolean;
  children?: React.ReactNode;
  panelWidth: number;
  onHidePanel: () => void;
  onPanelWidthChange: (width: number) => void;
  styles?: Object;
}

const ResizablePanel: React.FC<IProps> = (props: IProps) => {
  const [open, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const refW = React.useRef(width);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (props.show) {
      const _defW = Number(props.panelWidth) || 450;
      refW.current = _defW;
      setWidth(_defW);
      setOpen(true);
    } else {
      ref.current.style.width = null;
      setWidth(0);
      setOpen(false);
      document.removeEventListener('mousemove', doDrag, false);
      document.removeEventListener('mouseup', stopDrag, false);
      document.removeEventListener('mouseleave', stopDrag, false);
    }
  }, [props.show]);

  React.useEffect(() => {
    if (open && props.panelWidth !== width) {
      const _defW = Number(props.panelWidth) || 450;
      refW.current = _defW;
      setWidth(_defW);
    }
  }, [props.panelWidth]);

  const initResize = event => {
    if (!ref.current) return;
    const panel = document.getElementById('resizableDivPanel');
    panel.classList.add('dragStart');
    document.addEventListener('mousemove', doDrag, false);
    document.addEventListener('mouseup', stopDrag, false);
    document.addEventListener('mouseleave', stopDrag, false);
  };

  const doDrag = event => {
    if (!ref.current) return;
    const node = document.getElementById('resizableDiv').parentElement;
    const _width = refW.current - event.movementX;
    if (_width < 450) {
      refW.current = 450;
      ref.current.style.width = '450px';
      return;
    }
    if (_width > node.clientWidth * 0.8) {
      refW.current = node.clientWidth * 0.8;
      ref.current.style.width = node.clientWidth * 0.8 + 'px';
      return;
    }
    refW.current = _width;
    ref.current.style.width = _width + 'px';
  };

  const stopDrag = () => {
    if (!ref.current) return;
    if (window.getSelection) {
      if (window.getSelection().empty) {
        // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        // Firefox
        window.getSelection().removeAllRanges();
      }
    }
    const { width } = window.getComputedStyle(ref.current);
    const panel = document.getElementById('resizableDivPanel');
    panel.classList.remove('dragStart');
    document.removeEventListener('mousemove', doDrag, false);
    document.removeEventListener('mouseup', stopDrag, false);
    document.removeEventListener('mouseleave', stopDrag, false);
    const newW = parseInt(width, 10);
    refW.current = newW;
    // updateSessionStoragePreference(newW, props.storageKey);
    setWidth(newW);
    props.onPanelWidthChange(newW);
  };

  return (
    <ResizablePanelWrapperStyles id="resizableDiv" className={open ? 'open' : ''} ref={ref} style={{ width: width + 'px', ...props.styles }}>
      <ToogleButton onMouseDown={initResize} onMouseUp={stopDrag}>
        {toggleSideBarIcon}
      </ToogleButton>
      {open && (
        <Panel id="resizableDivPanel">
          <IconWrapper styles={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'transparent', zIndex: 2 }} icon={closeSmallIcon} onClick={props.onHidePanel} />
          <PanelContent>{props.children}</PanelContent>
        </Panel>
      )}
    </ResizablePanelWrapperStyles>
  );
};

export default React.memo(ResizablePanel);
