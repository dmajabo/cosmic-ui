import React from 'react';
import { ISegmentRuleP, SegmentRuleAction } from 'lib/api/ApiModels/Edges/apiModel';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { getSelectedItem } from 'lib/helpers/selectionHelper';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { separatorIcon } from 'app/components/SVGIcons/separatorIcon';
import { AccordionRuleHeader, RuleLabel } from './styles';

interface Props {
  item: ISegmentRuleP;
  groups: ITopologyGroup[];
}

const RuleHeader: React.FC<Props> = (props: Props) => {
  const [selectedSource, setSelectedSource] = React.useState<ITopologyGroup>(null);
  const [selectedDest, setSelectedDest] = React.useState<ITopologyGroup>(null);
  React.useEffect(() => {
    const _vS: ITopologyGroup = getSelectedItem(props.groups, props.item.sourceId, 'id');
    const _vD: ITopologyGroup = getSelectedItem(props.groups, props.item.destId, 'id');
    setSelectedSource(_vS);
    setSelectedDest(_vD);
  }, [props.item, props.groups]);

  return (
    <AccordionRuleHeader>
      {selectedSource && <RuleLabel>{selectedSource.name}</RuleLabel>}
      {selectedSource && <IconWrapper styles={{ margin: 'auto 12px' }} width="8px" height="10px" icon={separatorIcon} />}
      {selectedDest && <RuleLabel>{selectedDest.name}</RuleLabel>}
      {selectedDest && <IconWrapper styles={{ margin: 'auto 12px' }} width="8px" height="10px" icon={separatorIcon} />}
      {props.item.action && <>{props.item.action === SegmentRuleAction.ALLOW && <RuleLabel style={{ flexShrink: 0 }}>Allow</RuleLabel>}</>}
    </AccordionRuleHeader>
  );
};
export default React.memo(RuleHeader);
