export const WorkflowApi = {
  getAllMetadata: () => 'alert/api/v1/alert/metadata', // IAlertMetaDataRes
  getMetadataById: (id: string) => 'alert/api/v1/alert/metadata' + id, // IAlertMetaData
  putMetadata: (id: string) => 'alert/api/v1/alert/metadata/' + id, // res => IAlertMeta
  getAllChannels: () => 'alert/api/v1/alert/channels', // IAlertChannelRes
  getChannelById: (id: string) => 'alert/api/v1/alert/channels/' + id, // IAlertChannel
  postChannel: () => 'alert/api/v1/alert/channels', // req: IAlertChannel => res: IBaseEntity<string>
  putChannelById: (id: string) => 'alert/api/v1/alert/channels/' + id, // req: IAlertChannel => res: IAlertChannel
};
