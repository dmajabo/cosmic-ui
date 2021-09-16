import React from 'react';
import { PanelWrapperStyles } from './styles';
import { IPanelBarLayoutTypes } from 'lib/models/general';

interface IProps {
  type: IPanelBarLayoutTypes;
  show: boolean;
  children?: React.ReactNode;
}

const PanelWrapper: React.FC<IProps> = (props: IProps) => {
  const [show, setShow] = React.useState(props.show);

  React.useEffect(() => {
    if (show !== props.show) {
      setShow(props.show);
    }
  }, [props.show]);

  return (
    <PanelWrapperStyles show={show} type={props.type}>
      {props.children}
    </PanelWrapperStyles>
  );
};

export default React.memo(PanelWrapper);
