import React from 'react';

interface Props {
  offsetY: number;
  children: React.ReactNode;
}

const WebAclsContainer: React.FC<Props> = ({ offsetY, children }) => {
  return (
    <g transform={`translate(0, ${offsetY})`} data-y={offsetY}>
      {children}
    </g>
  );
};

export default React.memo(WebAclsContainer);
