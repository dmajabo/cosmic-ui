import React from 'react';
import { ILabelHtmlStyles } from '../../../../model';

interface Props {
  name: string;
  labelStyles: ILabelHtmlStyles;
}

const HtmlNodeLabel: React.FC<Props> = ({ name, labelStyles }) => {
  return (
    <foreignObject width={labelStyles.width} height={labelStyles.height} x={labelStyles.x} y={labelStyles.y}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
        title={name}
      >
        <span
          style={{
            display: 'inline-block',
            maxWidth: '100%',
            margin: 'auto',
            color: labelStyles.fill,
            fontSize: labelStyles.fontSize + 'px',
            textAlign: 'center',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontWeight: 500,
            pointerEvents: 'none',
          }}
        >
          {name}
        </span>
      </div>
    </foreignObject>
  );
};

export default React.memo(HtmlNodeLabel);
