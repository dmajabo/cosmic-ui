import React from 'react';
import { IStepperItem, StepperItemStateType } from './model';
import { ItemWrappper, Label, Icon, State, Wrapper, Edge, ClickableArea } from './styles';

interface Props {
  index: number;
  item: IStepperItem<any>;
  selected: boolean;
  formatValue?: (_v: number) => string;
  onClick: (index: number) => void;
}

const StepperItem: React.FC<Props> = (props: Props) => {
  const onClick = () => {
    if (props.item.disabled) return;
    props.onClick(props.index);
  };

  return (
    <ItemWrappper state={props.item.state} selected={props.selected} disabled={props.item.disabled}>
      {props.item.showEdge && <Edge />}
      <ClickableArea onClick={onClick} disabled={props.item.disabled}>
        <Icon>
          <span>{props.formatValue ? props.formatValue(props.item.value) : props.item.value}</span>
        </Icon>
        <Wrapper>
          <Label>{props.item.label}</Label>
          {props.item.state !== StepperItemStateType.EMPTY && <State>{props.item.state}</State>}
        </Wrapper>
      </ClickableArea>
    </ItemWrappper>
  );
};

export default React.memo(StepperItem);
