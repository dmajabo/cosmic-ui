import React from 'react';
import { DataGrid, GridColDef, GridSlotsComponent } from '@mui/x-data-grid';

interface Props {
  rows: any[];
  columns: GridColDef[];
  checkboxSelection?: boolean;
  components?: GridSlotsComponent;
}

const Grid: React.FC<Props> = (props: Props) => {
  return <DataGrid checkboxSelection={props.checkboxSelection} disableSelectionOnClick autoHeight rows={props.rows} columns={props.columns} components={props.components} />;
};

export default React.memo(Grid);
