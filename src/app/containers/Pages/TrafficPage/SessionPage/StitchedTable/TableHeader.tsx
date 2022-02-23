import React from 'react';
import { columnsIcon } from 'app/components/SVGIcons/columnsIcon';
import { GridHeaderWrapper, GridLabelWrapper, GridLabel, GridCount } from '../Table/styles';
import ColumnFilterWithTabs, { ITabsColumnFilterData } from 'app/components/Basic/ColumnFilter/ColumnFilterWithTabs';
import { IGridColumnField } from 'lib/models/grid';
interface Props {
  count: number;
  columns: ITabsColumnFilterData[];
  onItemClick: (tabIndex: number, item: IGridColumnField, hide: boolean) => void;
  onChangeOrder: (items: ITabsColumnFilterData) => void;
}

const TableHeader: React.FC<Props> = (props: Props) => {
  const onColumnChange = (tabIndex: number, item: IGridColumnField, hide: boolean) => {
    props.onItemClick(tabIndex, item, hide);
  };

  const onChangeOrder = (items: ITabsColumnFilterData) => {
    props.onChangeOrder(items);
  };
  return (
    <>
      <GridHeaderWrapper>
        <GridLabelWrapper>
          <GridLabel>Logs</GridLabel>
          {!props.count ? null : <GridCount>{props.count}</GridCount>}
        </GridLabelWrapper>
        <ColumnFilterWithTabs label="Columns" icon={columnsIcon} data={props.columns} draggable onItemClick={onColumnChange} onChangeOrder={onChangeOrder} />
      </GridHeaderWrapper>
    </>
  );
};

export default React.memo(TableHeader);
