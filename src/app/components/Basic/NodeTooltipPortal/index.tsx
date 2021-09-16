import React from 'react';
import ReactDOM from 'react-dom';
import { Wrapper } from './styles';
import { EVENT_LISTENERS, ICoord } from 'lib/models/general';

interface Props {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}
const NodeTooltipPortal: React.FC<Props> = (props: Props) => {
  const [coord, setCoord] = React.useState<ICoord>({ x: props.x, y: props.y });
  const ref = React.useRef(null);

  React.useEffect(() => {
    const childNodesToRemove = document.getElementsByClassName('popupContainer');
    if (childNodesToRemove.length) {
      for (let i = childNodesToRemove.length - 1; i >= 0; i--) {
        const childNode = childNodesToRemove[i];
        if (childNode && childNode.id !== `popupContainer${props.id}`) {
          document.body.removeChild(childNode);
        }
      }
    }
    document.addEventListener(EVENT_LISTENERS.MOUSE_MOVE, onMove);
    return () => {
      document.removeEventListener(EVENT_LISTENERS.MOUSE_MOVE, onMove);
    };
  }, []);

  const onMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    if (clientX !== coord.x || clientY !== coord.y) {
      setCoord({ x: clientX, y: clientY });
    }
  };

  if (!coord) {
    return null;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <Wrapper id={`popupContainer${props.id}`} className="popupContainer" data-x={coord.x} data-y={coord.y} ref={ref} x={coord.x} y={coord.y} aria-modal aria-hidden tabIndex={-1} role="dialog">
          {props.children}
        </Wrapper>,
        document.body,
      )}
    </>
  );
};

export default React.memo(NodeTooltipPortal);
