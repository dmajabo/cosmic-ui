import React, { useContext } from 'react';
import { PanelBarContent, PanelHeader, PanelTitle } from '../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { TopologyGroupsView } from './model';
import EmptyGroupView from './EmptyGroupView';
import AllGroupView from './AllGroupView';
import EditGroupView from './EditGroupView';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import { ITopologyGroup, TopologyGroupApi } from 'lib/api/ApiModels/Topology/endpoints';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { useGet, usePost, useDelete, usePut } from 'lib/api/http/useAxiosHook';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { getMaxCopyValue } from './helpers';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';

interface IProps {}

const GroupsComponent: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const [groups, setGroups] = React.useState([]);
  const [view, setView] = React.useState<TopologyGroupsView | null>(null);
  const [groupToEdit, setGroupToEdit] = React.useState<ITopologyGroup | null>(null);
  const { response, loading, error, onGet } = useGet<ITopologyGroup>();
  const { response: postRes, loading: postLoading, onPost } = usePost<ITopologyGroup, ITopologyGroup>();
  const { response: postUpdateRes, loading: postUpdateLoading, onPut: onUpdate } = usePut<ITopologyGroup, ITopologyGroup>();
  const { response: deleteRes, loading: deleteLoading, onDelete } = useDelete<ITopologyGroup>();
  const [tempData, setTempData] = React.useState<ITopologyGroup>(null);
  React.useEffect(() => {
    setGroups(topology?.originGroupsData);
    if (topology?.originGroupsData && topology?.originGroupsData.length) {
      setView(TopologyGroupsView.ALL);
    } else {
      setView(TopologyGroupsView.EMPTY);
    }
  }, [topology?.originGroupsData]);

  React.useEffect(() => {
    if (postRes && postRes.id) {
      setView(TopologyGroupsView.ALL);
      onGetGroup(postRes.id);
    }
  }, [postRes]);

  React.useEffect(() => {
    if (response !== null) {
      topology?.onUpdateGroups(response);
    }
  }, [response]);

  React.useEffect(() => {
    if (postUpdateRes && postUpdateRes.id) {
      setView(TopologyGroupsView.ALL);
      onGetGroup(postUpdateRes.id);
      return;
    }
  }, [postUpdateRes]);

  React.useEffect(() => {
    if (deleteRes !== null) {
      topology?.onDeleteGroup(tempData);
      setTempData(null);
    }
  }, [deleteRes]);

  const onOpenEditorGroup = () => {
    setView(TopologyGroupsView.EDIT);
    setGroupToEdit(null);
  };

  const onCancel = () => {
    if (topology?.originGroupsData && topology?.originGroupsData.length) {
      setView(TopologyGroupsView.ALL);
    } else {
      setView(TopologyGroupsView.EMPTY);
    }
  };

  const onSave = (_data: ITopologyGroup) => {
    if (!_data.id) {
      onCreateGroup(_data);
      return;
    }
    onUpdateGroup(_data);
  };

  const onDeleteGroup = (_group: ITopologyGroup) => {
    setTempData(_group);
    onTryDeleteGroup(_group);
  };

  const onUpdateGroup = async (_data: ITopologyGroup) => {
    await onUpdate(TopologyGroupApi.postUpdateGroup(_data.id), { group: _data }, userContext.accessToken!);
    // await postUpdateGroupAsync(TopologyGroupApi.postUpdateGroup(_data.id), { groupPol: _data });
  };

  const onCreateGroup = async (_data: ITopologyGroup) => {
    await onPost(TopologyGroupApi.postCreateGroup(), { group: _data }, userContext.accessToken!);
  };

  const getPanelBarTitle = (_view: TopologyGroupsView, _group: ITopologyGroup | null) => {
    if (_view === TopologyGroupsView.EDIT && !_group) {
      return 'Create group';
    }
    if (_view === TopologyGroupsView.EDIT && _group) {
      return 'Edit group';
    }
    return 'Groups';
  };

  const onSelectGroup = (_group: ITopologyGroup) => {
    setGroupToEdit(_group);
    setView(TopologyGroupsView.EDIT);
  };

  const onDublicateGroup = (_group: ITopologyGroup) => {
    const group: ITopologyGroup = jsonClone(_group);
    const _arr: ITopologyGroup[] = groups && groups.length ? groups.filter(it => it.name.indexOf('copy') !== -1) : [];
    const _count: number = getMaxCopyValue(_arr);
    delete group.id;
    const _strs = group.name.split('copy');
    group.name = _strs[0].trim() + ` copy${_count}`;
    setGroupToEdit(group);
    setView(TopologyGroupsView.EDIT);
  };

  const onTryDeleteGroup = async (_group: ITopologyGroup) => {
    await onDelete(TopologyGroupApi.deleteGroup(_group.id), userContext.accessToken!);
  };

  const onGetGroup = async (id: string) => {
    await onGet(TopologyGroupApi.getGroupById(id), userContext.accessToken!);
  };

  if (!view) {
    return null;
  }
  return (
    <>
      <PanelHeader>
        <PanelTitle>{getPanelBarTitle(view, groupToEdit)}</PanelTitle>
        {view === TopologyGroupsView.ALL && <SecondaryButton styles={{ margin: '0 auto 0 30px', flexShrink: 0 }} label="create group" icon={addIcon} onClick={onOpenEditorGroup} />}
      </PanelHeader>
      <OverflowContainer margin={view === TopologyGroupsView.EMPTY ? 'auto 0' : 'unset'}>
        <PanelBarContent>
          {view === TopologyGroupsView.EMPTY && <EmptyGroupView onOpenEditorGroup={onOpenEditorGroup} />}
          {view === TopologyGroupsView.EDIT && <EditGroupView group={groupToEdit} onCancel={onCancel} onSave={onSave} error={error ? error.message : null} />}
          {view === TopologyGroupsView.ALL && <AllGroupView groups={groups} onSelectGroup={onSelectGroup} onDublicateGroup={onDublicateGroup} onDeleteGroup={onDeleteGroup} />}
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

export default React.memo(GroupsComponent);
