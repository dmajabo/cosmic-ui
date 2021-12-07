import React from 'react';
import { GridSelectionModel } from '@mui/x-data-grid';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import Search from 'app/components/Inputs/Search';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { ActionRowStyles, ActionPart } from '../../Shared/styles';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { ISelectedListItem } from 'lib/models/general';
import { InventoryOptions } from '../Inventory/model';
import Toogle from 'app/components/Inputs/Toogle';
import ColumnFilter from 'app/components/Basic/ColumnFilter';
import { IColumn } from 'lib/models/grid';
import Dropdown from 'app/components/Inputs/Dropdown';
interface Props {
  timeRangeValues?: ISelectedListItem<any>[];
  selectedTimeRangePeriod?: string;
  selectedItems?: GridSelectionModel;
  searchValue: string | null;
  columns: IColumn[];
  selectedToogleOption?: ISelectedListItem<InventoryOptions>;
  toggleOptions?: ISelectedListItem<InventoryOptions>[];
  onChangeColumn: (col: IColumn) => void;
  onSearchChange: (v: string | null) => void;
  onToogleEditForm?: () => void;
  onMassDelete?: () => void;
  onToogleChange?: (value: ISelectedListItem<InventoryOptions>) => void;
  onChangeOrder: (items: IColumn[]) => void;
  onChangePeriod?: (value: ISelectedListItem<any>) => void;
  hideEditButton?: boolean;
  showToogle?: boolean;
  hideDelete?: boolean;
  showTimeRange?: boolean;
}

const Header: React.FC<Props> = (props: Props) => {
  const onColumnChange = (col: IColumn) => {
    props.onChangeColumn(col);
  };
  const onSearhChange = (value: string | null) => {
    props.onSearchChange(value);
  };
  const onToogleEditForm = () => {
    props.onToogleEditForm();
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
          {props.showToogle && (
            <Toogle
              styles={{ height: '50px', margin: '0 30px 0 0', padding: '3px', background: 'var(--_primaryBg)' }}
              buttonStyles={{ padding: '8px 24px' }}
              selectedValue={props.selectedToogleOption}
              values={props.toggleOptions}
              onChange={props.onToogleChange}
            />
          )}
          <Search searchQuery={props.searchValue} onChange={onSearhChange} styles={{ width: '100%', height: '50px' }} />
        </ActionPart>
        <ActionPart margin="0 0 0 auto">
          {props.showTimeRange && (
            <Dropdown
              wrapStyles={{ height: '50px', border: '1px solid var(--_primaryButtonBorder)', borderRadius: '6px', margin: '0 20px 0 0' }}
              label="Show"
              selectedValue={props.selectedTimeRangePeriod}
              values={props.timeRangeValues}
              onSelectValue={onChangePeriod}
            />
          )}
          {!props.hideDelete && props.selectedItems && props.selectedItems.length ? (
            <PrimaryButton
              label="Delete"
              icon={deleteIcon('var(--_pButtonColor)')}
              onClick={props.onMassDelete}
              bgColor="var(--_errorColor)"
              borderColor="var(--_errorColor)"
              hoverBg="var(--_errorColor)"
              hoverBorder="var(--_errorColor)"
            />
          ) : null}
          <ColumnFilter label="Columns" popupLabel="Columns" items={props.columns} draggable onItemClick={onColumnChange} onChangeOrder={onChangeOrder} />
          {!props.hideEditButton && (
            <PrimaryButton
              label="Create new"
              icon={plusIcon}
              onClick={onToogleEditForm}
              styles={{
                margin: '0 0 0 20px',
              }}
            />
          )}
        </ActionPart>
      </ActionRowStyles>
    </>
  );
};

export default React.memo(Header);
