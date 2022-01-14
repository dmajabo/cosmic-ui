import React from 'react';
import { Counter, HtmlIconWrapper, HtmlLabel, HtmlNode, SvgWrapper } from './styles';

interface Props {
  icon: any;
  name: string;
  count: number;
  styles?: Object;
}

const HtmlIconNode: React.FC<React.HTMLAttributes<HTMLElement> & Props> = ({ icon, name, count, styles }) => {
  return (
    <HtmlNode style={styles}>
      <HtmlIconWrapper>
        <SvgWrapper>{icon}</SvgWrapper>
        <Counter>{count}</Counter>
      </HtmlIconWrapper>
      <HtmlLabel>{name}</HtmlLabel>
    </HtmlNode>
  );
};

export default React.memo(HtmlIconNode);
