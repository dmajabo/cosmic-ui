import React from 'react';
import Search from 'app/components/Inputs/Search';
// import PrimaryButton from 'app/components/Buttons/PrimaryButton';
// import { addIcon } from 'app/components/SVGIcons/addIcon';
import { ActionPart, ActionRowStyles } from 'app/containers/Pages/Shared/styles';
import { ISelectedListItem } from 'lib/models/general';
import { IColumn } from 'lib/models/grid';
import Dropdown from 'app/components/Inputs/Dropdown';
import ColumnFilter from 'app/components/Basic/ColumnFilter';

interface Props {
  timeRangeValues?: ISelectedListItem<any>[];
  selectedTimeRangePeriod?: string;
  searchValue: string | null;
  columns: IColumn[];
  onChangeColumn: (col: IColumn) => void;
  onSearchChange: (v: string | null) => void;
  onChangeOrder: (items: IColumn[]) => void;
  onChangePeriod: (value: ISelectedListItem<any>) => void;
}

const Header: React.FC<Props> = (props: Props) => {
  const onColumnChange = (col: IColumn) => {
    props.onChangeColumn(col);
  };
  const onSearhChange = (value: string | null) => {
    props.onSearchChange(value);
  };
  const onChangeOrder = (items: IColumn[]) => {
    props.onChangeOrder(items);
  };

  const onChangePeriod = (value: ISelectedListItem<any>) => {
    props.onChangePeriod(value);
  };

  return (
    <>
      <ActionRowStyles>
        <ActionPart margin="0 auto 0 0" minWidth="440px">
          <Search searchQuery={props.searchValue} onChange={onSearhChange} styles={{ minWidth: '440px', height: '50px' }} />
        </ActionPart>
        <ActionPart margin="0 0 0 auto">
          <ColumnFilter label="Columns" popupLabel="Columns" items={props.columns} draggable onItemClick={onColumnChange} onChangeOrder={onChangeOrder} />
          <Dropdown
            dropWrapStyles={{ margin: '0 0 0 30px' }}
            wrapStyles={{ height: '50px', border: '1px solid var(--_primaryButtonBorder)', borderRadius: '6px' }}
            label="Show:"
            selectedValue={props.selectedTimeRangePeriod}
            values={props.timeRangeValues}
            onSelectValue={onChangePeriod}
          />
        </ActionPart>
      </ActionRowStyles>
    </>
  );
};

export default React.memo(Header);
