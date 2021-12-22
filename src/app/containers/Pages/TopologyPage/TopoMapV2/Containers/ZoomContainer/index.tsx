import React from 'react';

interface Props {
  svgId: string;
  rootId: string;
  children?: React.ReactNode;
}

const ZoomContainer: React.FC<Props> = (props: Props) => {
  return <>{props.children}</>;
};

export default React.memo(ZoomContainer);
