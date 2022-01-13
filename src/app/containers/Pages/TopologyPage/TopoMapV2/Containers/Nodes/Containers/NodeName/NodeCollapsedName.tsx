import React from 'react';
import { ICollapseLabelStyle } from '../../../../model';

interface Props {
  id: string;
  label: string;
  stylesObj: ICollapseLabelStyle;
}

const NodeCollapsedName: React.FC<Props> = (props: Props) => {
  const [labels, setLabels] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (props.label && props.label.length > 20) {
      const _arr = props.label.split(' - ');
      setLabels([_arr[0], ' - ', _arr[1]]);
    } else {
      setLabels([props.label]);
    }
  }, [props.label]);
  return (
    <>
      {labels.map((it, index) => (
        <text
          pointerEvents="none"
          fill={props.stylesObj.fill}
          x={props.stylesObj.x}
          y={props.stylesObj.y + index * 14}
          textAnchor={props.stylesObj.textAnchor}
          fontWeight="500"
          fontSize={props.stylesObj.fontSize}
          fontFamily="DMSans"
          key={`partLabel${props.id}${index}`}
        >
          {it}
        </text>
      ))}
    </>
  );
};

export default React.memo(NodeCollapsedName);
