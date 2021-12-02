import React from 'react';
import { columnsIcon } from 'app/components/SVGIcons/columnsIcon';
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import SecondaryButtonWithPopup from 'app/components/Buttons/SecondaryButton/SecondaryButtonWithPopup';
import PopupContainer from 'app/components/PopupContainer';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { PopupTitle, OverflowContainer, FilteredColumnItem, FilteredColumnLabel } from 'app/components/PopupContainer/styles';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import Search from 'app/components/Inputs/Search';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { ActionRowStyles, ActionPart } from '../../Shared/styles';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { ISelectedListItem } from 'lib/models/general';
import { InventoryOptions } from '../Inventory/model';
import Toogle from 'app/components/Inputs/Toogle';
interface Props {
  selectedItems?: GridSelectionModel;
  searchValue: string | null;
  columns: GridColDef[];
  selectedToogleOption?: ISelectedListItem<InventoryOptions>;
  toggleOptions?: ISelectedListItem<InventoryOptions>[];
  onChangeColumn: (col: GridColDef) => void;
  onSearchChange: (v: string | null) => void;
  onToogleEditForm?: () => void;
  onMassDelete: () => void;
  onToogleChange?: (value: ISelectedListItem<InventoryOptions>) => void;
  hideEditButton?: boolean;
  showToogle?: boolean;
  hideDelete?: boolean;
}

const Header: React.FC<Props> = (props: Props) => {
  const onColumnChange = (col: GridColDef) => {
    props.onChangeColumn(col);
  };
  const onSearhChange = (value: string | null) => {
    props.onSearchChange(value);
  };
  const onToogleEditForm = () => {
    props.onToogleEditForm();
  };
  return (
    <>
      <ActionRowStyles>
        <ActionPart margin="0 auto 0 0" minWidth="440px">
          {props.showToogle && (
            <Toogle
              styles={{ height: '40px', margin: '0 30px 0 0', padding: '3px', background: 'var(--_primaryBg)' }}
              buttonStyles={{ padding: '8px 24px' }}
              selectedValue={props.selectedToogleOption}
              values={props.toggleOptions}
              onChange={props.onToogleChange}
            />
          )}
          <Search searchQuery={props.searchValue} onChange={onSearhChange} styles={{ width: '100%' }} />
        </ActionPart>
        <ActionPart margin="0 0 0 auto">
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
          <SecondaryButtonWithPopup wrapStyles={{ margin: '0 0 0 20px' }} label="Columns" icon={columnsIcon} direction="rtl">
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
              <PopupTitle>Columns</PopupTitle>
              <OverflowContainer>
                {props.columns.map(col => {
                  if (col.field === 'rowIndex' || !col.field) return null;
                  return (
                    <FilteredColumnItem key={`filteredColumnMEnuItem${col.field}`} onClick={() => onColumnChange(col)}>
                      <SimpleCheckbox wrapStyles={{ marginRight: '12px' }} isChecked={!col.hide} />
                      <FilteredColumnLabel>{col.headerName}</FilteredColumnLabel>
                    </FilteredColumnItem>
                  );
                })}
              </OverflowContainer>
            </PopupContainer>
          </SecondaryButtonWithPopup>
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
