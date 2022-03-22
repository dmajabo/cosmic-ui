import React from 'react';
import { ILabelHtmlStyles } from '../../../../model';

interface Props {
  name: string;
  labelStyles: ILabelHtmlStyles;
  labelWidth?: number;
}

const HtmlNodeLabel: React.FC<Props> = ({ name, labelStyles, labelWidth }) => {
  return (
    <foreignObject width="1" height="1" style={{ overflow: 'visible' }} x={labelStyles.x} y={labelStyles.y} pointerEvents="none">
      <div
        style={{
          display: 'inline-block',
          width: labelWidth ? labelWidth + 'px' : labelStyles.width + 'px',
          textAlign: 'center',
          color: labelStyles.fill,
          fontSize: labelStyles.fontSize + 'px',
          fontWeight: 500,
          pointerEvents: 'none',
          verticalAlign: 'top',
          marginTop: labelStyles.marginTop ? labelStyles.marginTop + 'px' : '0px',
        }}
        className="textOverflowEllips"
        title={name}
      >
        {name}
      </div>
    </foreignObject>
  );
};

export default React.memo(HtmlNodeLabel);
