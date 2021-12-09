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

interface Props {
  siteGroupIds: string[];
  appGroupIds: string[];
  segmentPolicy: ISegmentP[];
  onUpdatePolicy: (policy: ISegmentP, policyIndex: number) => void;
  onAddPolicy: (policy: ISegmentP) => void;
  onDeletePolicy: (policyIndex: number) => void;
}

const PolicyStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [sources, setSources] = React.useState<ITopologyGroup[]>([]);
  const [destinations, setDestinations] = React.useState<ITopologyGroup[]>([]);

  React.useEffect(() => {
    if (edges && edges.groups) {
      const _sources: ITopologyGroup[] = [];
      const _destinations: ITopologyGroup[] = [];
      if (props.siteGroupIds && props.siteGroupIds.length) {
        props.siteGroupIds.forEach(it => {
          const _gr: ITopologyGroup = edges.groups.find(el => el.id === it);
          if (_gr) {
            _sources.push(_gr);
          }
        });
      }
      if (props.appGroupIds && props.appGroupIds.length) {
        props.appGroupIds.forEach(it => {
          const _gr: ITopologyGroup = edges.groups.find(el => el.id === it);
          if (_gr) {
            _destinations.push(_gr);
          }
        });
      }
      // const _arr: ITopologyGroup[][] = getCartesianValues(_sources, _destinations);
      // // const _combinations: ITopologyGroup[][] = getPossibleValues(props.policies, _arr);
      // setCombinations(_arr);
      setSources(_sources);
      setDestinations(_destinations);
    } else {
      // setCombinations([]);
      setSources([]);
      setDestinations([]);
    }
  }, [edges.groups, props.siteGroupIds, props.appGroupIds]);

  const onUpdatePolicy = (policy: ISegmentP, policyIndex: number) => {
    props.onUpdatePolicy(policy, policyIndex);
  };

  const onDeletePolicy = (policyIndex: number) => {
    props.onDeletePolicy(policyIndex);
  };

  const onAddPolicy = () => {
    const _obj: ISegmentP = createNewSegmentP();
    props.onAddPolicy(_obj);
  };

  return (
    <>
      {props.segmentPolicy && props.segmentPolicy.length ? (
        props.segmentPolicy.map((policy, index) => (
          <SegmentPolicy key={`segmentPolicy${index}`} index={index} policy={policy} sources={sources} destinations={destinations} onUpdatePolicy={onUpdatePolicy} onDeletePolicy={onDeletePolicy} />
        ))
      ) : (
        <EmptyMessage>There are no policies yet. To create policy click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={props.segmentPolicy && props.segmentPolicy.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton icon={plusIcon} label="Create Policy" onClick={onAddPolicy} />
      </FormRow>
    </>
  );
};
export default React.memo(PolicyStep);
