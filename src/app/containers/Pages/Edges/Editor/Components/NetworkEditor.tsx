import React from 'react';
import { EditGroupItem, IEdgeGroup } from '../../model';
import TextInput from 'app/components/Inputs/TextInput';
import { Input, InputWrapper, TextInputWrapper } from 'app/components/Inputs/TextInput/styles';
import { InputLabel } from 'app/components/Inputs/styles/Label';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { GridWrapper, ModalContent, ModalFooter } from './styles';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { GridStyles } from 'app/components/Grid/GridStyles';

interface Props {
  data: EditGroupItem;
  onSave: (v: IEdgeGroup, index: number | null) => void;
}

const NetworkEditor: React.FC<Props> = ({ data, onSave }) => {
  const [dataItemIndex] = React.useState<number | null>(data.index);
  const [dataItem, setDataItem] = React.useState<IEdgeGroup>(data.group);
  const [columns] = React.useState<GridColDef[]>([
    {
      field: 'site',
      headerName: 'Site',
      minWidth: 80,
      width: 80,
      flex: 0.25,
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
      field: 'name',
      headerName: 'Name',
      minWidth: 80,
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
      field: 'tag',
      headerName: 'Tag',
      minWidth: 80,
      width: 80,
      flex: 0.25,
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
      field: 'location',
      headerName: 'Location',
      width: 100,
      minWidth: 100,
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
      field: 'devices',
      headerName: 'Devices',
      minWidth: 100,
      width: 100,
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
  ]);
  const [rows] = React.useState([
    { id: 1, site: 'Site Name', name: 'Office 1', tag: 'Prod', location: 'East Region', devices: 'devices' },
    { id: 2, site: 'Site Name', name: 'Office 13', tag: 'Prod', location: 'East Region', devices: 'devices' },
    { id: 3, site: 'Site Name', name: 'Office 654', tag: 'Prod', location: 'West Region', devices: 'devices' },
    { id: 4, site: 'Site Name', name: 'Office 1325', tag: 'Prod', location: 'Central Region', devices: 'devices' },
    { id: 5, site: 'Site Name', name: 'Office 1236', tag: 'Prod', location: 'East Region', devices: 'devices' },
    { id: 6, site: 'Site Name', name: 'Office 1325', tag: 'Prod', location: 'Central Region', devices: 'devices' },
    { id: 7, site: 'Site Name', name: 'Office 16', tag: 'Prod', location: 'East Region', devices: 'devices' },
    { id: 8, site: 'Site Name', name: 'Office 25', tag: 'Prod', location: 'Central Region', devices: 'devices' },
    { id: 9, site: 'Site Name', name: 'Office 26', tag: 'Prod', location: 'East Region', devices: 'devices' },
    { id: 10, site: 'Site Name', name: 'Office 46', tag: 'Prod', location: 'Central Region', devices: 'devices' },
    { id: 11, site: 'Site Name', name: 'Office 9999', tag: 'Prod', location: 'East Region', devices: 'devices' },
  ]);
  const gridStyles = GridStyles();
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>(data.group.items);
  const onChangeName = (v: any) => {
    const _item: IEdgeGroup = { ...dataItem };
    _item.name = v;
    setDataItem(_item);
  };

  const onSelectItem = (newSelectionModel: GridSelectionModel) => {
    const _item: IEdgeGroup = { ...dataItem };
    _item.items = newSelectionModel;
    setSelectionModel(newSelectionModel);
    setDataItem(_item);
  };

  const onSaveChanges = () => {
    onSave(dataItem, dataItemIndex);
  };
  return (
    <>
      <ModalContent>
        <TextInputWrapper style={{ margin: '0 0 20px 0' }}>
          <InputLabel htmlFor="connectors">Connectors</InputLabel>
          <InputWrapper>
            <Input id="connectors" name="connectors" type="text" value="Cisco Meraki" onChange={() => {}} readOnly height="50px" padding="8px 24px 8px 56px" />
            <IconWrapper width="24px" height="24px" styles={{ position: 'absolute', top: 'calc(50% - 12px)', left: '20px', pointerEvents: 'none' }} icon={ciscoMerakiLogoIcon(24)} />
          </InputWrapper>
        </TextInputWrapper>
        <TextInput id="networkName" name="name" value={dataItem.name} label="Name" onChange={onChangeName} styles={{ margin: '0 0 20px 0' }} required inputStyles={{ height: '50px' }} />
        <GridWrapper>
          <DataGrid
            disableColumnFilter
            className={gridStyles.container}
            headerHeight={50}
            rowHeight={50}
            rowCount={rows.length}
            hideFooter
            // autoHeight
            rows={rows}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={onSelectItem}
            selectionModel={selectionModel}
          />
        </GridWrapper>
      </ModalContent>
      <ModalFooter>
        <PrimaryButton styles={{ width: '100%', height: '100%' }} disabled={!dataItem.name || !dataItem.items.length} label="Add group" onClick={onSaveChanges} />
      </ModalFooter>
    </>
  );
};

export default React.memo(NetworkEditor);
