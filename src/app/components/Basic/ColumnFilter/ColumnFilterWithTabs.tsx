import React from 'react';
import SecondaryButtonWithPopup from 'app/components/Buttons/SecondaryButton/SecondaryButtonWithPopup';
import PopupContainer from 'app/components/PopupContainer';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { PopupTabOverflowContainer, FilteredColumnItem, FilteredColumnLabel, PopupTabsWrapperStyles } from 'app/components/PopupContainer/styles';
import { columnsIcon } from 'app/components/SVGIcons/columnsIcon';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { dragIcon } from 'app/components/SVGIcons/dragIcon';
import { Tab, Tabs } from '@mui/material';
import TabPanel from 'app/components/Tabs/TabPanel';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { IColumn } from 'lib/models/grid';

export interface ITabsColumnFilterData {
  tab: string;
  id: string;
  index: number;
  items: IColumn[];
}

interface IProps {
  label: string;
  icon?: any;
  data: ITabsColumnFilterData[];
  draggable?: boolean;
  onItemClick: (tabIndex: number, item: IColumn, hide: boolean) => void;
  onChangeOrder: (tab: ITabsColumnFilterData) => void;
}

const ColumnFilterWithTabs: React.FC<IProps> = (props: IProps) => {
  const [selectedTab, setSelectedTab] = React.useState<ITabsColumnFilterData>(props.data[0]);
  const classes = TabsStyles();
  const dragRef = React.useRef(null);

  React.useEffect(() => {
    if (props.data) {
      const _tab = props.data.find(it => it.id === selectedTab.id);
      setSelectedTab(_tab);
    }
  }, [props.data]);

  const onItemClick = (tabIndex: number, item: IColumn) => {
    props.onItemClick(tabIndex, item, !item.hide);
  };

  const handleDrag = event => {
    if (!props.draggable) return;
    dragRef.current = event.currentTarget.id;
  };

  const handleDrop = event => {
    if (!props.draggable || !event || !event.currentTarget || !dragRef || !dragRef.current) return;
    const dragItemIndex = selectedTab.items.findIndex(column => column.id === dragRef.current);
    const dropItemIndex = selectedTab.items.findIndex(column => column.id === event.currentTarget.id);
    const _dragItem = selectedTab.items[dragItemIndex];
    const _dropItem = selectedTab.items[dropItemIndex];
    if (!_dragItem || !_dropItem || _dragItem.id === _dropItem.id) return;
    const _items: IColumn[] = selectedTab.items.slice();
    _items.splice(dragItemIndex, 1);
    _items.splice(dropItemIndex, 0, _dragItem);
    dragRef.current = null;
    props.onChangeOrder({ ...selectedTab, items: _items });
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const _tab = props.data.find(it => it.index === newValue);
    if (_tab.id === selectedTab.id) return;
    setSelectedTab(_tab);
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
        <PopupTabsWrapperStyles>
          <Tabs
            value={selectedTab.index}
            onChange={handleChange}
            className={classes.tabs}
            TabIndicatorProps={{
              style: {
                background: 'var(--_hoverButtonBg)',
                boxShadow: '0px 4px 7px rgba(67, 127, 236, 0.15)',
                borderRadius: '100px',
              },
            }}
          >
            {props.data.map(it => (
              <Tab disableRipple key={`popupColumnTabKey${it.id}`} label={it.tab} classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.popupTab} />
            ))}
          </Tabs>
        </PopupTabsWrapperStyles>
        {props.data.map((it, index) => (
          <TabPanel
            key={`popupColumnTabPanelKey${it.id}`}
            styles={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: it.id === selectedTab.id ? '1 1 100%' : '0' }}
            value={selectedTab.index}
            index={it.index}
          >
            <PopupTabOverflowContainer>
              {it.items.map(col => {
                if (col.field === 'rowIndex' || !col.label) return null;
                return (
                  <FilteredColumnItem
                    key={`filteredColumnMenuItem${col.id}`}
                    onClick={() => onItemClick(index, col)}
                    draggable={props.draggable}
                    dragPosible={props.draggable}
                    id={col.id}
                    onDragOver={e => e.preventDefault()}
                    onDragStart={handleDrag}
                    onDrop={handleDrop}
                  >
                    <SimpleCheckbox wrapStyles={{ marginRight: '12px', pointerEvents: 'none' }} isChecked={!col.hide} />
                    <FilteredColumnLabel>{col.label}</FilteredColumnLabel>
                    {props.draggable && <IconWrapper width="16px" height="16px" styles={{ position: 'absolute', top: 'calc(50% - 8px)', right: '6px', cursor: 'grab' }} icon={dragIcon} />}
                  </FilteredColumnItem>
                );
              })}
            </PopupTabOverflowContainer>
          </TabPanel>
        ))}
      </PopupContainer>
    </SecondaryButtonWithPopup>
  );
};

export default React.memo(ColumnFilterWithTabs);
