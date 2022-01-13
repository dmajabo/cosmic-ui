import React from 'react';

interface Props {
  children: React.ReactNode;
}

const StructureContainer: React.FC<Props> = (props: Props) => {
  return <g transform="translate(40, 40)">{props.children}</g>;
};

export default React.memo(StructureContainer);
