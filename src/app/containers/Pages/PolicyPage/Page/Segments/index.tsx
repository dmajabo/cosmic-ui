import React from 'react';
import { PageContentWrapper } from 'app/containers/Pages/Shared/styles';
import { useDelete, useGet } from 'lib/api/http/useAxiosHook';
import { PAGING_DEFAULT_PAGE_SIZE } from 'lib/hooks/Sessions/model';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { IPolicysvcListSegmentPsResponse, ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import { convertStringToNumber } from 'lib/helpers/general';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import ModalComponent from 'app/components/Modal';
import { DATA_READY_STATE, IModal } from 'lib/models/general';
import DeleteModal from '../../Components/DeleteModal';
import { toast, ToastContainer } from 'react-toastify';
import SectionHeader from '../../Components/SectionHeader';
import TableComponent from './TableComponent';
import { EmptyContainer, EmptyMessagePrimary, EmptyMessageSecondary } from '../../Components/styles';
import EditModal from '../../Components/EditModal';
interface Props {}

const Segments: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, response, error, onGet } = useGet<IPolicysvcListSegmentPsResponse>();
  const { loading: deleteLoading, error: deleteError, response: resDelete, onDelete: onDeleteSegmentById } = useDelete<any>();
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(PAGING_DEFAULT_PAGE_SIZE);
  const [dataRows, setDataRows] = React.useState<ISegmentSegmentP[]>([]);
  const [editModalData, setEditModalData] = React.useState<IModal<ISegmentSegmentP>>({ show: false, dataItem: null });
  const [deleteModalData, setDeleteModalData] = React.useState<IModal<ISegmentSegmentP>>({ show: false, dataItem: null });
  const [dataLoadState, setDataLoadState] = React.useState<DATA_READY_STATE>(DATA_READY_STATE.EMPTY);
  React.useEffect(() => {
    onTryLoadSegments(pageSize, currentPage);
  }, []);

  React.useEffect(() => {
    if (response && response.segments && response.segments.length) {
      const _total = convertStringToNumber(response.totalCount);
      setDataRows(response.segments);
      setTotalCount(_total);
      setDataLoadState(DATA_READY_STATE.SUCCESS);
    } else {
      setDataRows([]);
      setTotalCount(0);
      setDataLoadState(DATA_READY_STATE.EMPTY);
    }
  }, [response]);

  React.useEffect(() => {
    if (resDelete && deleteModalData && deleteModalData.dataItem) {
      toast.success(`Group '${deleteModalData.dataItem.name}' was deleted successfully!`);
      const _items = dataRows.filter(it => it.id !== deleteModalData.dataItem.id);
      const _total = totalCount - 1;
      if (_total <= 0) {
        setDataLoadState(DATA_READY_STATE.EMPTY);
      }
      setDataRows(_items);
      setTotalCount(_total);
      setDeleteModalData({ show: false, dataItem: null });
    }
  }, [resDelete]);

  const onEditSegment = (item: ISegmentSegmentP) => {
    setEditModalData({ show: true, dataItem: item });
  };
  const onCreateSegment = () => {
    setEditModalData({ show: true, dataItem: null });
  };

  const onCloseEditModal = () => {
    setEditModalData({ show: false, dataItem: null });
  };

  const onDeleteSegment = (item: ISegmentSegmentP) => {
    setDeleteModalData({ show: true, dataItem: item });
  };

  const onCloseDeleteModal = () => {
    setDeleteModalData({ show: false, dataItem: null });
  };

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
    onTryLoadSegments(pageSize, _page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      onTryLoadSegments(size, page);
      return;
    }
    setPageSize(size);
    onTryLoadSegments(size, currentPage);
  };

  const onDeleteAccept = () => {
    onTryDeleteSegment(deleteModalData.dataItem.id);
  };

  const onAddSegment = (item: ISegmentSegmentP) => {};

  const onUpdateSegment = (item: ISegmentSegmentP) => {};

  const onTryDeleteSegment = async (id: string) => {
    await onDeleteSegmentById(PolicyApi.deleteSegmentsById(id), userContext.accessToken!);
  };

  const onTryLoadSegments = async (_pageSize: number, _currentPage: number) => {
    const _param = paramBuilder(_pageSize, _currentPage);
    await onGet(PolicyApi.getSegments(), userContext.accessToken!, _param);
  };

  return (
    <>
      <PageContentWrapper margin="0" style={{ minHeight: '100%' }}>
        <SectionHeader label="Segments" onCreate={onCreateSegment} />
        {dataLoadState === DATA_READY_STATE.EMPTY && (
          <EmptyContainer>
            <EmptyMessagePrimary>There is no created segments yet</EmptyMessagePrimary>
            <EmptyMessageSecondary>To create a segment click the “Add Segment” button.</EmptyMessageSecondary>
          </EmptyContainer>
        )}
        {dataLoadState !== DATA_READY_STATE.EMPTY && (
          <TableComponent
            data={dataRows}
            totalCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            error={error ? error.message : null}
            loading={loading}
            onEditSegment={onEditSegment}
            onDeleteSegment={onDeleteSegment}
            onChangeCurrentPage={onChangeCurrentPage}
            onChangePageSize={onChangePageSize}
          />
        )}
        {editModalData && editModalData.show && (
          <ModalComponent
            showHeader
            title={editModalData && editModalData.dataItem ? 'Update Segment' : 'Create Segment'}
            showCloseButton
            modalStyles={{ maxWidth: '800px', maxHeight: '800px' }}
            useFadeAnimation
            id="editModalWindow"
            open={editModalData && editModalData.show}
            onClose={onCloseEditModal}
          >
            <EditModal data={editModalData.dataItem} loading={false} error={null} onCreate={onAddSegment} onUpdate={onUpdateSegment} />
          </ModalComponent>
        )}
        {deleteModalData && deleteModalData.show && (
          <ModalComponent modalStyles={{ maxWidth: '450px', maxHeight: '300px' }} useFadeAnimation id="deleteModalWindow" open={deleteModalData && deleteModalData.show} onClose={onCloseDeleteModal}>
            <DeleteModal data={deleteModalData.dataItem} error={deleteError ? deleteError.message : null} loading={deleteLoading} onDelete={onDeleteAccept} onClose={onCloseDeleteModal} />
          </ModalComponent>
        )}
      </PageContentWrapper>
      <ToastContainer />
    </>
  );
};

export default React.memo(Segments);
