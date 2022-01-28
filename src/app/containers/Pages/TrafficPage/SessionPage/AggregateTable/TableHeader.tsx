import React from 'react';
import { columnsIcon } from 'app/components/SVGIcons/columnsIcon';
import { GridHeaderWrapper, GridLabelWrapper, GridLabel, GridCount } from '../Table/styles';
import { ISessionsGridFieldColumn } from '../models';
import ColumnFilter from 'app/components/Basic/ColumnFilter';
interface Props {
  count: number;
  columns: ISessionsGridFieldColumn[];
  onChangeColumn: (col: ISessionsGridFieldColumn) => void;
  onChangeOrder: (items: ISessionsGridFieldColumn[]) => void;
}

const TableHeader: React.FC<Props> = (props: Props) => {
  const onColumnChange = (col: ISessionsGridFieldColumn) => {
    props.onChangeColumn(col);
  };

  const onChangeOrder = (items: ISessionsGridFieldColumn[]) => {
    props.onChangeOrder(items);
  };
  return (
    <>
      <GridHeaderWrapper>
        <GridLabelWrapper>
          <GridLabel>Logs</GridLabel>
          {!props.count ? null : <GridCount>{props.count}</GridCount>}
        </GridLabelWrapper>
        <ColumnFilter label="Columns" popupLabel="Columns" icon={columnsIcon} items={props.columns} draggable onItemClick={onColumnChange} onChangeOrder={onChangeOrder} />
      </GridHeaderWrapper>
    </>
  );
};

export default React.memo(TableHeader);
