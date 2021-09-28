import React from 'react';
import IconWrapper from '../Buttons/IconWrapper';
import { CardWrapper, ContentWrapStyles, IconWrapStyles, Label, ValueStyles } from './styles';

interface Props {
  icon: string | JSX.Element;
  label: string;
  value: number | string;
  valueColor?: string;
  styles?: Object;
}

const SessionCard: React.FC<Props> = (props: Props) => {
  return (
    <CardWrapper style={props.styles}>
      <IconWrapStyles>
        <IconWrapper icon={props.icon} width="40px" height="40px" />
      </IconWrapStyles>
      <ContentWrapStyles>
        <Label>{props.label}</Label>
        <ValueStyles color={props.valueColor}>{props.value}</ValueStyles>
      </ContentWrapStyles>
    </CardWrapper>
  );
};

export default React.memo(SessionCard);
