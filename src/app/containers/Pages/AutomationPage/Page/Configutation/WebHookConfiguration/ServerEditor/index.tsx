import React from 'react';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import TextInput from 'app/components/Inputs/TextInput';
import { ModalContent, ModalFooter } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { IAlertChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import { jsonClone } from 'lib/helpers/cloneHelper';

interface Props {
  dataItem: IAlertChannel;
  onClose: () => void;
}

const ServerEditor: React.FC<Props> = (props: Props) => {
  const [editItem, setEditItem] = React.useState<IAlertChannel>(props.dataItem);

  const onChangeChannelField = (v: string | null, field: string) => {
    const _obj: IAlertChannel = jsonClone(editItem);
    _obj[field] = v;
    setEditItem(_obj);
  };

  const onSaveChanges = () => {
    console.log(editItem);
  };
  return (
    <>
      <ModalContent>
        <TextInput
          id="serverName"
          name="name"
          value={editItem.name}
          label="Name"
          onChange={v => onChangeChannelField(v, 'name')}
          styles={{ margin: '0 0 20px 0' }}
          required
          inputStyles={{ height: '50px' }}
        />

        <TextInput id="serverUrl" name="url" value={''} label="Url" onChange={v => onChangeChannelField(v, 'url')} styles={{ margin: '0 0 20px 0' }} required inputStyles={{ height: '50px' }} />
        <TextInput
          id="serverPassword"
          name="name"
          value={editItem.name}
          type="password"
          label="Shared Secret"
          onChange={v => onChangeChannelField(v, 'password')}
          styles={{ margin: '0 0 20px 0' }}
          required
          inputStyles={{ height: '50px' }}
        />
        <TextInput
          id="serverTests"
          name="tests"
          value={editItem.name}
          label="Webhook tests"
          onChange={v => onChangeChannelField(v, 'tests')}
          styles={{ margin: '0 0 20px 0' }}
          required
          inputStyles={{ height: '50px' }}
        />
        {/* {(postLoading || postUpdateLoading || loading) && (
          <AbsLoaderWrapper width="100%" height="100%">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )} */}
      </ModalContent>
      <ModalFooter>
        <PrimaryButton styles={{ width: '100%', height: '100%' }} disabled={!editItem.name} label={!editItem.id ? 'Add group' : 'Update Group'} onClick={onSaveChanges} />
      </ModalFooter>
    </>
  );
};

export default React.memo(ServerEditor);
