import React from 'react';
import { IDeviceNode } from 'lib/models/topology';
import TableComponent from 'app/components/Basic/Table/TableComponent';
import { ITableColumn } from 'app/components/Basic/Table/model';

interface IProps {
  dataItem: IDeviceNode;
}

const PolicyTab: React.FC<IProps> = (props: IProps) => {
  const [columns] = React.useState<ITableColumn[]>([
    { id: 'id', field: 'id', label: '#' },
    { id: 'policy', field: 'policy', label: 'Policy', minWidth: 100 },
    { id: 'protocol', field: 'protocol', label: 'Protocol', minWidth: 100 },
    { id: 'source', field: 'source', label: 'Source', minWidth: 100 },
    { id: 'destination', field: 'destination', label: 'Destination', minWidth: 120 },
    { id: 'hits', field: 'hits', label: 'Hits', minWidth: 60 },
  ]);

  const [columnsApplication] = React.useState<ITableColumn[]>([
    { id: 'id', field: 'id', label: '#' },
    { id: 'policy', field: 'policy', label: 'Policy', minWidth: 100 },
    { id: 'aplication', field: 'aplication', label: 'Aplication' },
  ]);

  const [rows] = React.useState<any[]>([
    { id: 1, policy: 'policy', protocol: 'Aplication', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 2, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 3, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 4, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 5, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 6, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 7, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 8, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 9, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 10, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 11, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 12, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 13, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
    { id: 14, policy: 'policy', protocol: 'protocol', source: 'source', destination: 'destination', hits: 'hits' },
  ]);

  const [rowsAplication] = React.useState<any[]>([
    { id: 1, policy: 'policy', aplication: 'Aplication' },
    { id: 2, policy: 'policy', aplication: 'test1' },
    { id: 3, policy: 'policy', aplication: 'test1' },
    { id: 4, policy: 'policy', aplication: 'test1' },
    { id: 5, policy: 'policy', aplication: 'test1' },
  ]);
  return (
    <>
      <TableComponent columns={columns} data={rows} shouldDisplayRowNumber />
      <TableComponent columns={columnsApplication} data={rowsAplication} shouldDisplayRowNumber />
    </>
  );
};

export default React.memo(PolicyTab);
