import React from 'react';
import { IGridColumnField } from 'lib/models/grid';
import { columnsIcon } from 'app/components/SVGIcons/columnsIcon';
import ColumnFilter from 'app/components/Basic/ColumnFilter';
import { GridLabel, GridCount } from 'app/containers/Pages/TrafficPage/SessionPage/Table/styles';
import { ActionPart, ActionRowStyles } from '../../Shared/styles';

interface Props {
  label: string;
  total: number;
  columns: IGridColumnField[];
  onColumnClick: (item: IGridColumnField, hide: boolean) => void;
  onColumnOrderChange: (items: IGridColumnField[]) => void;
}

const InventoryTableHeader: React.FC<Props> = (props: Props) => {
  const onColumnClick = (item: IGridColumnField, hide: boolean) => {
    props.onColumnClick(item, hide);
  };

  const onColumnOrderChange = (items: IGridColumnField[]) => {
    props.onColumnOrderChange(items);
  };
  return (
    <ActionRowStyles margin="0 0 10px 0" zIndex="unset">
      <ActionPart margin="0 auto 0 0" alignItems="flex-end">
        <GridLabel style={{ fontSize: '18px', lineHeight: '22px', fontWeight: 500 }}>{props.label}</GridLabel>
        {!props.total ? null : <GridCount>{props.total}</GridCount>}
      </ActionPart>
      <ActionPart margin="0 0 0 auto" justifyContent="flex-end">
        <ColumnFilter label="Columns" popupLabel="Columns" icon={columnsIcon} items={props.columns} draggable onItemClick={onColumnClick} onChangeOrder={onColumnOrderChange} />
      </ActionPart>
    </ActionRowStyles>
  );
};

export default React.memo(InventoryTableHeader);
