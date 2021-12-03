import React from 'react';
import PolicyItem from './PolicyItem';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { FormRow, PolicyItemsWrapper } from './styles';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { createNewEdgePolicy } from '../model';
import { IEdgePolicy } from 'lib/api/ApiModels/Edges/apiModel';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { jsonClone } from 'lib/helpers/cloneHelper';
interface Props {
  siteGroupIds: string[];
  appGroupIds: string[];
  policies: IEdgePolicy[] | null;
  onChange: (value: IEdgePolicy[]) => void;
}

const PolicyStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [items, setItems] = React.useState<IEdgePolicy[] | null>(props.policies);
  const [sources, setSources] = React.useState<ITopologyGroup[]>([]);
  const [destinations, setdestinations] = React.useState<ITopologyGroup[]>([]);

  React.useEffect(() => {
    if (props.policies !== items) {
      setItems(props.policies);
    }
  }, [props.policies]);

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
      setSources(_sources);
      setdestinations(_destinations);
    } else {
      setSources([]);
      setdestinations([]);
    }
  }, [edges.groups, props.siteGroupIds, props.appGroupIds]);

  // const onInputChange = (value: string | null) => {
  //   onChange(value, 'name');
  // };

  const onUpdateItem = (value: string | null, field: string, index: number) => {
    const _items: IEdgePolicy[] = jsonClone(items);
    _items[index][field] = value;
    setItems(_items);
    if (_items[index].source && _items[index].destination) {
      props.onChange(_items);
    }
  };

  const onAddPolicy = () => {
    const _items: IEdgePolicy[] = items && items.length ? [...items] : [];
    const _obj: IEdgePolicy = createNewEdgePolicy();
    _items.push(_obj);
    setItems(_items);
  };

  return (
    <>
      {items && items.length ? (
        <PolicyItemsWrapper>
          {items.map((it, index) => (
            <PolicyItem key={`policy${index}`} index={index} item={it} onUpdateItem={onUpdateItem} sources={sources} destinations={destinations} />
          ))}
        </PolicyItemsWrapper>
      ) : null}
      <FormRow justifyContent={items && items.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton icon={plusIcon} label="Create POLICY" onClick={onAddPolicy} />
      </FormRow>
    </>
  );
};
export default React.memo(PolicyStep);
