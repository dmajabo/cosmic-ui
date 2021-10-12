import React from 'react';
import { ITableColumn } from 'app/components/Basic/Table/model';
import TableComponent from 'app/components/Basic/Table/TableComponent';
interface Props {}

const TriggersTable: React.FC<Props> = (props: Props) => {
  const columns: ITableColumn[] = [
    { id: 'triggersName', field: 'name', label: 'Name' },
    { id: 'triggersCreatedAt', field: 'createdAt', label: 'Created at' },
    { id: 'triggersAction', field: '', label: '', width: 40 },
  ];
  return <TableComponent columns={columns} data={[]} error={null} />;
};

export default React.memo(TriggersTable);
