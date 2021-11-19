import React from 'react';
import { ErrorMessage } from '../Basic/ErrorMessage/ErrorMessage';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { DeleteWrapper, IconStyles } from './styles';

interface IProps {
  text?: string;
  icon?: any;
  styles?: Object;
  iconStyles?: Object;
  textStyles?: Object;
  loading?: boolean;
  children?: React.ReactNode;
}

const DeleteDialog: React.FC<IProps> = ({ text, icon, styles, iconStyles, textStyles, loading, children }) => (
  <DeleteWrapper style={styles}>
    {icon && <IconStyles style={iconStyles}>{icon}</IconStyles>}
    {text && <ErrorMessage style={textStyles}>{text}</ErrorMessage>}
    {loading && (
      <AbsLoaderWrapper width="100%" height="100%">
        <LoadingIndicator margin="auto" />
      </AbsLoaderWrapper>
    )}
    {children}
  </DeleteWrapper>
);

export default React.memo(DeleteDialog);
