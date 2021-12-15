export const WorkflowApi = {
  getAllMetadata: () => 'alert/api/v1/alert/metadata', // IAlertMetaDataRes
  patchMetadata: (id: string) => '/api/v1/alert/metadata/' + id,
};
