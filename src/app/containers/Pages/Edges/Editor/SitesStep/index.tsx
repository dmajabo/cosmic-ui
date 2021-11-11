import React from 'react';
import { PanelContentLabel } from '../FormPanel/styles';
import FormTable from '../Components/FormTable';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { FormRow } from '../PolicyStep/styles';
import { EditGroupItem } from '../../model';
import { PolicySources, IEdgeGroup } from 'lib/api/ApiModels/Edges/apiModel';
import ModalComponent from 'app/components/Modal';
import NetworkEditor from '../Components/NetworkEditor';
import { EmptyMessage } from '../Components/styles';

interface Props {
  data: IEdgeGroup[];
  onChangeSites: (v: IEdgeGroup, index: number | null) => void;
  onDeleteGroup: (index: number) => void;
}

const SitesStep: React.FC<Props> = (props: Props) => {
  const [showCreator, setShowCreator] = React.useState<boolean>(false);
  const [editItem, setEditItem] = React.useState<EditGroupItem>(null);
  const onAddGroup = () => {
    setEditItem({ group: { name: '', type: PolicySources.MERAKI, items: [] }, index: null });
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
    props.onChangeSites(item, index);
  };

  const onClose = () => {
    setShowCreator(false);
  };
  return (
    <>
      <PanelContentLabel>Site Groups</PanelContentLabel>
      {props.data && props.data.length ? (
        <FormTable data={props.data} onEditGroup={onEdit} onDeleteGroup={onDelete} />
      ) : (
        <EmptyMessage>There is no site groups yet. To create group click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={props.data && props.data.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton icon={plusIcon} label="Add group" onClick={onAddGroup} />
      </FormRow>
      {showCreator && (
        <ModalComponent
          showHeader
          title="Create Network"
          showCloseButton
          modalStyles={{ maxWidth: '580px', maxHeight: '80vh', padding: '40px' }}
          useFadeAnimation
          id="sitesModalWindow"
          open={showCreator}
          onClose={onClose}
        >
          <NetworkEditor data={editItem} onSave={onSave} />
        </ModalComponent>
      )}
    </>
  );
};
export default React.memo(SitesStep);
