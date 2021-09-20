import React from 'react';
import { PanelBarContent, PanelHeader, PanelTitle } from '../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { TopologyGroupsView } from './model';
import EmptyGroupView from './EmptyGroupView';
import AllGroupView from './AllGroupView';
import EditGroupView from './EditGroupView';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import { ITopologyGroup } from 'lib/models/topology';
import { TopologyGroupApi } from 'lib/api/ApiModels/Topology/endpoints';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { useGet, usePost, useDelete } from 'lib/api/http/useAxiosHook';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { getMaxCopyValue } from './helpers';

interface IProps {}

const GroupsComponent: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const [groups, setGroups] = React.useState([]);
  const [view, setView] = React.useState<TopologyGroupsView | null>(null);
  const [groupToEdit, setGroupToEdit] = React.useState<ITopologyGroup | null>(null);
  const { response, loading, error, onGet } = useGet<ITopologyGroup>();
  const { response: postRes, loading: postLoading, onPost } = usePost<ITopologyGroup, ITopologyGroup>();
  const { response: postUpdateRes, loading: postUpdateLoading, onPost: onUpdate } = usePost<ITopologyGroup, ITopologyGroup>();
  const { response: deleteRes, loading: deleteLoading, onDelete } = useDelete<ITopologyGroup>();
  const [tempData, setTempData] = React.useState<ITopologyGroup>(null);
  React.useEffect(() => {
    const _devG = topology?.networksGroups && topology?.networksGroups.length ? topology?.networksGroups : [];
    const _appG = topology?.applicationsGroup && topology?.applicationsGroup.length ? topology?.applicationsGroup : [];
    const _groups: ITopologyGroup[] = [].concat(_devG, _appG);
    setGroups(_groups);
    if (_groups && _groups.length) {
      setView(TopologyGroupsView.ALL);
    } else {
      setView(TopologyGroupsView.EMPTY);
    }
  }, [topology?.networksGroups, topology?.applicationsGroup]);

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
    if ((topology?.networksGroups && topology?.networksGroups.length) || (topology?.applicationsGroup && topology?.applicationsGroup.length)) {
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
    await onUpdate(TopologyGroupApi.postCreateGroup(), { groupPol: _data });
    // await postUpdateGroupAsync(TopologyGroupApi.postUpdateGroup(_data.id), { groupPol: _data });
  };

  const onCreateGroup = async (_data: ITopologyGroup) => {
    await onPost(TopologyGroupApi.postCreateGroup(), { groupPol: _data });
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
    await onDelete(TopologyGroupApi.deleteGroup(_group.id));
  };

  const onGetGroup = async (id: string) => {
    await onGet(TopologyGroupApi.getGroupById(id));
  };

  if (!view) {
    return null;
  }
  return (
    <>
      <PanelHeader>
        <PanelTitle>{getPanelBarTitle(view, groupToEdit)}</PanelTitle>
        {view === TopologyGroupsView.ALL && <PrimaryButton label="create group" icon={addIcon} onClick={onOpenEditorGroup} />}
      </PanelHeader>
      <OverflowContainer>
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
