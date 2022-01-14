import React from 'react';

interface Props {
  id: string;
  offsetY: number;
  offsetX: number;
  children: React.ReactNode;
}

const PeerContainer: React.FC<Props> = ({ id, children, offsetY, offsetX }) => {
  return (
    <g id={id} transform={`translate(${offsetX}, ${offsetY})`} data-x={offsetX} data-y={offsetY}>
      {children}
    </g>
  );
};

export default React.memo(PeerContainer);
