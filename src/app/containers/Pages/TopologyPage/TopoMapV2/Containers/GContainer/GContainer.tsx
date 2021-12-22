import React from 'react';

interface IProps {
  id: string;
  children?: React.ReactChild | React.ReactChild[] | null;
}
const GContainer: React.FC<IProps> = (props: IProps) => {
  return <g id={props.id}>{props.children}</g>;
};

export default React.memo(GContainer);
