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
import { INetworkDevice } from 'lib/api/ApiModels/Topology/apiModels';
import { IUiPagingData } from 'lib/api/ApiModels/generalApiModel';
import { ISegmentSiteSegmentMatchRuleP, SegmentSegmentType, SegmentSiteSegmentMatchKey } from 'lib/api/ApiModels/Policy/Segment';
// import { GridCellWrapper } from 'app/components/Grid/styles';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import * as helper from '../helper';

interface Props {
  data: INetworkDevice[];
  pageData: IUiPagingData;
  matchRules: ISegmentSiteSegmentMatchRuleP[];
  onSelectChange: (type: SegmentSegmentType, rule: ISegmentSiteSegmentMatchRuleP) => void;
  onSelectAll: (type: SegmentSegmentType, rules: ISegmentSiteSegmentMatchRuleP[]) => void;
  onChangeCurrentPage: (type: SegmentSegmentType, _page: number) => void;
  onChangePageSize: (type: SegmentSegmentType, size: number, page?: number) => void;
  loading: boolean;
  error: string;
}

const DevicesTable: React.FC<Props> = (props: Props) => {
  const [selectedSiteMatchKey, setSelectedSiteMatchKey] = React.useState<SegmentSiteSegmentMatchKey>(SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK);
  const [columns, setColumns] = React.useState<GridColDef[]>([
    // {
    //   field: 'name',
    //   headerName: 'Name',
    //   width: 200,
    //   disableColumnMenu: true,
    //   resizable: false,
    //   editable: false,
    //   sortable: false,
    //   hideSortIcons: true,
    //   filterable: false,
    //   disableReorder: true,
    //   disableExport: true,
    // },
    {
      field: 'networkId',
      headerName: 'Network ID',
      width: 220,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      hide: false,
    },
    {
      field: 'serial',
      headerName: 'Serial',
      width: 220,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      hide: true,
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 220,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      hide: true,
    },
    {
      field: 'extId',
      headerName: 'Ext ID',
      width: 220,
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
      width: 160,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
    },
    // {
    //   field: 'tags',
    //   headerName: 'Tags',
    //   minWidth: 300,
    //   flex: 1,
    //   disableColumnMenu: true,
    //   resizable: false,
    //   editable: false,
    //   sortable: false,
    //   hideSortIcons: true,
    //   filterable: false,
    //   disableReorder: true,
    //   disableExport: true,
    //   renderCell: (param: GridRenderCellParams) => {
    //     if (!param.value || !param.value.length) return null;
    //     return <GridCellWrapper>{param.value.map(it => it.value).join(', ')}</GridCellWrapper>;
    //   },
    // },
  ]);
  const gridStyles = GridStyles();
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  React.useEffect(() => {
    const _ids = [];
    if (props.data && props.data.length && props.matchRules && props.matchRules.length) {
      props.matchRules.forEach(it => {
        const field = helper.getSitesFieldFromRuleKey(it.matchKey);
        const _el = props.data.find(item => it.matchKey === selectedSiteMatchKey && item[field] === it.matchValuePrimary);
        if (_el) {
          _ids.push(_el.id);
        }
      });
    }
    setSelectionModel(_ids);
  }, [props.matchRules, props.data, selectedSiteMatchKey]);

  // const onChangeColumn = (col: GridColDef) => {
  //   const _items: GridColDef[] = columns.slice();
  //   const _index = _items.findIndex(it => it.field === col.field);
  //   _items[_index].hide = !col.hide;
  //   setGridColumns(_items);
  // };

  const onRowClick = (params: GridRowParams) => {
    const _item = params.row as INetworkDevice;
    const _value = helper.getSitesFieldValueFromRuleKey(selectedSiteMatchKey, _item);
    const rule: ISegmentSiteSegmentMatchRuleP = {
      matchKey: selectedSiteMatchKey,
      matchValuePrimary: _value,
    };
    props.onSelectChange(SegmentSegmentType.SITE, rule);
  };

  const onColumnHeaderClick = (params: GridColumnHeaderParams) => {
    if (params.field === '__check__') {
      const _items: ISegmentSiteSegmentMatchRuleP[] = [];
      const _field = helper.getSitesFieldFromRuleKey(selectedSiteMatchKey);
      props.data.forEach(it => {
        const rule: ISegmentSiteSegmentMatchRuleP = {
          matchKey: selectedSiteMatchKey,
          matchValuePrimary: it[_field],
        };
        _items.push(rule);
      });
      props.onSelectAll(SegmentSegmentType.SITE, _items);
    }
  };

  const onChangePage = (page: number) => {
    props.onChangeCurrentPage(SegmentSegmentType.SITE, page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(SegmentSegmentType.SITE, size, page);
  };
  const onChangeMatchKey = (v: SegmentSiteSegmentMatchKey) => {
    const _items: GridColDef[] = columns.map(col => {
      if (col.field === 'model') {
        col.hide = v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_MODEL ? false : true;
      }
      if (col.field === 'serial') {
        col.hide = v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_SERIAL_NUM ? false : true;
      }
      if (col.field === 'networkId') {
        col.hide = v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK ? false : true;
      }
      return col;
    });
    setColumns(_items);
    setSelectedSiteMatchKey(v);
  };
  return (
    <>
      <ModalRow margin="0 0 20px 0">
        <MatSelect
          id="siteMatchKeyType"
          label="Key"
          value={selectedSiteMatchKey}
          options={[SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK, SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_MODEL, SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_SERIAL_NUM]}
          styles={{ height: '72px', minHeight: '72px', margin: '0' }}
          selectStyles={{ height: '50px', width: '100%' }}
          selectClaassName="withLabel"
          onChange={onChangeMatchKey}
          renderValue={(v: SegmentSiteSegmentMatchKey) => {
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK) return <ValueLabel>Network</ValueLabel>;
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_MODEL) return <ValueLabel>Model</ValueLabel>;
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_SERIAL_NUM) return <ValueLabel>Serial number</ValueLabel>;
            return <ValueLabel>{v}</ValueLabel>;
          }}
          renderOption={(v: SegmentSiteSegmentMatchKey) => {
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK) return 'Network';
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_MODEL) return 'Model';
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_SERIAL_NUM) return 'Serial number';
            return v;
          }}
        />
      </ModalRow>
      <ModalRow margin="0 0 10px 0" align="center">
        <ModalLabel>Sites</ModalLabel>
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
          rows={props.data}
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

export default React.memo(DevicesTable);
