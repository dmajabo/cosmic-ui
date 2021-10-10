import React from 'react';
import { IStepperItem, StepperItemStateType } from './model';
import { ItemWrappper, Label, Icon, State, Wrapper, Edge, ClickableArea } from './styles';

interface Props {
  item: IStepperItem<any>;
  selected: boolean;
  formatValue?: (_v: number) => string;
  valueFormattedField?: string;
  onClick: (_step: IStepperItem<any>) => void;
}

const StepperItem: React.FC<Props> = (props: Props) => {
  const onClick = () => {
    if (props.item.disabled) return;
    props.onClick(props.item);
  };

  return (
    <ItemWrappper state={props.item.state} selected={props.selected} disabled={props.item.disabled}>
      {props.item.showEdge && <Edge />}
      <ClickableArea onClick={onClick} disabled={props.item.disabled}>
        <Icon>
          <span>{props.formatValue && props.valueFormattedField ? props.formatValue(props.item[props.valueFormattedField]) : props.item.value}</span>
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
