import React from 'react';
import { InternetGetAwayLabel, InternetGetAwayValue, InternetGetAwayRow } from './styles';
import { INnetworkInternetGateway } from 'lib/api/ApiModels/Topology/apiModels';

interface Props {
  dataItem: INnetworkInternetGateway;
}

const InternetGetAwayItem: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props.dataItem.name && (
        <InternetGetAwayRow>
          <InternetGetAwayLabel>Name:</InternetGetAwayLabel>
          <InternetGetAwayValue>{props.dataItem.name}</InternetGetAwayValue>
        </InternetGetAwayRow>
      )}
      {props.dataItem.extId && (
        <InternetGetAwayRow margin="0">
          <InternetGetAwayLabel>Ext ID:</InternetGetAwayLabel>
          <InternetGetAwayValue>{props.dataItem.extId}</InternetGetAwayValue>
        </InternetGetAwayRow>
      )}
    </>
  );
};

export default React.memo(InternetGetAwayItem);
