import React from 'react';
import { PanelContentLabel } from '../FormPanel/styles';
import FormTable from '../Components/FormTable';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { FormRow } from '../PolicyStep/styles';
import { EditGroupItem, IEdgeGroup, PolicySources } from '../../model';
import ModalComponent from 'app/components/Modal';
import AppEditor from '../Components/AppEditor';
import { EmptyMessage } from '../Components/styles';

interface Props {
  data: IEdgeGroup[];
  onChangeApps: (v: IEdgeGroup, index: number | null) => void;
  onDeleteGroup: (index: number) => void;
}

const AppsStep: React.FC<Props> = (props: Props) => {
  const [showCreator, setShowCreator] = React.useState<boolean>(false);
  const [editItem, setEditItem] = React.useState<EditGroupItem>(null);
  const onAddGroup = () => {
    setEditItem({ group: { name: '', type: PolicySources.AWS, items: [] }, index: null });
    setShowCreator(true);
  };

  const onEdit = (dataItem: IEdgeGroup, index: number) => {
    setEditItem({ group: dataItem, index: index });
    setShowCreator(true);
  };

  const onDelete = (index: number) => {
    props.onDeleteGroup(index);
  };

  const onSave = (item: IEdgeGroup, index: number | null) => {
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
        <FormTable data={props.data} onEditGroup={onEdit} onDeleteGroup={onDelete} />
      ) : (
        <EmptyMessage>There is no app groups yet. To create group click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={props.data && props.data.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton icon={plusIcon} label="Add group" onClick={onAddGroup} />
      </FormRow>
      {showCreator && (
        <ModalComponent showHeader title="Create App" showCloseButton modalStyles={{ maxWidth: '580px', maxHeight: '80vh' }} useFadeAnimation id="appsModalWindow" open={showCreator} onClose={onClose}>
          <AppEditor data={editItem} onSave={onSave} />
        </ModalComponent>
      )}
    </>
  );
};
export default React.memo(AppsStep);
