import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

interface Props {
  rows: GridRowsProp[];
  columns: GridColDef[];
  checkboxSelection?: boolean;
}

const Grid: React.FC<Props> = (props: Props) => {
  return <DataGrid checkboxSelection={props.checkboxSelection} disableSelectionOnClick autoHeight rows={props.rows} columns={props.columns} />;
};

export default React.memo(Grid);
