import React from 'react';
import { columnsIcon } from 'app/components/SVGIcons/columnsIcon';
import { GridHeaderWrapper, GridLabelWrapper, GridLabel, GridCount } from '../Table/styles';
import SecondaryButtonWithPopup from 'app/components/Buttons/SecondaryButton/SecondaryButtonWithPopup';
import PopupContainer from 'app/components/PopupContainer';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { PopupTitle, OverflowContainer, FilteredColumnItem, FilteredColumnLabel } from 'app/components/PopupContainer/styles';
import { ISessionsGridFieldColumn } from '../models';
interface Props {
  count: number;
  columns: ISessionsGridFieldColumn[];
  onChangeColumn: (col: ISessionsGridFieldColumn) => void;
}

const TableHeader: React.FC<Props> = (props: Props) => {
  const onColumnChange = (col: ISessionsGridFieldColumn) => {
    props.onChangeColumn(col);
  };
  return (
    <>
      <GridHeaderWrapper>
        <GridLabelWrapper>
          <GridLabel>Logs</GridLabel>
          {!props.count ? null : <GridCount>{props.count}</GridCount>}
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
                if (col.resField === 'id') return null;
                return (
                  <FilteredColumnItem key={`filteredColumnMEnuItem${col.resField}`} onClick={() => onColumnChange(col)}>
                    <SimpleCheckbox wrapStyles={{ marginRight: '12px' }} isChecked={!col.hide} />
                    <FilteredColumnLabel>{col.label}</FilteredColumnLabel>
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
