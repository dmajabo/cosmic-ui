import React from 'react';
import { PanelContentLabel } from '../FormPanel/styles';
import FormTable from '../Components/FormTable';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { FormRow } from '../PolicyStep/styles';
import ModalComponent from 'app/components/Modal';
import AppEditor from './AppEditor';
import { EmptyMessage } from '../Components/styles';
import { EditGroupItem } from '../../model';
import { ITopologyGroup, SelectorEvalType } from 'lib/api/ApiModels/Topology/endpoints';
import { TopologyGroupTypesAsString } from 'lib/models/topology';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';

interface Props {
  data: string[];
  onChangeApps: (v: ITopologyGroup, index: number | null) => void;
  onDeleteGroup: (id: string) => void;
}

const AppsStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [showCreator, setShowCreator] = React.useState<boolean>(false);
  const [editItem, setEditItem] = React.useState<EditGroupItem>(null);
  const [groups, setGroups] = React.useState<ITopologyGroup[]>([]);

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

  const onAddGroup = () => {
    setEditItem({ group: { name: '', type: TopologyGroupTypesAsString.APPLICATION, evalType: SelectorEvalType.SPECIFIC, extIds: [], expr: '' }, index: null });
    setShowCreator(true);
  };

  const onEdit = (dataItem: ITopologyGroup, index: number) => {
    setEditItem({ group: dataItem, index: index });
    setShowCreator(true);
  };

  const onDelete = (id: string) => {
    props.onDeleteGroup(id);
  };

  const onSave = (item: ITopologyGroup, index: number | null) => {
    setShowCreator(false);
    props.onChangeApps(item, index);
  };

  const onClose = () => {
    setShowCreator(false);
  };
  return (
    <>
      <PanelContentLabel>App Groups</PanelContentLabel>
      {props.data && props.data.length ? (
        <FormTable data={groups} onEditGroup={onEdit} onDeleteGroup={onDelete} />
      ) : (
        <EmptyMessage>There is no app groups yet. To create group click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={props.data && props.data.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton icon={plusIcon} label="Add group" onClick={onAddGroup} />
      </FormRow>
      {showCreator && (
        <ModalComponent
          showHeader
          title="Create App"
          showCloseButton
          modalStyles={{ maxWidth: '800px', maxHeight: '90vh', padding: '40px' }}
          useFadeAnimation
          id="appsModalWindow"
          open={showCreator}
          onClose={onClose}
        >
          <AppEditor data={editItem} onAddGroup={onSave} />
        </ModalComponent>
      )}
    </>
  );
};
export default React.memo(AppsStep);
