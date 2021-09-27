import React from 'react';
import styled from 'styled-components';

const NameStyles = styled.div`
  width: auto;
  min-width: 100px;
  min-height: 20px;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  pointer-events: none;
  color: var(--_primaryColor);
`;

const LabelBeforeStyles = styled.div`
  font-weight: 700;
  font-size: 14px;
`;

interface Props {
  labelBefore?: string;
  name: string;
  dx: number;
  dy: number;
}

const NodeName: React.FC<Props> = (props: Props) => {
  return (
    <foreignObject pointerEvents="none" x={props.dx || 0} y={props.dy || 0} width="1" height="1" overflow="visible">
      <NameStyles title={`${props.labelBefore ? `${props.labelBefore} ${props.name}` : `${props.name}`}`}>
        {props.labelBefore && <LabelBeforeStyles>{props.labelBefore}</LabelBeforeStyles>}
        <span>{props.name}</span>
      </NameStyles>
    </foreignObject>
  );
};

export default React.memo(NodeName);
