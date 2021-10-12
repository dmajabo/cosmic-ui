import React from 'react';
import { BreadCrumbItemStyle } from './styles';

interface Props {
  item: string;
  highlight?: boolean;
  onClick: (_v: string) => void;
}

const BreadCrumbItem: React.FC<Props> = (props: Props) => {
  const onClick = () => {
    props.onClick(props.item);
  };
  return (
    <BreadCrumbItemStyle highlight={props.highlight} onClick={onClick}>
      {props.item}
    </BreadCrumbItemStyle>
  );
};

export default React.memo(BreadCrumbItem);
