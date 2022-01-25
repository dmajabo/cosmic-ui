import React from 'react';

interface IProps {
  id: string;
  children?: React.ReactNode | React.ReactNode[];
}
const GContainer: React.FC<IProps> = (props: IProps) => {
  return <g id={props.id}>{props.children}</g>;
};

export default React.memo(GContainer);
