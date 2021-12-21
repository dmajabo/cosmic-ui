import React from 'react';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import TextInput from 'app/components/Inputs/TextInput';
import { ModalContent, ModalFooter } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { AlertChannelType, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
interface Props {
  dataItem: IAlertChannel;
  onClose: () => void;
  onSave: (_item: IAlertChannel) => void;
}
const NewChannel: React.FC<Props> = (props: Props) => {
  const [editItem, setEditItem] = React.useState<IAlertChannel>(props.dataItem);

  const onChangeType = (v: AlertChannelType) => {
    const _obj: IAlertChannel = { ...editItem };
    _obj.channelType = v;
    setEditItem(_obj);
  };

  const onChangeChannelField = (v: string, field: string) => {
    const _obj: IAlertChannel = { ...editItem };
    _obj[field] = v;
    setEditItem(_obj);
  };

  const onSaveChanges = () => {
    props.onSave(editItem);
  };

  return (
    <>
      <ModalContent>
        <TextInput
          id="channelName"
          name="name"
          value={editItem.name}
          label="Name"
          onChange={v => onChangeChannelField(v, 'name')}
          styles={{ margin: '0 0 20px 0' }}
          required
          inputStyles={{ height: '50px' }}
        />
        <MatSelect
          id="channelType"
          label="Channel type"
          value={editItem.channelType}
          options={[AlertChannelType.EMAIL, AlertChannelType.WEBHOOK]}
          onChange={onChangeType}
          required
          styles={{ height: '72px', minHeight: '72px', margin: '0 0 20px 0' }}
          selectStyles={{ height: '50px' }}
          // selectStyles?: Object;
          // selectClaassName?: string;
          renderValue={(v: AlertChannelType) => {
            if (v === AlertChannelType.EMAIL) return <ValueLabel>Email</ValueLabel>;
            if (v === AlertChannelType.WEBHOOK) return <ValueLabel>Webhook</ValueLabel>;
            return null;
          }}
          renderOption={(v: AlertChannelType) => {
            if (v === AlertChannelType.EMAIL) return <ValueLabel>Email</ValueLabel>;
            if (v === AlertChannelType.WEBHOOK) return <ValueLabel>Webhook</ValueLabel>;
            return null;
          }}
        />
      </ModalContent>
      <ModalFooter>
        <PrimaryButton styles={{ width: '100%', height: '100%' }} disabled={!editItem.name} label="New Channel" onClick={onSaveChanges} />
      </ModalFooter>
    </>
  );
};
export default React.memo(NewChannel);
