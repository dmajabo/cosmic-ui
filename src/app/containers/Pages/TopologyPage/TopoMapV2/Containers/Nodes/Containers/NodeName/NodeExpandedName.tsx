import React from 'react';
import { IExpandLabelStyle } from '../../../../model';

interface Props {
  name: string;
  strBtnLabel: string;
  nodeWidth: number;
  markerWidth: number;
  height: number;
  stylesObj: IExpandLabelStyle;
}

const NodeExpandedName: React.FC<Props> = (props: Props) => {
  const [width, setWidth] = React.useState<number>(0);

  React.useEffect(() => {
    const _w = props.nodeWidth - props.markerWidth;
    setWidth(_w);
  }, []);

  return (
    <foreignObject width={width} height={props.height} x={props.markerWidth} y={props.stylesObj.y}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          fontWeight: 500,
          flexWrap: 'nowrap',
          padding: '0 16px 0 8px',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            maxWidth: 'calc(100% - 12px)',
            margin: 'auto 12px auto 0',
            color: props.stylesObj.fill,
            fontSize: props.stylesObj.fontSize + 'px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {props.name}
        </span>
        <span
          style={{
            display: 'inline-block',
            flexShrink: 0,
            margin: 'auto 0 auto auto',
            fontSize: props.stylesObj.strBtnFontSize + 'px',
            color: props.stylesObj.strBtnColor,
          }}
        >
          {props.strBtnLabel}
        </span>
      </div>
    </foreignObject>
  );
};

export default React.memo(NodeExpandedName);
