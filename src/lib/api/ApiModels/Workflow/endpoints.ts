export const WorkflowApi = {
  getAllMetadata: () => 'alert/api/v1/alert/metadata', // IAlertMetaDataRes
  patchMetadata: (id: string) => 'alert/api/v1/alert/metadata/' + id,
  getAllChannels: () => 'alert/api/v1/alert/channels', // IAlertChannelRes
  getChannelById: (id: string) => 'alert/api/v1/alert/channels/' + id, // IAlertChannel
  postChannel: () => 'alert/api/v1/alert/channels', // req: IAlertChannel => res: IBaseEntity<string>
};
