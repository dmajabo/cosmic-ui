import React from 'react';
import { ListItemsWrapper, ItemsContainer } from './styles';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { IElasticField } from 'lib/models/elastic';
import { KEYBOARD_KEYS } from 'lib/constants/general';
import PopupItem from './PopupItem';
interface Props {
  items: IElasticField[] | string[];
  selectedField: IElasticField;
  onSelectItem?: (item: IElasticField | string) => void;
  loading?: boolean;
}
const Popup: React.FC<Props> = (props: Props) => {
  const [selectedField, setSelectedField] = React.useState<IElasticField | string>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.addEventListener('keydown', onKeyDown, false);
    }
    return () => {
      if (containerRef && containerRef.current) {
        containerRef.current.removeEventListener('keydown', onKeyDown);
      }
    };
  }, [props.items, props.selectedField, selectedField]);

  React.useEffect(() => {
    if (props.selectedField !== selectedField) {
      setSelectedField(props.selectedField);
    }
  }, [props.selectedField]);

  const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === KEYBOARD_KEYS.ENTER.key) {
      if (props.selectedField !== selectedField) {
        onSelect(selectedField);
        return;
      }
      setSelectedField(props.selectedField);
      return;
    }
    if (e.key === KEYBOARD_KEYS.ARROW_UP.key && props.items && props.items.length) {
      const index = getIndexFromEnd(selectedField, props.items);
      containerRef.current.scrollTo({ top: 40 * index });
      setSelectedField(props.items[index]);
      return;
    }
    if ((e.key === KEYBOARD_KEYS.ARROW_DOWN.key || e.key === KEYBOARD_KEYS.TAB.key) && props.items && props.items.length) {
      const index = getIndexFromStart(selectedField, props.items);
      containerRef.current.scrollTo({ top: 40 * index });
      setSelectedField(props.items[index]);
    }
  };

  const getIndexFromEnd = (item: IElasticField | string, items: IElasticField[] | string[]): number => {
    if (!item) return items.length - 1;
    const _i = items.findIndex(it => (typeof item === 'string' ? it === item : it.resField === item.resField));
    if (_i - 1 < 0) return items.length - 1;
    return _i - 1;
  };

  const getIndexFromStart = (item: IElasticField | string, items: IElasticField[] | string[]): number => {
    if (!item) return 0;
    const _i = items.findIndex(it => (typeof item === 'string' ? it === item : it.resField === item.resField));
    if (_i + 1 > items.length - 1) return 0;
    return _i + 1;
  };

  const onSelect = (item: IElasticField | string) => {
    props.onSelectItem(item);
  };
  return (
    <ListItemsWrapper>
      <ItemsContainer ref={containerRef} minHeight={props.items && props.items.length ? 'unset' : '160px'}>
        {props.items && props.items.length ? (
          props.items.map((it, index) => (
            <PopupItem
              key={typeof it === 'string' ? `suggestField${it}${index}` : `suggestField${it.resField}`}
              item={it}
              index={index}
              onSelect={onSelect}
              selected={(typeof it === 'string' && it === selectedField) || (typeof selectedField !== 'string' && selectedField && selectedField.resField === it.resField)}
            />
          ))
        ) : (
          <span style={{ display: 'inline-block', margin: 'auto', fontSize: '14px', color: 'var(--_primaryTextColor)' }}>No data</span>
        )}
        {props.loading && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </ItemsContainer>
    </ListItemsWrapper>
  );
};
export default React.memo(Popup);
