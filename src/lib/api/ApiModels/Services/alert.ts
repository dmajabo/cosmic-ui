export const AlertApi = {
  getAllMetadata: () => 'alert/api/v1/alert/metadata', // IAlertMetaDataRes
  getMetadataById: (id: string) => 'alert/api/v1/alert/metadata' + id, // IAlertMetaData
  postMetadata: () => 'alert/api/v1/alert/metadata', // res => IAlertMeta
  getAllChannels: () => 'alert/api/v1/alert/channels', // IAlertChannelRes
  getChannelById: (id: string) => 'alert/api/v1/alert/channels/' + id, // IAlertChannel
  postChannel: () => 'alert/api/v1/alert/channels', // req: IAlertChannel => res: IBaseEntity<string>
  putChannelById: (id: string) => 'alert/api/v1/alert/channels/' + id, // req: IAlertChannel => res: IAlertChannel
  deleteChannel: (id: string) => 'alert/api/v1/alert/channels/' + id,
  getAlertLogs: () => 'alert/api/v1/alert/logs', // res IAlertListAlertLogsResponse
  getAnomalies: () => 'alert/api/v1/alert/anomaly',
};
