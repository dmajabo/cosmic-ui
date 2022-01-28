import React from 'react';
import { ActionRowStyles } from 'app/containers/Pages/Shared/styles';

interface Props {}

const HeaderActionsRow: React.FC<Props> = (props: Props) => {
  return <ActionRowStyles margin="0 0 30px 0" zIndex={2}></ActionRowStyles>;
};

export default React.memo(HeaderActionsRow);
