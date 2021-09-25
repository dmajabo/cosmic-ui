import React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionGContainer } from './styles';

interface Props {
  stateIn: boolean;
  children: React.ReactNode;
}
const TransitionContainer: React.FC<Props> = (props: Props) => {
  // if (!props.stateIn) return null;
  // return <g>{props.children}</g>;
  return (
    <Transition mountOnEnter unmountOnExit timeout={100} in={props.stateIn}>
      {state => <TransitionGContainer className={state}>{props.children}</TransitionGContainer>}
    </Transition>
  );
};

export default React.memo(TransitionContainer);
