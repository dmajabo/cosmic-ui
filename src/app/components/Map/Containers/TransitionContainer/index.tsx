import React from 'react';
import { Transition } from 'react-transition-group';
interface Props {
  stateIn: boolean;
  children: React.ReactNode;
}
const TransitionContainer: React.FC<Props> = (props: Props) => {
  return (
    <Transition mountOnEnter unmountOnExit timeout={100} in={props.stateIn}>
      {state => <g className={state}>{props.children}</g>}
    </Transition>
  );
};

export default React.memo(TransitionContainer);
