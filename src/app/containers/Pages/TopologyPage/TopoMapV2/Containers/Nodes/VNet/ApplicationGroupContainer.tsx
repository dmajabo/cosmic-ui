import React from 'react';
import { WrapperVms } from './styles';
import ApplicationGroup from '../ApplicationGroup';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';

interface IProps {
  items: ITopologyGroup[];
  showMore: boolean;
  onClickGroup: (vm: ITopologyGroup) => void;
}

const ApplicationGroupContainer: React.FC<IProps> = (props: IProps) => {
  return (
    <WrapperVms showMore={props.showMore}>
      {props.items.map(it => (
        <ApplicationGroup key={`appGroup${it.id}`} dataItem={it} onClick={props.onClickGroup} />
      ))}
    </WrapperVms>
  );
};

export default React.memo(ApplicationGroupContainer);
