import React from 'react';
import { PanelContentLabel } from '../FormPanel/styles';
import FormTable from '../Components/FormTable';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { FormRow } from '../PolicyStep/styles';
import { EditGroupItem } from '../../model';
import ModalComponent from 'app/components/Modal';
import { EmptyMessage } from '../Components/styles';
import { ITopologyGroup, SelectorEvalType } from 'lib/api/ApiModels/Topology/apiModels';
import { TopologyGroupTypesAsString } from 'lib/models/topology';
import NetworkEditor from './NetworkEditor';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import ExistingGroups from '../Components/ExistingGroups';

interface Props {
  data: string[];
  onDeleteGroup: (gr: ITopologyGroup, edgeName: string) => void;
}

const SitesStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [showCreator, setShowCreator] = React.useState<boolean>(false);
  const [editItem, setEditItem] = React.useState<EditGroupItem>(null);
  const [groups, setGroups] = React.useState<ITopologyGroup[]>([]);
  const [showExistingGroups, setShowExistingGroups] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!edges || !edges.groups || !edges.groups.length) return;
    if (!props.data || !props.data.length) return;
    const _arr: ITopologyGroup[] = [];
    props.data.forEach(it => {
      const _gr: ITopologyGroup = edges.groups.find(el => el.id === it);
      if (_gr) {
        _arr.push(_gr);
      }
    });
    setGroups(_arr);
  }, [props.data]);

  const onCreateNewGroup = () => {
    setShowExistingGroups(false);
  };

  const onAddGroup = () => {
    setEditItem({ group: { name: '', type: TopologyGroupTypesAsString.BRANCH_NETWORKS, evalType: SelectorEvalType.SPECIFIC, extIds: [], expr: '' }, index: null });
    setShowExistingGroups(true);
    setShowCreator(true);
  };

  const onAddExistingGroups = (ids: string[]) => {
    setShowExistingGroups(true);
    setShowCreator(false);
    edges.onAddSitesGroups(ids);
  };

  const onEdit = (dataItem: ITopologyGroup, index: number) => {
    setEditItem({ group: dataItem, index: index });
    setShowExistingGroups(false);
    setShowCreator(true);
  };

  const onDelete = (gr: ITopologyGroup) => {
    props.onDeleteGroup(gr, edges.editEdge.name);
  };

  const onSave = (item: ITopologyGroup) => {
    setShowExistingGroups(true);
    edges.onChangeSitesField(item);
  };

  const onClose = () => {
    setShowExistingGroups(true);
    setShowCreator(false);
  };
  return (
    <>
      <PanelContentLabel>Site Groups</PanelContentLabel>
      {props.data && props.data.length ? (
        <FormTable data={groups} onEditGroup={onEdit} onDeleteGroup={onDelete} />
      ) : (
        <EmptyMessage>There are no site groups yet. To create group click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={props.data && props.data.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton icon={plusIcon} label="Add group" onClick={onAddGroup} />
      </FormRow>
      {showCreator && (
        <ModalComponent
          showHeader
          title={showExistingGroups ? 'Add Group' : 'Create Network'}
          showCloseButton
          modalStyles={{ maxWidth: '800px', maxHeight: '90vh' }}
          useFadeAnimation
          id="sitesModalWindow"
          open={showCreator}
          onClose={onClose}
        >
          {showExistingGroups && (
            <ExistingGroups
              selectedItems={props.data}
              groups={edges.groups}
              filterGroupsType={TopologyGroupTypesAsString.BRANCH_NETWORKS}
              onAddExistingGroup={onAddExistingGroups}
              onCreateNew={onCreateNewGroup}
              onEditGroup={onEdit}
              onDeleteGroup={onDelete}
            />
          )}
          {!showExistingGroups && <NetworkEditor data={editItem} onAddGroup={onSave} />}
        </ModalComponent>
      )}
    </>
  );
};
export default React.memo(SitesStep);
