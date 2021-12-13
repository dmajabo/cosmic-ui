import React from 'react';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { ISegmentP } from 'lib/api/ApiModels/Edges/apiModel';
import SegmentPolicy from './SegmentPolicy';
import { createNewSegmentP } from '../helper';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { FormRow } from './styles';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { EmptyMessage } from '../Components/styles';
import { getCartesianValues, getPossibleValues, IPolicyCombination } from './helper';

interface Props {}

const PolicyStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [sources, setSources] = React.useState<ITopologyGroup[]>([]);
  const [destinations, setDestinations] = React.useState<ITopologyGroup[]>([]);
  const [combinations, setCombinations] = React.useState<IPolicyCombination[]>([]);

  React.useEffect(() => {
    if (edges && edges.groups) {
      const _sources: ITopologyGroup[] = [];
      const _destinations: ITopologyGroup[] = [];
      if (edges.editEdge.siteGroupIds && edges.editEdge.siteGroupIds.length) {
        edges.editEdge.siteGroupIds.forEach(it => {
          const _gr: ITopologyGroup = edges.groups.find(el => el.id === it);
          if (_gr) {
            _sources.push(_gr);
          }
        });
      }
      if (edges.editEdge.appGroupIds && edges.editEdge.appGroupIds.length) {
        edges.editEdge.appGroupIds.forEach(it => {
          const _gr: ITopologyGroup = edges.groups.find(el => el.id === it);
          if (_gr) {
            _destinations.push(_gr);
          }
        });
      }
      setSources(_sources);
      setDestinations(_destinations);
    } else {
      setSources([]);
      setDestinations([]);
    }
  }, [edges.groups, edges.editEdge.siteGroupIds, edges.editEdge.appGroupIds]);

  React.useEffect(() => {
    if (sources && sources.length && destinations && destinations.length) {
      const _arr: IPolicyCombination[] = getCartesianValues(sources, destinations);
      const _combinations: IPolicyCombination[] = getPossibleValues(edges.editEdge.segmentPolicy, _arr);
      setCombinations(_combinations);
      return;
    }
    setCombinations([]);
  }, [sources, destinations, edges.editEdge.segmentPolicy]);

  const onAddPolicy = () => {
    const _obj: ISegmentP = createNewSegmentP();
    edges.onAddPolicy(_obj);
  };

  return (
    <>
      {edges.editEdge.segmentPolicy && edges.editEdge.segmentPolicy.length ? (
        edges.editEdge.segmentPolicy.map((policy, index) => (
          <SegmentPolicy key={`segmentPolicy${index}${policy}`} index={index} policy={policy} sources={sources} destinations={destinations} combinations={combinations} />
        ))
      ) : (
        <EmptyMessage>There are no policies yet. To create policy click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={edges.editEdge.segmentPolicy && edges.editEdge.segmentPolicy.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton
          disabled={
            !!(edges.edgeValidationResult && edges.edgeValidationResult.policy && edges.edgeValidationResult.policy.errors && edges.edgeValidationResult.policy.errors.length) ||
            !combinations ||
            !combinations.length
          }
          icon={plusIcon}
          label="Create Policy"
          onClick={onAddPolicy}
        />
      </FormRow>
    </>
  );
};
export default React.memo(PolicyStep);
