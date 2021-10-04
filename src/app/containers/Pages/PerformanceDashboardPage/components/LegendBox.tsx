import React from 'react';

interface LegendBoxProps {
  readonly color: string;
}

const LegendBox: React.FC<LegendBoxProps> = ({ color }) => {
  return (
    <span
      style={{
        backgroundColor: color,
        paddingLeft: 30,
        paddingTop: 9,
        borderRadius: 6,
      }}
    />
  );
};
export default LegendBox;
