import React from 'react';
import { DataGrid, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { ISession } from 'lib/api/ApiModels/Sessions/apiModel';
import { GridStyles } from 'app/components/Grid/GridStyles';
import TableHeader from './TableHeader';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { gridAscArrow, gridDescArrow } from 'app/components/SVGIcons/arrows';
import Paging from 'app/components/Basic/Paging';
import { SessionGridColumns } from '../models';
import { parseFieldAsDate } from 'lib/helpers/general';
import { IColumn } from 'lib/models/grid';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { getVendorObject } from '../AggregateTable/helper';
import { VendorTdWrapper } from '../AggregateTable/styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { usePost } from 'lib/api/http/useAxiosHook';
import { IPreferenceRes, ISessionsLogPreference, IUserPreference, USER_PREFERENCE_KEYS } from 'lib/api/ApiModels/Policy/Preference';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { getToBase64 } from 'lib/api/http/utils';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSessionsDataContext } from 'lib/hooks/Sessions/useSessionsDataContext';
interface Props {
  data: ISession[];
  logCount: number;
  error: string;
  pageSize: number;
  currentPage: number;
  rowHeight?: number;
  onChangeCurrentPage: (_page: number) => void;
  onChangePageSize: (size: number, page?: number) => void;
}

const Table: React.FC<Props> = (props: Props) => {
  const { sessions } = useSessionsDataContext();
  const userContext = React.useContext<UserContextState>(UserContext);
  const [dataRows, setDataRows] = React.useState<ISession[]>(props.data || []);
  const { error, onPost } = usePost<IPreferenceRes, any>();
  const [columns, setColumns] = React.useState<IColumn[]>([
    {
      ...SessionGridColumns.timestamp,
      valueFormatter: (params: GridValueFormatterParams) => parseFieldAsDate(params.value, `EEE',' LLL d',' yyyy HH:mm aa`),
    },
    { ...SessionGridColumns.startTime },
    { ...SessionGridColumns.endTime },
    { ...SessionGridColumns.flowId },
    { ...SessionGridColumns.flowDirection },
    { ...SessionGridColumns.sourceIp },
    { ...SessionGridColumns.sourcePort },
    { ...SessionGridColumns.sourceOrgid },
    { ...SessionGridColumns.sourceVnetworkExtid },
    { ...SessionGridColumns.sourceVnetworkName },
    { ...SessionGridColumns.sourceSubnetExtid },
    { ...SessionGridColumns.sourceVmExtid },
    { ...SessionGridColumns.sourceVmName },
    { ...SessionGridColumns.sourceRegion },
    { ...SessionGridColumns.sourceControllerName },
    { ...SessionGridColumns.sourceControllerId },
    { ...SessionGridColumns.sourceSegmentId },
    { ...SessionGridColumns.sourceSegmentName },
    { ...SessionGridColumns.sourceSegmentType },
    { ...SessionGridColumns.destIp },
    { ...SessionGridColumns.destPort },
    { ...SessionGridColumns.destOrgid },
    { ...SessionGridColumns.destVnetworkExtid },
    { ...SessionGridColumns.destVnetworkName },
    { ...SessionGridColumns.destSubnetExtid },
    { ...SessionGridColumns.destVmExtid },
    { ...SessionGridColumns.destVmName },
    { ...SessionGridColumns.destRegion },
    { ...SessionGridColumns.destControllerName },
    { ...SessionGridColumns.destControllerId },
    { ...SessionGridColumns.destSegmentId },
    { ...SessionGridColumns.destSegmentName },
    { ...SessionGridColumns.destSegmentType },
    { ...SessionGridColumns.natSourceIp },
    { ...SessionGridColumns.natSourcePort },
    { ...SessionGridColumns.natDestIp },
    { ...SessionGridColumns.natDestPort },
    { ...SessionGridColumns.bytes },
    { ...SessionGridColumns.packets },
    { ...SessionGridColumns.action },
    { ...SessionGridColumns.deviceName },
    { ...SessionGridColumns.deviceExtId },
    {
      ...SessionGridColumns.deviceVendor,
      renderCell: (param: GridRenderCellParams) => {
        const _obj = getVendorObject(param.value as AccountVendorTypes);
        return (
          <VendorTdWrapper>
            {_obj.icon && <IconWrapper customIcon={_obj.icon} width="20px" height="20px" styles={{ margin: '0 8px 0 0' }} />}
            <span>{_obj.label}</span>
          </VendorTdWrapper>
        );
      },
    },
    { ...SessionGridColumns.deviceNetworkExtid },
    { ...SessionGridColumns.deviceControllerId },
    { ...SessionGridColumns.deviceControllerName },
    { ...SessionGridColumns.tcpFlags },
    { ...SessionGridColumns.trafficType },
    { ...SessionGridColumns.vnetworkExtId },
    { ...SessionGridColumns.vnetworkName },
    { ...SessionGridColumns.subnetExtId },
    { ...SessionGridColumns.subnetName },
    { ...SessionGridColumns.vmExtId },
    { ...SessionGridColumns.vmName },
    { ...SessionGridColumns.region },
    { ...SessionGridColumns.azId },
    { ...SessionGridColumns.protocol },
    { ...SessionGridColumns.policyAction },
  ]);
  const columnChangedref = React.useRef(false);
  const columnsRef = React.useRef(columns);
  const gridStyles = GridStyles();

  React.useEffect(() => {
    if (sessions.sessionsLogColumnPreferencesStitch_False && sessions.sessionsLogColumnPreferencesStitch_False.length) {
      const _columns: IColumn[] = columnsRef.current.slice();

      sessions.sessionsLogColumnPreferencesStitch_False.forEach(it => {
        const _cIndex = _columns.findIndex(c => c.id === it.id);
        if (_cIndex !== -1) {
          _columns[_cIndex].hide = it.hide;
        }
      });
      _columns.sort((a, b) => {
        const aindex = sessions.sessionsLogColumnPreferencesStitch_False.findIndex(it => it.id === a.id);
        const bindex = sessions.sessionsLogColumnPreferencesStitch_False.findIndex(it => it.id === b.id);
        if (aindex === -1 || bindex === -1) {
          return 0;
        }
        return aindex - bindex;
      });
      columnsRef.current = _columns;
      setColumns(_columns);
    }
    return () => {
      if (columnChangedref.current) {
        const _с: ISessionsLogPreference[] = columnsRef.current.map((it, index) => ({ id: it.id, field: it.field, hide: it.hide }));
        sessions.onUpdateLogPreference(_с);
        onTrySavePreferences(_с);
      }
    };
  }, []);

  React.useEffect(() => {
    setDataRows(props.data);
  }, [props.data]);

  React.useEffect(() => {
    if (error) {
      toast.error('Something went wrong. Please try Again!');
    }
  }, [error]);

  const onChangePage = (page: number) => {
    props.onChangeCurrentPage(page);
  };
  const onChangePageSize = (size: number, page?: number) => {
    props.onChangePageSize(size, page);
  };
  const onChangeColumn = (col: IColumn) => {
    const _items: IColumn[] = columnsRef.current.slice();
    const _index = _items.findIndex(it => it.field === col.field);
    _items[_index].hide = !col.hide;
    columnsRef.current = _items;
    columnChangedref.current = true;
    setColumns(_items);
  };
  const onChangeOrder = (_items: IColumn[]) => {
    columnsRef.current = _items;
    columnChangedref.current = true;
    setColumns(_items);
  };

  const onTrySavePreferences = async (data: ISessionsLogPreference[]) => {
    const _obj: IUserPreference = {
      userId: userContext.user.sub,
      prefKey: USER_PREFERENCE_KEYS.SESSIONS_LOG_COLUMNS_STITCH_FALSE,
      prefData: getToBase64(data),
    };
    await onPost(PolicyApi.postSavePreference(), { preference: _obj }, userContext.accessToken!);
  };

  return (
    <>
      <TableHeader columns={columns} count={props.logCount} onChangeColumn={onChangeColumn} onChangeOrder={onChangeOrder} />
      <DataGrid
        className={gridStyles.container}
        disableColumnMenu
        hideFooter
        headerHeight={70}
        rowHeight={props.rowHeight || 70}
        rowCount={props.logCount}
        disableColumnFilter
        autoHeight
        error={props.error}
        rows={dataRows}
        columns={columns}
        pageSize={dataRows ? dataRows.length : 0}
        components={{
          ColumnUnsortedIcon: () => null,
          ColumnSortedAscendingIcon: () => <>{gridAscArrow}</>,
          ColumnSortedDescendingIcon: () => <>{gridDescArrow}</>,
          NoRowsOverlay: () => (
            <AbsLoaderWrapper width="100%" height="100%">
              <ErrorMessage color="var(--_primaryTextColor)" margin="auto">
                No data
              </ErrorMessage>
            </AbsLoaderWrapper>
          ),
          ErrorOverlay: () => <ErrorMessage margin="auto">{props.error}</ErrorMessage>,
          LoadingOverlay: () => (
            <AbsLoaderWrapper width="100%" height="calc(100% - 50px)" top="50px">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          ),
        }}
      />
      <Paging
        count={props.logCount}
        disabled={!dataRows.length || props.logCount === 0}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onChangePage={onChangePage}
        onChangePageSize={onChangePageSize}
      />
      <ToastContainer />
    </>
  );
};

export default React.memo(Table);
