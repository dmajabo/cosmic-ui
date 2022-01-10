import React from 'react';
import { ListItemsWrapper, ListItem, ItemsContainer } from './styles';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { IElasticField } from 'lib/models/elastic';
import { KEYBOARD_KEYS } from 'lib/constants/general';
interface Props {
  items: IElasticField[];
  selectedField: IElasticField;
  onSelectItem?: (item: any) => void;
  loading?: boolean;
}
const Popup: React.FC<Props> = (props: Props) => {
  const [selectedField, setSelectedField] = React.useState(null);
  React.useEffect(() => {
    document.addEventListener('keyup', onKeyUp, false);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [props.items, props.selectedField, selectedField]);

  React.useEffect(() => {
    if (props.selectedField !== selectedField) {
      setSelectedField(props.selectedField);
    }
  }, [props.selectedField]);

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === KEYBOARD_KEYS.ENTER.key) {
      if (props.selectedField !== selectedField) {
        onSelectField(selectedField);
        return;
      }
      setSelectedField(props.selectedField);
      return;
    }
    if (e.key === KEYBOARD_KEYS.ARROW_UP.key && props.items && props.items.length) {
      const index = getIndexFromEnd(selectedField, props.items);
      setSelectedField(props.items[index]);
      return;
    }
    if (e.key === KEYBOARD_KEYS.ARROW_DOWN.key && props.items && props.items.length) {
      const index = getIndexFromStart(selectedField, props.items);
      setSelectedField(props.items[index]);
    }
  };

  const getIndexFromEnd = (item: IElasticField, items: IElasticField[]): number => {
    if (!item) return items.length - 1;
    const _i = items.findIndex(it => it.resField === item.resField);
    if (_i - 1 < 0) return items.length - 1;
    return _i - 1;
  };

  const getIndexFromStart = (item: IElasticField, items: IElasticField[]): number => {
    if (!item) return 0;
    const _i = items.findIndex(it => it.resField === item.resField);
    if (_i + 1 > items.length - 1) return 0;
    return _i + 1;
  };

  const onSelectValue = (item: string) => {};
  const onSelectField = (item: IElasticField) => {
    if (props.selectedField && props.selectedField.resField === item.resField) return;
    props.onSelectItem(item);
  };
  return (
    <ListItemsWrapper>
      <ItemsContainer>
        {props.items.map((it, index) => {
          if (typeof it === 'string') {
            return (
              <ListItem selected={false} onClick={() => onSelectValue(it)} key={`suggestField${it}${index}`}>
                {it}
              </ListItem>
            );
          }
          return (
            <ListItem selected={selectedField && selectedField.resField === it.resField} onClick={() => onSelectField(it)} key={`suggestField${it.resField}`}>
              {it.label}
            </ListItem>
          );
        })}
        <AbsLoaderWrapper width="100%" height="100%">
          {props.loading && <LoadingIndicator margin="auto" />}
        </AbsLoaderWrapper>
      </ItemsContainer>
    </ListItemsWrapper>
  );
};
export default React.memo(Popup);
