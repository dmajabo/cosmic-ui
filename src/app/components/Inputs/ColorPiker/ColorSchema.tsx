import React from 'react';
import { ColorItemStyles, SchemaTable } from './styles';

interface Props {
  id: string;
  onClick: (v: string) => void;
  schema: string[][];
}

const ColorSchema: React.FC<Props> = (props: Props) => {
  return (
    <SchemaTable>
      <tbody>
        {props.schema.map((row, index) => (
          <tr key={`row${index}`}>
            {row.map((it, i) => (
              <ColorItemStyles key={`tdcolor${it}${index}${i}`} color={it} onClick={() => props.onClick(it)} />
            ))}
          </tr>
        ))}
      </tbody>
    </SchemaTable>
  );
};
export default React.memo(ColorSchema);
