import React from 'react';
import MatSelect from 'app/components/Inputs/MatSelect';
import { AlertWebhookType, IAlertWebhookChannel } from 'lib/api/ApiModels/Workflow/apiModel';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import TextInput from 'app/components/Inputs/TextInput';
import { IObject } from 'lib/models/general';

interface Props {
  policy: IAlertWebhookChannel;
  validObj: IObject<string>;
  onChangePolicyField: (v: string, field: string) => void;
}

const WebHookFields: React.FC<Props> = (props: Props) => {
  return (
    <>
      <MatSelect
        id="webHookchannelTypes"
        label="Webhook Type"
        value={props.policy.webhookType}
        options={[AlertWebhookType.UNKNOWN_WEBHOOK, AlertWebhookType.SLACK]}
        onChange={() => {}}
        required
        readOnly
        styles={{ height: '72px', minHeight: '72px', margin: '0 0 20px 0' }}
        selectStyles={{ height: '50px', width: '100%' }}
        // selectStyles?: Object;
        // selectClaassName?: string;
        renderValue={(v: AlertWebhookType) => {
          if (v === AlertWebhookType.UNKNOWN_WEBHOOK) return <ValueLabel>Unknown</ValueLabel>;
          if (v === AlertWebhookType.SLACK) return <ValueLabel>Slack</ValueLabel>;
          return null;
        }}
        renderOption={(v: AlertWebhookType) => {
          if (v === AlertWebhookType.UNKNOWN_WEBHOOK) return <ValueLabel>Unknown</ValueLabel>;
          if (v === AlertWebhookType.SLACK) return <ValueLabel>Slack</ValueLabel>;
          return null;
        }}
      />
      <TextInput
        id="webHookchannelUrl"
        name="webhookurl"
        value={props.policy.webhookUrl}
        label="Url"
        onChange={v => props.onChangePolicyField(v, 'webhookUrl')}
        styles={{ margin: '0 0 20px 0' }}
        required
        error={props.validObj && props.validObj['webhookUrl'] ? props.validObj['webhookUrl'] : null}
        inputStyles={{ height: '50px' }}
        hideEmptyInvalid
      />
    </>
  );
};

export default React.memo(WebHookFields);
