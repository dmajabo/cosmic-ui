import React from 'react';
import { TagsWrapper } from './styles';
import FieldValueTag from './FieldValueTag';
import OperatorTag from './OperatorTag';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { IElasticFilterModel } from 'lib/api/ApiModels/paramBuilders';

interface Props {
  items: (IElasticFilterModel | string)[];
  onRemoveTag: (index: number) => void;
  onClearAll: () => void;
  onSelectTag: (_item: any, index: number) => void;
  onChangeOperator: (_item: string, index: number) => void;
}

const Tags: React.FC<Props> = (props: Props) => {
  const onRemoveItem = (index: number) => {
    props.onRemoveTag(index);
  };

  const onSelectTag = (item: any, index: number) => {
    props.onSelectTag(item, index);
  };

  const onChangeOperator = (_item: string, index: number) => {
    props.onChangeOperator(_item, index);
  };

  const onClearAll = () => {
    props.onClearAll();
  };

  if (!props.items || !props.items.length) return null;
  return (
    <TagsWrapper>
      {props.items.map((it, index) => {
        if (typeof it === 'string') {
          return <OperatorTag key={`tagFilterOperator${index}`} item={it} index={index} onChangeOperator={onChangeOperator} />;
        }
        return <FieldValueTag key={`tagFilterItem${index}`} index={index} item={it} onRemoveTag={onRemoveItem} onSelectTag={onSelectTag} />;
      })}
      {props.items && props.items.length ? (
        <SecondaryButton
          iconWidth="10px"
          iconHeight="10px"
          styles={{ display: 'flex', alignItems: 'center', height: '30px', padding: '4px 12px' }}
          withoutBorder
          label="Clear all"
          icon={closeSmallIcon}
          onClick={onClearAll}
        />
      ) : null}
    </TagsWrapper>
  );
};

export default React.memo(Tags);
