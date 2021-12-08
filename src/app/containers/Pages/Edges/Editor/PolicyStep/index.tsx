import React from 'react';
import PolicyItem from './PolicyItem';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { FormRow, PolicyItemsWrapper } from './styles';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { getCartesianValues, getPossibleValues } from './helper';
import { ISegmentP, ISegmentRuleP } from 'lib/api/ApiModels/Edges/apiModel';
import { createNewEdgePolicy } from '../helper';

interface Props {
  siteGroupIds: string[];
  appGroupIds: string[];
  segmentPolicy: ISegmentP;
  onChangeSegmentPolicy: (v: any, field: string) => void;
  onUpdatePolicy: (policy: ISegmentRuleP, index: number) => void;
  onAddPolicy: (policy: ISegmentRuleP) => void;
  onDeletePolicy: (index: number) => void;
}

const PolicyStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [items, setItems] = React.useState<ISegmentRuleP[] | null>([]);
  const [sources, setSources] = React.useState<ITopologyGroup[]>([]);
  const [destinations, setDestinations] = React.useState<ITopologyGroup[]>([]);
  const [combinations, setCombinations] = React.useState<ITopologyGroup[][]>([]);

  React.useEffect(() => {
    // if (edges && edges.groups) {
    //   const _sources: ITopologyGroup[] = [];
    //   const _destinations: ITopologyGroup[] = [];
    //   if (props.siteGroupIds && props.siteGroupIds.length) {
    //     props.siteGroupIds.forEach(it => {
    //       const _gr: ITopologyGroup = edges.groups.find(el => el.id === it);
    //       if (_gr) {
    //         _sources.push(_gr);
    //       }
    //     });
    //   }
    //   if (props.appGroupIds && props.appGroupIds.length) {
    //     props.appGroupIds.forEach(it => {
    //       const _gr: ITopologyGroup = edges.groups.find(el => el.id === it);
    //       if (_gr) {
    //         _destinations.push(_gr);
    //       }
    //     });
    //   }
    //   const _arr: ITopologyGroup[][] = getCartesianValues(_sources, _destinations);
    //   const _combinations: ITopologyGroup[][] = getPossibleValues(props.policies, _arr);
    //   setCombinations(_combinations);
    //   setSources(_sources);
    //   setDestinations(_destinations);
    // } else {
    //   setCombinations([]);
    //   setSources([]);
    //   setDestinations([]);
    // }
  }, [edges.groups, props.siteGroupIds, props.appGroupIds]);

  // React.useEffect(() => {
  //   if (props.policies !== items) {
  //     const _arr: ITopologyGroup[][] = getCartesianValues(sources, destinations);
  //     const _combinations: ITopologyGroup[][] = getPossibleValues(props.policies, _arr);
  //     setCombinations(_combinations);
  //     setItems(props.policies || []);
  //   }
  // }, [props.policies]);
  // const onInputChange = (value: string | null) => {
  //   onChange(value, 'name');
  // };

  const onUpdateItem = (value: string | null, field: string, index: number) => {
    const _items: ISegmentRuleP[] = jsonClone(items);
    _items[index][field] = value;
    setItems(_items);
    // if (_items[index].source && _items[index].destination) {
    //   props.onChange(_items[index], index);
    // }
  };

  const onDeleteItem = (index: number) => {
    props.onDeletePolicy(index);
  };

  const onAddPolicy = () => {
    const _obj: ISegmentRuleP = createNewEdgePolicy();
    props.onAddPolicy(_obj);
  };

  return (
    <>
      {items && items.length ? (
        <PolicyItemsWrapper>
          {items.map((it, index) => (
            <PolicyItem key={`policy${index}`} index={index} item={it} onUpdateItem={onUpdateItem} onDeleteItem={onDeleteItem} sources={sources} destinations={destinations} />
          ))}
        </PolicyItemsWrapper>
      ) : null}
      <FormRow justifyContent={items && items.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton disabled={!combinations || !combinations.length} icon={plusIcon} label="Create POLICY" onClick={onAddPolicy} />
      </FormRow>
    </>
  );
};
export default React.memo(PolicyStep);
