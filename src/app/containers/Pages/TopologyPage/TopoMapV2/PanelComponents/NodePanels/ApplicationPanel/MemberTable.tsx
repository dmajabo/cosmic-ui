import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import Paging from 'app/components/Basic/Paging';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { MemberAppNodeData, TopoNodeMember } from 'lib/api/ApiModels/Topology/apiModels';
import { DEFAULT_TRANSITION } from 'lib/constants/general';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { convertBytesToHumanReadableString, convertSecondsToString } from '../../utils';
import { NestedTrafficTable } from '../NestedTrafficTable';
import { SiteTrafficColumns } from './TrafficTab/columns';

export interface MemberRow extends Pick<TopoNodeMember, 'name'>, Pick<MemberAppNodeData, 'sent' | 'recv' | 'flows' | 'activeTime'> {
  resourceId: string;
  networkId: string;
  noOfClients: string;
}

interface Props {
  data: MemberRow[];
  showLoader: boolean;
  error?: string;
  styles?: Object;
  pageSize: number;
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;
  onChangePageSize: (size: number, page: number) => void;
}

const MemberTable: React.FC<Props> = (props: Props) => {
  const [expandedRowsMapper, setExpandedRowsMapper] = useState<{ [key: string]: boolean }>(null);

  const onRowToggle = (rowData: MemberRow) => {
    if (!expandedRowsMapper) {
      const _obj = {};
      _obj[rowData.networkId] = true;
      setExpandedRowsMapper(_obj);
      return;
    }
    const _obj = { ...expandedRowsMapper };
    if (!_obj[rowData.networkId]) {
      _obj[rowData.networkId] = true;
      setExpandedRowsMapper(_obj);
      return;
    }
    delete _obj[rowData.networkId];
    if (!Object.keys(_obj).length) {
      setExpandedRowsMapper(null);
      return;
    }
    setExpandedRowsMapper(_obj);
  };

  const expanderBodyTemplate = (rowData: MemberRow) => {
    return (
      <IconWrapper
        width="12px"
        height="12px"
        styles={{ verticalAlign: 'middle', transform: expandedRowsMapper && expandedRowsMapper[rowData.networkId] ? 'rotate(0)' : 'rotate(-90deg)', transition: `transform ${DEFAULT_TRANSITION}` }}
        icon={arrowBottomIcon}
        onClick={e => onRowToggle(rowData)}
      />
    );
  };

  const renderRowTemplate = (rowData: MemberRow) => {
    return <NestedTrafficTable networkId={rowData.networkId} resourceId={rowData.resourceId} />;
  };

  return (
    <>
      <TableWrapper>
        <DataTable value={props.data} rowExpansionTemplate={renderRowTemplate} responsiveLayout="scroll" className="tableSM fixedToParentHeight" expandedRows={expandedRowsMapper} dataKey="networkId">
          <Column expander={true} body={expanderBodyTemplate} style={{ width: '1em' }} />
          <Column
            field={SiteTrafficColumns.network.field}
            header={SiteTrafficColumns.network.label}
            style={{ minWidth: SiteTrafficColumns.network.minWidth }}
            sortable={SiteTrafficColumns.network.sortable}
          />
          <Column
            body={(rowData: MemberRow) => <>{convertBytesToHumanReadableString(rowData.sent)}</>}
            field={SiteTrafficColumns.sent.field}
            header={SiteTrafficColumns.sent.label}
            style={{ minWidth: SiteTrafficColumns.sent.minWidth }}
            sortable={SiteTrafficColumns.sent.sortable}
          />
          <Column
            body={(rowData: MemberRow) => <>{convertBytesToHumanReadableString(rowData.recv)}</>}
            field={SiteTrafficColumns.received.field}
            header={SiteTrafficColumns.received.label}
            style={{ minWidth: SiteTrafficColumns.received.minWidth }}
            sortable={SiteTrafficColumns.received.sortable}
          />
          <Column field={SiteTrafficColumns.flows.field} header={SiteTrafficColumns.flows.label} style={{ minWidth: SiteTrafficColumns.flows.minWidth }} sortable={SiteTrafficColumns.flows.sortable} />
          <Column
            field={SiteTrafficColumns.activeTime.field}
            header={SiteTrafficColumns.activeTime.label}
            style={{ minWidth: SiteTrafficColumns.activeTime.minWidth }}
            sortable={SiteTrafficColumns.activeTime.sortable}
            body={(rowData: MemberRow) => <>{convertSecondsToString(rowData.activeTime)}</>}
          />
          <Column
            field={SiteTrafficColumns.noOfClients.field}
            header={SiteTrafficColumns.noOfClients.label}
            style={{ minWidth: SiteTrafficColumns.noOfClients.minWidth }}
            sortable={SiteTrafficColumns.noOfClients.sortable}
          />
        </DataTable>
        {props.showLoader && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}

        {props.error && (
          <AbsLoaderWrapper width="100%" height="calc(100% - 70px)" top="70px" opacity="1">
            <ErrorMessage margin="auto" fontSize={20}>
              {props.error || 'Something went wrong'}
            </ErrorMessage>
          </AbsLoaderWrapper>
        )}
      </TableWrapper>
      <Paging
        count={props.data.length}
        disabled={!props.data.length}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onChangePage={props.onChangeCurrentPage}
        onChangePageSize={props.onChangePageSize}
        hideLabelAfter={true}
        showFirstButton={false}
        showLastButton={false}
      />
    </>
  );
};

export default React.memo(MemberTable);
