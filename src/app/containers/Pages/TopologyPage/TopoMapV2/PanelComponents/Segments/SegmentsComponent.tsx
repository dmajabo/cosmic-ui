import React, { useContext } from 'react';
import { PanelBarContent, PanelHeader, PanelTitle } from '../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { TopologySegementView } from './model';
import EmptySegmentView from './EmptySegmentView';
import AllSegmentsView from './AllSegmentsView';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { useGet, usePost, useDelete, usePut } from 'lib/api/http/useAxiosHook';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { getMaxCopyValue } from './helpers';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import EditSegmentView from './EditSegmentView';

interface IProps {}

const SegmentsComponent: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const [segments, setSegments] = React.useState<ISegmentSegmentP[]>([]);
  const [view, setView] = React.useState<TopologySegementView | null>(null);
  const [segmentToEdit, setSegmentToEdit] = React.useState<ISegmentSegmentP | null>(null);
  const { response, loading, error, onGet } = useGet<ISegmentSegmentP>();
  const { response: postRes, loading: postLoading, onPost } = usePost<ISegmentSegmentP, ISegmentSegmentP>();
  const { response: postUpdateRes, loading: postUpdateLoading, onPut: onUpdate } = usePut<ISegmentSegmentP, ISegmentSegmentP>();
  const { response: deleteRes, loading: deleteLoading, onDelete } = useDelete<ISegmentSegmentP>();
  const [tempData, setTempData] = React.useState<ISegmentSegmentP>(null);
  React.useEffect(() => {
    setSegments(topology.originSegmentsData);
    if (topology.originSegmentsData && topology.originSegmentsData.length) {
      setView(TopologySegementView.ALL);
    } else {
      setView(TopologySegementView.EMPTY);
    }
  }, [topology.originSegmentsData]);

  React.useEffect(() => {
    if (postRes && postRes.id) {
      setView(TopologySegementView.ALL);
      onGetSegment(postRes.id);
    }
  }, [postRes]);

  React.useEffect(() => {
    if (response !== null) {
      topology.onUpdateSegments(response);
    }
  }, [response]);

  React.useEffect(() => {
    if (postUpdateRes && postUpdateRes.id) {
      setView(TopologySegementView.ALL);
      onGetSegment(postUpdateRes.id);
      return;
    }
  }, [postUpdateRes]);

  React.useEffect(() => {
    if (deleteRes !== null) {
      topology.onDeleteSegment(tempData);
      setTempData(null);
    }
  }, [deleteRes]);

  const onOpenEditorSegment = () => {
    setView(TopologySegementView.EDIT);
    setSegmentToEdit(null);
  };

  const onCancel = () => {
    if (topology.originSegmentsData && topology.originSegmentsData.length) {
      setView(TopologySegementView.ALL);
    } else {
      setView(TopologySegementView.EMPTY);
    }
  };

  const onSave = (_data: ISegmentSegmentP) => {
    if (!_data.id) {
      onCreateSegment(_data);
      return;
    }
    onUpdateGroup(_data);
  };

  const onDeleteSegment = (_group: ISegmentSegmentP) => {
    setTempData(_group);
    onTryDeleteSegment(_group);
  };

  const getPanelBarTitle = (_view: TopologySegementView, _group: ISegmentSegmentP | null) => {
    if (_view === TopologySegementView.EDIT && !_group) {
      return 'Create segment';
    }
    if (_view === TopologySegementView.EDIT && _group) {
      return 'Edit segment';
    }
    return 'Segments';
  };

  const onSelectSegment = (_group: ISegmentSegmentP) => {
    setSegmentToEdit(_group);
    setView(TopologySegementView.EDIT);
  };

  const onDublicateSegment = (_group: ISegmentSegmentP) => {
    const group: ISegmentSegmentP = jsonClone(_group);
    const _arr: ISegmentSegmentP[] = segments && segments.length ? segments.filter(it => it.name.indexOf('copy') !== -1) : [];
    const _count: number = getMaxCopyValue(_arr);
    delete group.id;
    const _strs = group.name.split('copy');
    group.name = _strs[0].trim() + ` copy${_count}`;
    setSegmentToEdit(group);
    setView(TopologySegementView.EDIT);
  };

  const onUpdateGroup = async (_data: ISegmentSegmentP) => {
    await onUpdate(PolicyApi.putSegmentsById(_data.id), { group: _data }, userContext.accessToken!);
  };

  const onCreateSegment = async (_data: ISegmentSegmentP) => {
    await onPost(PolicyApi.postSegments(), { group: _data }, userContext.accessToken!);
  };

  const onTryDeleteSegment = async (_data: ISegmentSegmentP) => {
    await onDelete(PolicyApi.deleteSegmentsById(_data.id), userContext.accessToken!);
  };

  const onGetSegment = async (id: string) => {
    await onGet(PolicyApi.getSegmentsById(id), userContext.accessToken!);
  };

  if (!view) {
    return null;
  }
  return (
    <>
      <PanelHeader>
        <PanelTitle>{getPanelBarTitle(view, segmentToEdit)}</PanelTitle>
        {view === TopologySegementView.ALL && <SecondaryButton styles={{ margin: '0 auto 0 30px', flexShrink: 0 }} label="create group" icon={addIcon} onClick={onOpenEditorSegment} />}
      </PanelHeader>
      <OverflowContainer margin={view === TopologySegementView.EMPTY ? 'auto 0' : 'unset'}>
        <PanelBarContent>
          {view === TopologySegementView.EMPTY && <EmptySegmentView onOpenEditorSegment={onOpenEditorSegment} />}
          {view === TopologySegementView.EDIT && <EditSegmentView segment={segmentToEdit} onCancel={onCancel} onSave={onSave} error={error ? error.message : null} />}
          {/* {view === TopologySegementView.ALL && <AllSegmentsView segments={segments} onSelectSegment={onSelectSegment} onDublicateSegment={onDublicateSegment} onDeleteSegment={onDeleteSegment} />} */}
        </PanelBarContent>
      </OverflowContainer>
      {(loading || postLoading || postUpdateLoading || deleteLoading) && (
        <AbsLoaderWrapper width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </>
  );
};

export default React.memo(SegmentsComponent);
