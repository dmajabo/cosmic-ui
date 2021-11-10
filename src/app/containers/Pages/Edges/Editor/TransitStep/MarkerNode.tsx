import React from 'react';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { Marker, MarkerContent, MarkerName, MarkerRegion } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { IAwsRegion } from 'lib/api/ApiModels/Accounts/apiModel';

interface Props {
  region: IAwsRegion;
  selectedList: IAwsRegion[];
  index: number;
  onClick: (e: IAwsRegion, index: number) => void;
}
const MarkerNode: React.FC<Props> = ({ region, onClick, index, selectedList }) => {
  const onSelectRegion = () => {
    onClick(region, index);
  };
  return (
    <Marker onClick={onSelectRegion}>
      <SimpleCheckbox isChecked={!!(selectedList && selectedList.length && selectedList.find(it => it.id === region.id))} />
      <IconWrapper icon={awsIcon(30)} styles={{ margin: 'auto 12px auto 16px' }} />
      <MarkerContent>
        <MarkerRegion>{region.city}</MarkerRegion>
        <MarkerName>{region.name}</MarkerName>
      </MarkerContent>
    </Marker>
  );
};

export default React.memo(MarkerNode);
