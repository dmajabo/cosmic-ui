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

interface Props {
  data: ITopologyGroup[];
  onChangeApps: (v: ITopologyGroup, index: number | null) => void;
  onDeleteGroup: (index: number) => void;
}

const AppsStep: React.FC<Props> = (props: Props) => {
  const [showCreator, setShowCreator] = React.useState<boolean>(false);
  const [editItem, setEditItem] = React.useState<EditGroupItem>(null);
  const onAddGroup = () => {
    setEditItem({ group: { name: '', type: TopologyGroupTypesAsString.APPLICATION, evalType: SelectorEvalType.EXPR, extIds: [], expr: '' }, index: null });
    setShowCreator(true);
  };

  const onEdit = (dataItem: ITopologyGroup, index: number) => {
    setEditItem({ group: dataItem, index: index });
    setShowCreator(true);
  };

  const onDelete = (index: number) => {
    props.onDeleteGroup(index);
  };

  const onSave = (item: ITopologyGroup, index: number | null) => {
    setShowCreator(false);
    console.log(item, index);
    // props.onChangeApps(item, index);
  };

  const onClose = () => {
    setShowCreator(false);
  };
  return (
    <>
      <PanelContentLabel>App Groups</PanelContentLabel>
      {props.data && props.data.length ? (
        <FormTable data={props.data} onEditGroup={onEdit} onDeleteGroup={onDelete} />
      ) : (
        <EmptyMessage>There is no app groups yet. To create group click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={props.data && props.data.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton icon={plusIcon} label="Add group" onClick={onAddGroup} />
      </FormRow>
      {showCreator && (
        <ModalComponent showHeader title="Create App" showCloseButton modalStyles={{ maxWidth: '580px', maxHeight: '80vh' }} useFadeAnimation id="appsModalWindow" open={showCreator} onClose={onClose}>
          <AppEditor data={editItem} onAddGroup={onSave} />
        </ModalComponent>
      )}
    </>
  );
};
export default React.memo(AppsStep);
