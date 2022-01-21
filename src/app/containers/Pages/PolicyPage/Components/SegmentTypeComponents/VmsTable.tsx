import React from 'react';
import { GridWrapper, ModalLabel, ModalRow } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { GridStyles } from 'app/components/Grid/GridStyles';
import Paging from 'app/components/Basic/Paging';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
// import SecondaryButtonWithPopup from 'app/components/Buttons/SecondaryButton/SecondaryButtonWithPopup';
// import PopupContainer from 'app/components/PopupContainer';
// import { PopupTitle, OverflowContainer, FilteredColumnItem, FilteredColumnLabel } from 'app/components/PopupContainer/styles';
// import { filterIcon } from 'app/components/SVGIcons/filter';
import { INetworkTag, INetworkVM } from 'lib/api/ApiModels/Topology/apiModels';
import { IUiPagingData } from 'lib/api/ApiModels/generalApiModel';
import { ISegmentApplicationSegMatchRuleP, SegmentApplicationSegMatchKey, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import * as helper from '../helper';

interface Props {
  data: INetworkVM[];
  pageData: IUiPagingData;
  matchRules: ISegmentApplicationSegMatchRuleP[];
  onSelectChange: (type: SegmentSegmentType, item: ISegmentApplicationSegMatchRuleP) => void;
  onSelectAll: (type: SegmentSegmentType, rules: ISegmentApplicationSegMatchRuleP[]) => void;
  onChangeCurrentPage: (type: SegmentSegmentType, _page: number) => void;
  onChangePageSize: (type: SegmentSegmentType, size: number, page?: number) => void;
  loading: boolean;
  error: string;
}

const VmsTable: React.FC<Props> = (props: Props) => {
  const [columns] = React.useState<GridColDef[]>([
    {
      field: 'key',
      headerName: 'Key',
      width: 220,
      flex: 0.5,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 220,
      flex: 0.5,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    {
      field: 'ownerId',
      headerName: 'Owner ID',
      width: 140,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
  ]);
  const gridStyles = GridStyles();
  const [selectedAppMatchKey, setSelectedAppMatchKey] = React.useState<SegmentApplicationSegMatchKey>(SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [visibleData, setVisibleData] = React.useState<INetworkTag[]>([]);

  React.useEffect(() => {
    if (props.data && props.data.length) {
      const _arr = new Map();
      props.data.forEach(it => {
        if (it.tags && it.tags.length) {
          it.tags.forEach(tag => {
            if (tag.key && tag.value && !_arr.has(`${tag.key}${tag.value}`)) {
              const _item: INetworkTag = tag.id ? { ...tag } : { ...tag, id: `${tag.key}${tag.value}` };
              _arr.set(`${tag.key}${tag.value}`, _item);
            }
          });
        }
      });
      setVisibleData(Array.from(_arr, ([name, value]) => value));
    }
  }, [props.data]);

  React.useEffect(() => {
    const _ids = [];
    if (props.data && props.data.length && props.matchRules && props.matchRules.length) {
      props.matchRules.forEach(it => {
        const field = helper.getVmsFieldFromRuleKey(it.matchKey);
        if (field === 'tags') {
          const _el: INetworkTag = helper.getSelectedTagFromVms(props.data, it);
          if (_el) {
            const _id = _el.id || `${_el.key}${_el.value}`;
            _ids.push(_id);
          }
        }
      });
    }
    setSelectionModel(_ids);
  }, [props.matchRules, props.data, selectedAppMatchKey]);

  // const onChangeColumn = (col: GridColDef) => {
  //   const _items: GridColDef[] = columns.slice();
  //   const _index = _items.findIndex(it => it.field === col.field);
  //   _items[_index].hide = !col.hide;
  //   setGridColumns(_items);
  // };

  const onRowClick = (params: GridRowParams) => {
    const _item = params.row as INetworkTag;
    const rule: ISegmentApplicationSegMatchRuleP = {
      matchKey: selectedAppMatchKey,
      matchValuePrimary: _item.key,
      matchValueSecondary: _item.value,
    };
    props.onSelectChange(SegmentSegmentType.APPLICATION, rule);
  };

  const onColumnHeaderClick = (params: GridColumnHeaderParams) => {
    if (params.field === '__check__') {
      const _items: ISegmentApplicationSegMatchRuleP[] = [];
      visibleData.forEach(it => {
        const rule: ISegmentApplicationSegMatchRuleP = {
          matchKey: selectedAppMatchKey,
          matchValuePrimary: it.key,
          matchValueSecondary: it.value,
        };
        _items.push(rule);
      });
      props.onSelectAll(SegmentSegmentType.APPLICATION, _items);
    }
  };

  const onChangePage = (page: number) => {
    props.onChangeCurrentPage(SegmentSegmentType.APPLICATION, page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(SegmentSegmentType.APPLICATION, size, page);
  };
  return (
    <>
      <ModalRow margin="0 0 20px 0">
        <MatSelect
          id="appMatchKeyType"
          label="Key"
          value={selectedAppMatchKey}
          options={[SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG]}
          styles={{ height: '72px', minHeight: '72px', margin: '0' }}
          selectStyles={{ height: '50px', width: '100%' }}
          selectClaassName="withLabel"
          onChange={v => setSelectedAppMatchKey(v)}
          readOnly
          renderValue={(v: SegmentApplicationSegMatchKey) => {
            if (v === SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG) return <ValueLabel>Tag</ValueLabel>;
            return <ValueLabel>{v}</ValueLabel>;
          }}
          renderOption={(v: SegmentApplicationSegMatchKey) => {
            if (v === SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG) return 'Tag';
            return v;
          }}
        />
      </ModalRow>
      <ModalRow margin="0 0 10px 0" align="center">
        <ModalLabel>VMs</ModalLabel>
        {/* <SecondaryButtonWithPopup styles={{ padding: '0', width: '50px' }} wrapStyles={{ margin: '0 0 0 auto' }} icon={filterIcon} direction="rtl">
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
              {columns.map(col => {
                if (col.field === 'rowIndex' || !col.field) return null;
                return (
                  <FilteredColumnItem key={`filteredColumnMEnuItem${col.field}`} onClick={() => onChangeColumn(col)}>
                    <SimpleCheckbox wrapStyles={{ marginRight: '12px' }} isChecked={!col.hide} />
                    <FilteredColumnLabel>{col.headerName}</FilteredColumnLabel>
                  </FilteredColumnItem>
                );
              })}
            </OverflowContainer>
          </PopupContainer>
        </SecondaryButtonWithPopup> */}
      </ModalRow>
      <GridWrapper>
        <DataGrid
          disableColumnFilter
          className={gridStyles.borderedRow}
          headerHeight={50}
          rowHeight={50}
          hideFooter
          rowCount={props.pageData.totalCount}
          rows={visibleData}
          columns={columns}
          checkboxSelection
          onRowClick={onRowClick}
          onColumnHeaderClick={onColumnHeaderClick}
          selectionModel={selectionModel}
          loading={props.loading}
          error={props.error}
          components={{
            NoRowsOverlay: () => (
              <AbsLoaderWrapper width="100%" height="100%">
                <ErrorMessage color="var(--_primaryTextColor)" margin="auto">
                  No data
                </ErrorMessage>
              </AbsLoaderWrapper>
            ),
            ErrorOverlay: () => <ErrorMessage margin="auto">{props.error}</ErrorMessage>,
            LoadingOverlay: () => (
              <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
                <LoadingIndicator margin="auto" />
              </AbsLoaderWrapper>
            ),
            BaseCheckbox: React.forwardRef(({ checked, onChange, indeterminate }, ref) => (
              <SimpleCheckbox ref={ref} isChecked={checked} toggleCheckboxChange={onChange} indeterminate={indeterminate} />
            )),
          }}
        />
      </GridWrapper>
      <Paging
        count={props.pageData.totalCount}
        disabled={!props.data.length || props.pageData.totalCount === 0}
        pageSize={props.pageData.pageSize}
        currentPage={props.pageData.pageOffset}
        onChangePage={onChangePage}
        onChangePageSize={onChangePageSize}
        boundaryCount={0}
        siblingCount={0}
        pageSizeValues={[5, 10, 20, 50]}
        hideLabelAfter
        showFirstButton={false}
        showLastButton={false}
        pagingWrapStyles={{ height: '52px', paddingTop: '12px' }}
        selectWrapStyles={{ maxWidth: '150px' }}
        hideRange={680}
      />
    </>
  );
};

export default React.memo(VmsTable);
