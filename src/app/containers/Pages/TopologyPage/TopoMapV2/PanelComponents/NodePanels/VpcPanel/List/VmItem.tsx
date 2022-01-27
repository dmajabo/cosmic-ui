import React from 'react';
import { Label, SegmentColorRect, VmWrapStyles } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { vmIcon } from 'app/components/SVGIcons/topologyIcons/vm';
import { INetworkVM } from 'lib/api/ApiModels/Topology/apiModels';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';

interface Props {
  dataItem: INetworkVM;
  onClick: (_item: INetworkVM) => void;
}

const VmItem: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [segmentColor, setSegmentColor] = React.useState<string>(null);

  React.useEffect(() => {
    if (!topology.originSegmentsData || !props.dataItem.segmentId) return;
    const segment = topology.originSegmentsData.find(it => it.id === props.dataItem.segmentId);
    if (segment) {
      setSegmentColor(segment.color);
    }
  }, []);

  const onClick = () => {
    props.onClick(props.dataItem);
  };
  return (
    <VmWrapStyles onClick={onClick} title={props.dataItem.name || props.dataItem.extId}>
      <IconWrapper icon={vmIcon} width="20px" height="20px" styles={{ margin: '0 12px 0 0' }} />
      <Label style={{ maxWidth: segmentColor ? 'calc(100% - 64px)' : null, margin: segmentColor ? '0 auto 0 0' : '0' }}>{props.dataItem.name ? props.dataItem.name : props.dataItem.extId}</Label>
      {segmentColor && <SegmentColorRect color={segmentColor} />}
    </VmWrapStyles>
  );
};

export default React.memo(VmItem);
