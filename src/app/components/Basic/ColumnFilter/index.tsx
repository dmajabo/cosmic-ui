import React from 'react';
import SecondaryButtonWithPopup from 'app/components/Buttons/SecondaryButton/SecondaryButtonWithPopup';
import PopupContainer from 'app/components/PopupContainer';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { PopupTitle, OverflowContainer, FilteredColumnItem, FilteredColumnLabel } from 'app/components/PopupContainer/styles';
import { columnsIcon } from 'app/components/SVGIcons/columnsIcon';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { dragIcon } from 'app/components/SVGIcons/dragIcon';

interface IProps {
  label: string;
  popupLabel?: string;
  icon?: any;
  items: any[];
  draggable?: boolean;
  onItemClick: (item: any) => void;
  onChangeOrder: (items: any[]) => void;
}

const ColumnFilter: React.FC<IProps> = (props: IProps) => {
  const [data, setData] = React.useState<any>(props.items || []);
  const dragRef = React.useRef(null);

  React.useEffect(() => {
    setData(props.items);
  }, [props.items]);

  const onItemClick = (item: any) => {
    props.onItemClick(item);
  };

  const handleDrag = event => {
    if (!props.draggable) return;
    dragRef.current = event.currentTarget.id;
  };

  const handleDrop = event => {
    if (!props.draggable || !event || !event.currentTarget || !dragRef || !dragRef.current) return;
    const dragItemIndex = data.findIndex(column => column.id === dragRef.current);
    const dropItemIndex = data.findIndex(column => column.id === event.currentTarget.id);
    const _dragItem = data[dragItemIndex];
    const _dropItem = data[dropItemIndex];
    if (!_dragItem || !_dropItem || _dragItem.id === _dropItem.id) return;
    const _items: any[] = data.slice();
    _items.splice(dragItemIndex, 1);
    _items.splice(dropItemIndex, 0, _dragItem);
    dragRef.current = null;
    props.onChangeOrder(_items);
  };

  return (
    <SecondaryButtonWithPopup label={props.label} icon={props.icon || columnsIcon} direction="rtl">
      <PopupContainer
        styles={{
          overflow: 'hidden',
          position: 'absolute',
          top: 'calc(100% + 2px)',
          right: '0',
          width: '80vw',
          height: 'auto',
          minWidth: '180px',
          maxWidth: '340px',
          minHeight: '120px',
          maxHeight: '420px',
          direction: 'rtl',
          padding: '20px',
          boxShadow: '0px 10px 30px rgba(5, 20, 58, 0.1)',
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--_primaryBg)',
        }}
      >
        <PopupTitle>{props.popupLabel}</PopupTitle>
        <OverflowContainer>
          {data.map(col => {
            if (col.field === 'rowIndex' || !col.label) return null;
            return (
              <FilteredColumnItem
                key={`filteredColumnMenuItem${col.id}`}
                onClick={() => onItemClick(col)}
                draggable={props.draggable}
                dragPosible={props.draggable}
                id={col.id}
                onDragOver={e => e.preventDefault()}
                onDragStart={handleDrag}
                onDrop={handleDrop}
              >
                <SimpleCheckbox wrapStyles={{ marginRight: '12px' }} isChecked={!col.hide} />
                <FilteredColumnLabel>{col.label}</FilteredColumnLabel>
                {props.draggable && <IconWrapper width="16px" height="16px" styles={{ position: 'absolute', top: 'calc(50% - 8px)', right: '6px', cursor: 'grab' }} icon={dragIcon} />}
              </FilteredColumnItem>
            );
          })}
        </OverflowContainer>
      </PopupContainer>
    </SecondaryButtonWithPopup>
  );
};

export default React.memo(ColumnFilter);
