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
import IconButton from 'app/components/Buttons/IconButton';
import { refreshIcon } from 'app/components/SVGIcons/refresh';
import MatSelect from 'app/components/Inputs/MatSelect';
import { AUDIT_LOGS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
interface Props {
  selectedTimeRangePeriod?: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES;
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
  onChangePeriod?: (value: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES) => void;
  onRefresh?: () => void;
  showReloadButton?: boolean;
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

  const onChangePeriod = (value: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES) => {
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
          <Search searchQuery={props.searchValue} onChange={onSearhChange} styles={{ minWidth: '440px', height: '50px' }} />
        </ActionPart>
        <ActionPart margin="0 0 0 auto">
          {props.showTimeRange && (
            <MatSelect
              id="auditLogsTimePeriod"
              label="Show"
              labelStyles={{ margin: 'auto 20px auto 0' }}
              value={props.selectedTimeRangePeriod}
              options={[AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_HOUR, AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_DAY, AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_WEEK]}
              onChange={onChangePeriod}
              renderValue={(v: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES) => {
                if (v === AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_HOUR) return 'Last hour';
                if (v === AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_DAY) return 'Last day';
                if (v === AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_WEEK) return 'Last week';
                // if (v === TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_MONTH) return 'Last month';
                return v;
              }}
              renderOption={(v: AUDIT_LOGS_TIME_RANGE_QUERY_TYPES) => {
                if (v === AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_HOUR) return 'Last hour';
                if (v === AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_DAY) return 'Last day';
                if (v === AUDIT_LOGS_TIME_RANGE_QUERY_TYPES.LAST_WEEK) return 'Last week';
                // if (v === TRAFFIC_TRENDS_TIME_RANGE_QUERY_TYPES.LAST_MONTH) return 'Last month';
                return v;
              }}
              styles={{ height: '50px', minHeight: '50px', width: 'auto', margin: '0 20px 0 0', display: 'inline-flex', alignItems: 'center' }}
              selectStyles={{ height: '50px', width: 'auto', minWidth: '240px' }}
            />
          )}
          {!props.hideDelete && props.selectedItems && props.selectedItems.length ? (
            <PrimaryButton
              label="Delete"
              icon={deleteIcon('var(--_primaryWhiteColor)')}
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
        {props.showReloadButton && <IconButton styles={{ margin: '0 0 0 20px' }} icon={refreshIcon} title="Reload" onClick={props.onRefresh} />}
      </ActionRowStyles>
    </>
  );
};

export default React.memo(Header);
