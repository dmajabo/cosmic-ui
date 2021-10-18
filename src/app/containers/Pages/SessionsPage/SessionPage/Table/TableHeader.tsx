import React from 'react';
import { columnsIcon } from 'app/components/SVGIcons/columnsIcon';
import { GridHeaderWrapper, GridLabelWrapper, GridLabel, GridCount, FilteredColumnItem, OverflowContainer, PopupTitle, FilteredColumnLabel } from './styles';
import { GridColDef } from '@mui/x-data-grid';
import SecondaryButtonWithPopup from 'app/components/Buttons/SecondaryButton/SecondaryButtonWithPopup';
import PopupContainer from 'app/components/PopupContainer';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
interface Props {
  count: number;
  columns: GridColDef[];
  onChangeColumn: (col: GridColDef) => void;
}

const TableHeader: React.FC<Props> = (props: Props) => {
  const onColumnChange = (col: GridColDef) => {
    props.onChangeColumn(col);
  };
  return (
    <>
      <GridHeaderWrapper>
        <GridLabelWrapper>
          <GridLabel>Logs</GridLabel>
          {props.count && <GridCount>{props.count}</GridCount>}
        </GridLabelWrapper>
        <SecondaryButtonWithPopup label="Columns" icon={columnsIcon} direction="rtl">
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
                if (col.field === 'rowIndex') return null;
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
      </GridHeaderWrapper>
    </>
  );
};

export default React.memo(TableHeader);
