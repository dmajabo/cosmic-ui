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
import { usePost } from 'lib/api/http/usePost';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { useDelete } from 'lib/api/http/useDelete';
import { useGet } from 'lib/api/http/useGet';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { getMaxCopyValue } from './helpers';

interface IProps {}

const GroupsComponent: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();
  const [groups, setGroups] = React.useState([]);
  const [view, setView] = React.useState<TopologyGroupsView | null>(null);
  const [groupToEdit, setGroupToEdit] = React.useState<ITopologyGroup | null>(null);
  const [stateGetGroupById, getGroupByIdAsync] = useGet<ITopologyGroup>();
  const [stateCreateNewGroup, postCreateGroupAsync] = usePost<any, any>();
  const [stateUpdateGroup, postUpdateGroupAsync] = usePost<any, any>();
  const [stateDeleteGroup, deleteDeleteGroupAsync] = useDelete<any>();
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>(null);
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
    if (stateCreateNewGroup && !stateCreateNewGroup.isError && !stateCreateNewGroup.isLoading && stateCreateNewGroup.response && stateCreateNewGroup.response.item) {
      if (stateCreateNewGroup.response && stateCreateNewGroup.response.item && stateCreateNewGroup.response.item.id) {
        setView(TopologyGroupsView.ALL);
        onGetGroup(stateCreateNewGroup.response.item.id);
        return;
      }
    }
    if (stateCreateNewGroup && stateCreateNewGroup.isError && !stateCreateNewGroup.isLoading) {
      setErrorMessage(stateCreateNewGroup.errorMessage);
    }
    if (showLoader && stateCreateNewGroup && !stateCreateNewGroup.isLoading) {
      setShowLoader(false);
    }
  }, [stateCreateNewGroup]);

  React.useEffect(() => {
    if (stateGetGroupById && !stateGetGroupById.isError && !stateGetGroupById.isLoading && stateGetGroupById.response && stateGetGroupById.response.item) {
      topology?.onUpdateGroups(stateGetGroupById.response.item);
    }
    if (stateGetGroupById && stateGetGroupById.isError && !stateGetGroupById.isLoading) {
      setErrorMessage(stateGetGroupById.errorMessage);
    }
    if (showLoader && stateGetGroupById && !stateGetGroupById.isLoading) {
      setShowLoader(false);
    }
  }, [stateGetGroupById]);

  React.useEffect(() => {
    if (stateUpdateGroup && !stateUpdateGroup.isError && !stateUpdateGroup.isLoading && stateUpdateGroup.response && stateUpdateGroup.response.item) {
      if (stateUpdateGroup.response && stateUpdateGroup.response.item && stateUpdateGroup.response.item.id) {
        setView(TopologyGroupsView.ALL);
        onGetGroup(stateUpdateGroup.response.item.id);
        return;
      }
    }
    if (stateUpdateGroup && stateUpdateGroup.isError && !stateUpdateGroup.isLoading) {
      setErrorMessage(stateUpdateGroup.errorMessage);
    }
    if (showLoader && stateUpdateGroup && !stateUpdateGroup.isLoading) {
      setShowLoader(false);
    }
  }, [stateUpdateGroup]);

  React.useEffect(() => {
    if (stateDeleteGroup && !stateDeleteGroup.isError && !stateDeleteGroup.isLoading && stateDeleteGroup.response && stateDeleteGroup.response.success) {
      topology?.onDeleteGroup(tempData);
      setTempData(null);
    }
    if (stateDeleteGroup && stateDeleteGroup.isError && !stateDeleteGroup.isLoading) {
      setErrorMessage(stateDeleteGroup.errorMessage);
    }
    if (showLoader && stateDeleteGroup && !stateDeleteGroup.isLoading) {
      setShowLoader(false);
    }
  }, [stateDeleteGroup]);

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
    setShowLoader(true);
    setErrorMessage(null);
    if (!_data.id) {
      onCreateGroup(_data);
      return;
    }
    onUpdateGroup(_data);
  };

  const onDelete = (_group: ITopologyGroup) => {
    setShowLoader(true);
    setTempData(_group);
    onDeleteGroup(_group);
  };

  const onUpdateGroup = async (_data: ITopologyGroup) => {
    await postUpdateGroupAsync(TopologyGroupApi.postCreateGroup(), { groupPol: _data });
    // await postUpdateGroupAsync(TopologyGroupApi.postUpdateGroup(_data.id), { groupPol: _data });
  };

  const onCreateGroup = async (_data: ITopologyGroup) => {
    await postCreateGroupAsync(TopologyGroupApi.postCreateGroup(), { groupPol: _data });
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

  const onDeleteGroup = async (_group: ITopologyGroup) => {
    await deleteDeleteGroupAsync(TopologyGroupApi.deleteGroup(_group.id));
  };

  const onGetGroup = async (id: string) => {
    await getGroupByIdAsync(TopologyGroupApi.getGroupById(id));
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
          {view === TopologyGroupsView.EDIT && <EditGroupView group={groupToEdit} onCancel={onCancel} onSave={onSave} error={errorMessage} />}
          {view === TopologyGroupsView.ALL && <AllGroupView groups={groups} onSelectGroup={onSelectGroup} onDublicateGroup={onDublicateGroup} onDeleteGroup={onDelete} />}
        </PanelBarContent>
      </OverflowContainer>
      {showLoader && (
        <AbsLoaderWrapper size={40} width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </>
  );
};

export default React.memo(GroupsComponent);
