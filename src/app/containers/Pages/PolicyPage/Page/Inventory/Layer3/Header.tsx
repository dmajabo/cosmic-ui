import React from 'react';
import { IGridColumnField } from 'lib/models/grid';
import { columnsIcon } from 'app/components/SVGIcons/columnsIcon';
import ColumnFilter from 'app/components/Basic/ColumnFilter';
import { GridHeaderWrapper, GridLabelWrapper, GridLabel, GridCount } from 'app/containers/Pages/TrafficPage/SessionPage/Table/styles';

interface Props {
  label: string;
  total: number;
  columns: IGridColumnField[];
  onColumnClick: (item: IGridColumnField, hide: boolean) => void;
  onColumnOrderChange: (items: IGridColumnField[]) => void;
}

const Header: React.FC<Props> = (props: Props) => {
  const onColumnClick = (item: IGridColumnField, hide: boolean) => {
    props.onColumnClick(item, hide);
  };

  const onColumnOrderChange = (items: IGridColumnField[]) => {
    props.onColumnOrderChange(items);
  };
  return (
    <GridHeaderWrapper style={{ margin: '0 0 10px 0' }}>
      <GridLabelWrapper style={{ margin: 'auto auto 0 0', alignItems: 'flex-end' }}>
        <GridLabel style={{ fontSize: '18px', lineHeight: '22px', fontWeight: 500 }}>{props.label}</GridLabel>
        {!props.total ? null : <GridCount>{props.total}</GridCount>}
      </GridLabelWrapper>
      <ColumnFilter label="Columns" popupLabel="Columns" icon={columnsIcon} items={props.columns} draggable onItemClick={onColumnClick} onChangeOrder={onColumnOrderChange} />
    </GridHeaderWrapper>
  );
};

export default React.memo(Header);
