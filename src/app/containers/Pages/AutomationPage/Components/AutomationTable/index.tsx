import React from 'react';
import TableComponent from 'app/components/Basic/Table/TableComponent';
import { ITableColumn } from 'app/components/Basic/Table/model';
interface Props {}

const AutomationTable: React.FC<Props> = (props: Props) => {
  const columns: ITableColumn[] = [
    { id: 'automationName', field: 'name', label: 'Name' },
    { id: 'automationDescription', field: 'description', label: 'Description' },
    { id: 'automationStatus', field: 'status', label: 'Status' },
    { id: 'automationAction', field: 'action', label: 'Action' },
    { id: 'automationAction', field: '', label: '', width: 40 },
  ];
  return <TableComponent columns={columns} data={[]} error={null} />;
};

export default React.memo(AutomationTable);
