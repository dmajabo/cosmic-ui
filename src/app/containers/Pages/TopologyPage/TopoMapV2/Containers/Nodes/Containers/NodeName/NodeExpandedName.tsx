import React from 'react';
import { IExpandLabelStyle } from '../../../../model';

interface Props {
  name: string;
  description?: string;
  strBtnLabel?: string;
  onClick?: () => void;
  nodeWidth: number;
  markerWidth: number;
  height: number;
  stylesObj: IExpandLabelStyle;
  count?: number;
}

const NodeExpandedName: React.FC<Props> = (props: Props) => {
  const [width, setWidth] = React.useState<number>(0);

  React.useEffect(() => {
    const _w = props.nodeWidth - props.markerWidth;
    setWidth(_w);
  }, []);

  return (
    <foreignObject width={width} height={props.height} x={props.markerWidth} y={props.stylesObj.y} pointerEvents="none">
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            fontWeight: 500,
            flexWrap: 'nowrap',
            padding: '0 16px 0 8px',
          }}
        >
          <span
            style={{
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
          {props.strBtnLabel && (
            <span
              style={{
                display: 'inline-block',
                flexShrink: 0,
                margin: 'auto 0 auto auto',
                fontSize: props.stylesObj.strBtnFontSize + 'px',
                color: props.stylesObj.strBtnColor,
                pointerEvents: 'all',
              }}
              onClick={props.onClick}
            >
              {props.strBtnLabel}
            </span>
          )}
        </div>
        {props.description && (
          <div style={{ fontSize: '12px', padding: '0 16px 0 8px', color: '#848DA3' }}>
            <span>{props.description}</span>
          </div>
        )}
        {props.count > 0 && (
          <div style={{ fontSize: '10px', padding: '0 16px 0 8px', color: '#848DA3' }}>
            <span>{props.count} VPC</span>
          </div>
        )}
      </div>
    </foreignObject>
  );
};

export default React.memo(NodeExpandedName);
