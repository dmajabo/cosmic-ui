import React from 'react';
import { ContentWrapper, TableWrapper } from '../../Shared/styles';
// import Filtser from '../Components/Filter';
import Grid from 'app/components/Grid';
import { GridColDef, GridToolbarContainer, GridToolbarColumnsButton } from '@mui/x-data-grid';

interface IProps {}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

function CustomColumnPanel(props) {
  console.log(props);
  return <div>column</div>;
}

const SessionPage: React.FC<IProps> = (props: IProps) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', minWidth: 40, sortable: false, resizable: false, editable: false, filterable: false, disableReorder: true, disableColumnMenu: true, hideSortIcons: true },
    { field: 'time', headerName: 'Time', minWidth: 120 },
    { field: 'sessionId', headerName: 'Session ID', minWidth: 150 },
    { field: 'name', headerName: 'Endge Name', minWidth: 180 },
    { field: 'type', headerName: 'Endge Type', minWidth: 180 },
    { field: 'sourceId', headerName: 'Source IP', minWidth: 150 },
    { field: 'destinationIp', headerName: 'Destination IP', minWidth: 200 },
    { field: 'tgwName', headerName: 'TGW Name', minWidth: 200 },
    { field: 'tgwRegion', headerName: 'TGW Region', minWidth: 200 },
    { field: 'tgwBytesIn', headerName: 'TGW-BYTESIN', minWidth: 200 },
    { field: 'awsAccountId', headerName: 'AWS-Account-Id', minWidth: 200 },
  ];
  return (
    <>
      {/* <Filter
        items={[
          { id: '1', label: 'test 1' },
          { id: '2', label: 'test 2' },
          { id: '3', label: 'app 2' },
          { id: '4', label: 'app 1' },
        ]}
      /> */}
      <ContentWrapper>
        <TableWrapper>
          <Grid checkboxSelection rows={[]} columns={columns} components={{ Toolbar: CustomToolbar, ColumnsPanel: CustomColumnPanel }} />
        </TableWrapper>
      </ContentWrapper>
    </>
  );
};

export default React.memo(SessionPage);
