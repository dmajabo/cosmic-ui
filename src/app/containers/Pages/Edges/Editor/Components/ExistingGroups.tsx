import React from 'react';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { ITopologyGroup, ITopologyGroupsData } from 'lib/api/ApiModels/Topology/apiModels';
import { GridWrapper, ModalContent, ModalFooter, ModalLabel, ModalRow } from '../Components/styles';
import { useGet } from 'lib/api/http/useAxiosHook';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { TopologyGroupTypesAsString } from 'lib/models/topology';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { GridStyles } from 'app/components/Grid/GridStyles';
import { DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import Paging from 'app/components/Basic/Paging';
import { GridCellLabel, GridCellWrapper } from 'app/components/Grid/styles';
import SettingsButton from 'app/components/Buttons/SettingsButton';
import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
import { editIcon } from 'app/components/SVGIcons/edit';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';

interface Props {
  selectedItems: string[];
  groups: ITopologyGroup[];
  filterGroupsType: TopologyGroupTypesAsString;
  onAddExistingGroup: (groups: string[]) => void;
  onCreateNew: () => void;
  onEditGroup: (gr: ITopologyGroup, index: number) => void;
  onDeleteGroup: (gr: ITopologyGroup) => void;
}

const ExistingGroups: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { response, error, loading, onGet } = useGet<ITopologyGroupsData>();
  const [groupsData, setGroupsData] = React.useState<ITopologyGroup[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const gridStyles = GridStyles();
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [columns] = React.useState<GridColDef[]>([
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 120,
      width: 120,
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
      field: 'type',
      headerName: 'Type',
      width: 200,
      minWidth: 200,
      flex: 0.5,
      disableColumnMenu: true,
      resizable: false,
      editable: false,
      sortable: false,
      hideSortIcons: true,
      filterable: false,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => {
        if (param.row.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
          return (
            <GridCellWrapper>
              <IconWrapper styles={{ margin: 'auto 12px auto 0', cursor: 'default' }} width="24px" height="24px" icon={ciscoMerakiLogoIcon(24)} />
              <GridCellLabel cursor="default">Cisco Meraki</GridCellLabel>
            </GridCellWrapper>
          );
        }
        if (param.row.type === TopologyGroupTypesAsString.APPLICATION) {
          return (
            <GridCellWrapper>
              <IconWrapper styles={{ margin: 'auto 12px auto 0', cursor: 'default' }} width="24px" height="24px" icon={awsIcon(24)} />
              <GridCellLabel cursor="default">Aws</GridCellLabel>
            </GridCellWrapper>
          );
        }
        return null;
      },
    },
    {
      field: '',
      headerName: '',
      width: 40,
      resizable: false,
      filterable: false,
      sortable: false,
      editable: false,
      hideSortIcons: true,
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      renderCell: (param: GridRenderCellParams) => (
        <GridCellWrapper>
          <SettingsButton buttonStyles={{ position: 'static', width: '20px', height: '100%', margin: 'auto' }} id={param.id.toString()} hoverIconColor="var(--_sHoverButtonColor)">
            <PopupContent>
              <PopupItem label="Edit" icon={editIcon} onClick={() => onEditGroup(param)} />
              <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon()} onClick={() => onDeleteGroup(param)} />
            </PopupContent>
          </SettingsButton>
        </GridCellWrapper>
      ),
    },
  ]);

  React.useEffect(() => {
    setSelectionModel(props.selectedItems);
  }, [props.selectedItems]);

  React.useEffect(() => {
    if (!props.groups || !props.groups.length) {
      onTryLoadGroups();
    } else {
      const _arr: ITopologyGroup[] = props.groups.filter(it => it.type === props.filterGroupsType);
      setSelectionModel(props.selectedItems);
      setGroupsData(_arr);
      setTotalCount(_arr.length);
    }
  }, [props.groups]);

  React.useEffect(() => {
    if (response && response.groups) {
      setSelectionModel(props.selectedItems);
      setGroupsData(response.groups.filter(it => it.type === props.filterGroupsType));
      setTotalCount(response.groups.length);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const onSelectionModelChange = e => {
    setSelectionModel(e);
  };

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      return;
    }
    setPageSize(size);
  };

  const onEditGroup = param => {
    const index = props.groups.findIndex(it => it.id === param.row.id);
    props.onEditGroup(param.row as ITopologyGroup, index);
  };

  const onDeleteGroup = (param: GridRenderCellParams) => {
    const _gr: ITopologyGroup = param.row as ITopologyGroup;
    props.onDeleteGroup(_gr);
  };

  const onSaveChanges = () => {
    props.onAddExistingGroup(selectionModel as string[]);
  };

  const onTryLoadGroups = async () => {
    await onGet(PolicyApi.getAllGroups(), userContext.accessToken!);
  };

  return (
    <>
      <ModalContent>
        <ModalRow align="center">
          <ModalLabel>Existing Groups</ModalLabel>
          <SecondaryButton styles={{ margin: '0 0 0 auto' }} label="create new" icon={addIcon} onClick={props.onCreateNew} />
        </ModalRow>
        <GridWrapper>
          <DataGrid
            disableColumnFilter
            className={gridStyles.container}
            headerHeight={50}
            rowHeight={50}
            hideFooter
            rowCount={totalCount}
            rows={groupsData}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            selectionModel={selectionModel}
            onSelectionModelChange={onSelectionModelChange}
            loading={loading}
            error={error ? error.message : null}
            components={{
              NoRowsOverlay: () => (
                <AbsLoaderWrapper width="100%" height="100%">
                  <ErrorMessage color="var(--_primaryTextColor)" margin="auto">
                    No data
                  </ErrorMessage>
                </AbsLoaderWrapper>
              ),
              ErrorOverlay: () => <ErrorMessage margin="auto">{error ? error.message : null}</ErrorMessage>,
              LoadingOverlay: () => (
                <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
                  <LoadingIndicator margin="auto" />
                </AbsLoaderWrapper>
              ),
              Checkbox: React.forwardRef(({ checked, onChange, indeterminate }, ref) => <SimpleCheckbox ref={ref} isChecked={checked} toggleCheckboxChange={onChange} indeterminate={indeterminate} />),
            }}
          />
        </GridWrapper>
        <Paging
          count={totalCount}
          disabled={!groupsData.length || totalCount === 0}
          pageSize={pageSize}
          currentPage={currentPage}
          onChangePage={onChangeCurrentPage}
          onChangePageSize={onChangePageSize}
          boundaryCount={0}
          siblingCount={0}
          pageSizeValues={[10, 20, 50]}
          hideLabelAfter
          showFirstButton={false}
          showLastButton={false}
          pagingWrapStyles={{ height: '52px', paddingTop: '12px' }}
          selectWrapStyles={{ maxWidth: '150px' }}
          hideRange={680}
        />
      </ModalContent>
      <ModalFooter>
        <PrimaryButton styles={{ width: '100%', height: '100%' }} disabled={!groupsData || !groupsData.length || !selectionModel || !selectionModel.length} label="Add group" onClick={onSaveChanges} />
      </ModalFooter>
    </>
  );
};

export default React.memo(ExistingGroups);
