import React from 'react';

interface Props {
  id: string;
  offsetY: number;
  children: React.ReactNode;
}

const PeerContainer: React.FC<Props> = ({ id, children, offsetY }) => {
  return (
    <g id={id} transform={`translate(0, ${offsetY})`} data-y={offsetY}>
      {children}
    </g>
  );
};

export default React.memo(PeerContainer);
