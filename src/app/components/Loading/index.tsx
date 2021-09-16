import React from 'react';
import { Wrapper } from './styles';
import { loadingIcon } from 'app/components/SVGIcons/loading';

interface IProps {
  margin?: string;
  width?: string;
  height?: string;
  className?: string;
}

const LoadingIndicator = (props: IProps) => (
  <Wrapper className={props.className} margin={props.margin} width={props.width} height={props.height}>
    {loadingIcon}
  </Wrapper>
);

export default React.memo(LoadingIndicator);
