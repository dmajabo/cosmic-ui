import React from 'react';

interface Props {
  offsetY: number;
  offsetX: number;
  children: React.ReactNode;
}

const WebAclsContainer: React.FC<Props> = ({ offsetY, offsetX, children }) => {
  return (
    <g transform={`translate(${offsetX}, ${offsetY})`} data-x={offsetX} data-y={offsetY}>
      {children}
    </g>
  );
};

export default React.memo(WebAclsContainer);
