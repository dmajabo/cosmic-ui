import React from 'react';
import { IEdgePolicy } from '../../model';
import PolicyItem from './PolicyItem';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { FormRow, PolicyItemsWrapper } from './styles';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { createNewEdgePolicy } from '../model';
interface Props {
  policies: IEdgePolicy[] | null;
  onChange: (value: any | null, field: string) => void;
}

const PolicyStep: React.FC<Props> = ({ policies, onChange }) => {
  const [items, setItems] = React.useState<IEdgePolicy[] | null>(policies);

  React.useEffect(() => {
    if (policies !== items) {
      setItems(policies);
    }
  }, [policies]);

  // const onInputChange = (value: string | null) => {
  //   onChange(value, 'name');
  // };

  const onUpdateItem = (value: string | null, field: string, index) => {
    const _items: IEdgePolicy[] = items.slice();
    _items[index][field] = value;
    setItems(_items);
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
            <PolicyItem key={`policy${index}`} index={index} item={it} onUpdateItem={onUpdateItem} />
          ))}
        </PolicyItemsWrapper>
      ) : null}
      <FormRow justifyContent={items && items.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton icon={plusIcon} label="ADD POLICY" onClick={onAddPolicy} />
      </FormRow>
    </>
  );
};
export default React.memo(PolicyStep);
