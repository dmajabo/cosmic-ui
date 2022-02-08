import React from 'react';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import TextInput from 'app/components/Inputs/TextInput';
import { ModalContent, ModalFooter } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { AlertChannelType, IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import WebHookFields from './WebHookFields';
import _ from 'lodash';
import { IObject } from 'lib/models/general';
import { channelValidator } from './validationHelper';
interface Props {
  dataItem: IAlertChannel;
  onClose: () => void;
  onSave: (_item: IAlertChannel) => void;
}
const NewChannel: React.FC<Props> = (props: Props) => {
  const [editItem, setEditItem] = React.useState<IAlertChannel>(props.dataItem);
  const [validObj, setValidObj] = React.useState<IObject<string>>(null);

  React.useEffect(() => {
    if (!_.isEqual(props.dataItem, editItem)) {
      const validObj: IObject<string> = channelValidator(editItem);
      setValidObj(validObj);
    }
  }, [editItem]);

  const onChangeType = (v: AlertChannelType) => {
    const _obj: IAlertChannel = _.cloneDeep(editItem);
    _obj.channelType = v;
    setEditItem(_obj);
  };

  const onChangeChannelField = (v: string, field: string) => {
    const _obj: IAlertChannel = _.cloneDeep(editItem);
    _obj[field] = v;
    setEditItem(_obj);
  };

  const onChangeWebHookPolicyField = (v: string, field: string) => {
    const _obj: IAlertChannel = _.cloneDeep(editItem);
    _obj.webhookPolicy[field] = v;
    setEditItem(_obj);
  };

  const onSaveChanges = () => {
    if (validObj) return;
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
          error={validObj && validObj['name'] ? validObj['name'] : null}
          hideEmptyInvalid
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
          selectStyles={{ height: '50px', width: '100%' }}
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
        {editItem.channelType === AlertChannelType.WEBHOOK && <WebHookFields validObj={validObj} policy={editItem.webhookPolicy} onChangePolicyField={onChangeWebHookPolicyField} />}
      </ModalContent>
      <ModalFooter>
        <PrimaryButton styles={{ width: '100%', height: '100%' }} disabled={!!validObj || !editItem.name} label="New Channel" onClick={onSaveChanges} />
      </ModalFooter>
    </>
  );
};
export default React.memo(NewChannel);
