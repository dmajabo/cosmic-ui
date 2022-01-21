import React from 'react';
import { GridWrapper, ModalLabel, ModalRow } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRenderCellParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
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
import { INetworkTag, INetworkVNetwork } from 'lib/api/ApiModels/Topology/apiModels';
import { IUiPagingData } from 'lib/api/ApiModels/generalApiModel';
import { ISegmentNetworkSegMatchRuleP, SegmentNetworkSegMatchKey, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import { GridCellWrapper } from 'app/components/Grid/styles';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import * as helper from '../helper';

interface Props {
  data: INetworkVNetwork[];
  pageData: IUiPagingData;
  matchRules: ISegmentNetworkSegMatchRuleP[];
  onSelectChange: (type: SegmentSegmentType, item: ISegmentNetworkSegMatchRuleP) => void;
  onSelectAll: (type: SegmentSegmentType, item: ISegmentNetworkSegMatchRuleP[]) => void;
  onChangeCurrentPage: (type: SegmentSegmentType, _page: number) => void;
  onChangePageSize: (type: SegmentSegmentType, size: number, page?: number) => void;
  loading: boolean;
  error: string;
}

const VnetsTable: React.FC<Props> = (props: Props) => {
  const [columns] = React.useState<GridColDef[]>([
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
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
    {
      field: 'tags',
      headerName: 'Tags',
      minWidth: 300,
      flex: 1,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => {
        if (!param.value || !param.value.length) return null;
        return <GridCellWrapper>{param.value.map(it => it.value).join(', ')}</GridCellWrapper>;
      },
    },
  ]);
  const [tagsColumns] = React.useState<GridColDef[]>([
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
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [selectedVnetworkMatchKey, setSelectedVnetworkMatchKey] = React.useState<SegmentNetworkSegMatchKey>(SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID);
  const [visibleData, setVisibleData] = React.useState<(INetworkVNetwork | INetworkTag)[]>([]);

  React.useEffect(() => {
    if (props.data && props.data.length) {
      const _vData: (INetworkVNetwork | INetworkTag)[] = helper.getVisibleVnetData(props.data, selectedVnetworkMatchKey);
      setVisibleData(_vData);
    } else {
      setVisibleData([]);
    }
  }, [props.data, selectedVnetworkMatchKey]);

  React.useEffect(() => {
    const _ids = [];
    if (props.data && props.data.length && props.matchRules && props.matchRules.length) {
      props.matchRules.forEach(it => {
        if (selectedVnetworkMatchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID) {
          const _el = props.data.find(item => it.matchKey === selectedVnetworkMatchKey && item.extId === it.matchValuePrimary);
          if (_el) {
            _ids.push(_el.id);
          }
        }
        if (selectedVnetworkMatchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) {
          props.matchRules.forEach(it => {
            const _el: INetworkTag = helper.getSelectedTagFromVpcs(props.data, it);
            if (_el) {
              const _id = _el.id || `${_el.key}${_el.value}`;
              _ids.push(_id);
            }
          });
        }
      });
    }
    setSelectionModel(_ids);
  }, [props.matchRules, props.data, selectedVnetworkMatchKey]);

  // const onChangeColumn = (col: GridColDef) => {
  //   const _items: GridColDef[] = columns.slice();
  //   const _index = _items.findIndex(it => it.field === col.field);
  //   _items[_index].hide = !col.hide;
  //   setGridColumns(_items);
  // };

  const onRowClick = (params: GridRowParams) => {
    if (selectedVnetworkMatchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) {
      const _item = params.row as INetworkTag;
      const rule: ISegmentNetworkSegMatchRuleP = {
        matchKey: selectedVnetworkMatchKey,
        matchValuePrimary: _item.key,
        matchValueSecondary: _item.value,
      };
      props.onSelectChange(SegmentSegmentType.NETWORK, rule);
      return;
    }
    const _item = params.row as INetworkVNetwork;
    const rule: ISegmentNetworkSegMatchRuleP = {
      matchKey: selectedVnetworkMatchKey,
      matchValuePrimary: _item.extId,
      matchValueSecondary: null,
    };
    props.onSelectChange(SegmentSegmentType.NETWORK, rule);
  };

  const onColumnHeaderClick = (params: GridColumnHeaderParams) => {
    if (params.field === '__check__') {
      const _items: ISegmentNetworkSegMatchRuleP[] = [];
      if (selectedVnetworkMatchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) {
        visibleData.forEach(it => {
          let _tag = it as INetworkTag;
          const rule: ISegmentNetworkSegMatchRuleP = {
            matchKey: selectedVnetworkMatchKey,
            matchValuePrimary: _tag.key,
            matchValueSecondary: _tag.value,
          };
          _items.push(rule);
        });
      } else if (selectedVnetworkMatchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID) {
        visibleData.forEach(it => {
          let _item = it as INetworkVNetwork;
          const rule: ISegmentNetworkSegMatchRuleP = {
            matchKey: selectedVnetworkMatchKey,
            matchValuePrimary: _item.extId,
            matchValueSecondary: null,
          };
          _items.push(rule);
        });
      }
      props.onSelectAll(SegmentSegmentType.NETWORK, _items);
    }
  };

  const onChangePage = (page: number) => {
    props.onChangeCurrentPage(SegmentSegmentType.NETWORK, page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(SegmentSegmentType.NETWORK, size, page);
  };

  const onChangeMatchKey = (v: SegmentNetworkSegMatchKey) => {
    setSelectedVnetworkMatchKey(v);
  };

  return (
    <>
      <ModalRow margin="0 0 20px 0">
        <MatSelect
          id="networkMatchKeyType"
          label="Key"
          value={selectedVnetworkMatchKey}
          options={[SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID, SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG]}
          styles={{ height: '72px', minHeight: '72px', margin: '0' }}
          selectStyles={{ height: '50px', width: '100%' }}
          selectClaassName="withLabel"
          onChange={onChangeMatchKey}
          renderValue={(v: SegmentNetworkSegMatchKey) => {
            if (v === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID) return <ValueLabel>VPC</ValueLabel>;
            if (v === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) return <ValueLabel>Tag</ValueLabel>;
            return <ValueLabel>{v}</ValueLabel>;
          }}
          renderOption={(v: SegmentNetworkSegMatchKey) => {
            if (v === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID) return 'VPC';
            if (v === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) return 'Tag';
            return v;
          }}
        />
      </ModalRow>
      <ModalRow margin="0 0 10px 0" align="center">
        <ModalLabel>Vnets</ModalLabel>
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
          columns={selectedVnetworkMatchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID ? columns : tagsColumns}
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

export default React.memo(VnetsTable);
