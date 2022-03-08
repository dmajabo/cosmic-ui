import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import Paging from 'app/components/Basic/Paging';
import { TableWrapper } from 'app/components/Basic/Table/PrimeTableStyles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { MemberAppNodeData } from 'lib/api/ApiModels/Topology/apiModels';
import { DEFAULT_TRANSITION } from 'lib/constants/general';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import { convertBytesToHumanReadableString, convertSecondsToString } from '../../../utils';
import { NestedTrafficTable } from '../../NestedTrafficTable';
import { AppTrafficColumns } from './columns';

export interface TrafficTableRowData extends Pick<MemberAppNodeData, 'sent' | 'recv' | 'flows' | 'activeTime'> {
  name: string;
  resourceId: string;
  networkId: string;
  noOfClients: string;
}

interface ApplicationTableProps {
  data: TrafficTableRowData[];
  showLoader: boolean;
  error?: string;
  styles?: Object;
  pageSize: number;
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;
  onChangePageSize: (size: number, page: number) => void;
}

export const AppTable: React.FC<ApplicationTableProps> = props => {
  const [expandedRowsMapper, setExpandedRowsMapper] = useState<{ [key: string]: boolean }>(null);

  const onRowToggle = (rowData: TrafficTableRowData) => {
    if (!expandedRowsMapper) {
      const _obj = {};
      _obj[rowData.resourceId] = true;
      setExpandedRowsMapper(_obj);
      return;
    }
    const _obj = { ...expandedRowsMapper };
    if (!_obj[rowData.resourceId]) {
      _obj[rowData.resourceId] = true;
      setExpandedRowsMapper(_obj);
      return;
    }
    delete _obj[rowData.resourceId];
    if (!Object.keys(_obj).length) {
      setExpandedRowsMapper(null);
      return;
    }
    setExpandedRowsMapper(_obj);
  };

  const expanderBodyTemplate = (rowData: TrafficTableRowData) => {
    return (
      <IconWrapper
        width="12px"
        height="12px"
        styles={{ verticalAlign: 'middle', transform: expandedRowsMapper && expandedRowsMapper[rowData.resourceId] ? 'rotate(0)' : 'rotate(-90deg)', transition: `transform ${DEFAULT_TRANSITION}` }}
        icon={arrowBottomIcon}
        onClick={e => onRowToggle(rowData)}
      />
    );
  };

  const renderRowTemplate = (rowData: TrafficTableRowData) => {
    return <NestedTrafficTable networkId={rowData.networkId} resourceId={rowData.resourceId} />;
  };

  return (
    <>
      <TableWrapper>
        <DataTable value={props.data} rowExpansionTemplate={renderRowTemplate} responsiveLayout="scroll" className="tableSM fixedToParentHeight" expandedRows={expandedRowsMapper} dataKey="resourceId">
          <Column expander={true} body={expanderBodyTemplate} style={{ width: '1em' }} />
          <Column
            field={AppTrafficColumns.network.field}
            header={AppTrafficColumns.network.label}
            style={{ minWidth: AppTrafficColumns.network.minWidth }}
            sortable={AppTrafficColumns.network.sortable}
          />
          <Column
            body={(rowData: TrafficTableRowData) => <>{convertBytesToHumanReadableString(rowData.sent)}</>}
            field={AppTrafficColumns.sent.field}
            header={AppTrafficColumns.sent.label}
            style={{ minWidth: AppTrafficColumns.sent.minWidth }}
            sortable={AppTrafficColumns.sent.sortable}
          />
          <Column
            body={(rowData: TrafficTableRowData) => <>{convertBytesToHumanReadableString(rowData.recv)}</>}
            field={AppTrafficColumns.received.field}
            header={AppTrafficColumns.received.label}
            style={{ minWidth: AppTrafficColumns.received.minWidth }}
            sortable={AppTrafficColumns.received.sortable}
          />
          <Column field={AppTrafficColumns.flows.field} header={AppTrafficColumns.flows.label} style={{ minWidth: AppTrafficColumns.flows.minWidth }} sortable={AppTrafficColumns.flows.sortable} />
          <Column
            field={AppTrafficColumns.activeTime.field}
            header={AppTrafficColumns.activeTime.label}
            style={{ minWidth: AppTrafficColumns.activeTime.minWidth }}
            sortable={AppTrafficColumns.activeTime.sortable}
            body={(rowData: TrafficTableRowData) => <>{convertSecondsToString(rowData.activeTime)}</>}
          />
          <Column
            field={AppTrafficColumns.noOfClients.field}
            header={AppTrafficColumns.noOfClients.label}
            style={{ minWidth: AppTrafficColumns.noOfClients.minWidth }}
            sortable={AppTrafficColumns.noOfClients.sortable}
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
