export const WorkflowApi = {
  getAllMetadata: () => 'alert/api/v1/alert/metadata', // IAlertMetaDataRes
  getMetadataById: (id: string) => 'alert/api/v1/alert/metadata', // IAlertMetaData
  patchMetadata: (id: string) => 'alert/api/v1/alert/metadata/' + id, // res => IBaseEntity<string>
  getAllChannels: () => 'alert/api/v1/alert/channels', // IAlertChannelRes
  getChannelById: (id: string) => 'alert/api/v1/alert/channels/' + id, // IAlertChannel
  postChannel: () => 'alert/api/v1/alert/channels', // req: IAlertChannel => res: IBaseEntity<string>
};
