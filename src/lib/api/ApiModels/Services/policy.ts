export const PolicyApi = {
  getAccounts: () => 'policy/api/v1/policy/controllers', // IAccountsController
  getAccountsById: (id: string) => 'policy/api/v1/policy/controllers/' + id,
  postCreateAccount: () => 'policy/api/v1/policy/controllers',
  putUpdateAccount: (id: string) => 'policy/api/v1/policy/controllers/' + id,
  deleteAccounts: (id: string) => 'policy/api/v1/policy/controllers/' + id,
  getAllAwsRegions: () => 'policy/api/v1/policy/aws-regions', // => IAwsRegionsRes

  getAllGroups: () => 'policy/api/v1/policy/selector/groups',
  getGroupById: (id: string) => `policy/api/v1/policy/selector/groups/${id}`,
  postCreateGroup: () => 'policy/api/v1/policy/selector/groups',
  postUpdateGroup: (id: string) => `policy/api/v1/policy/selector/groups/${id}`,
  deleteGroup: (id: string) => `policy/api/v1/policy/selector/groups/${id}`,

  getAlSlaTests: () => '/policy/api/v1/policy/performance/sla-tests',

  getSegments: () => 'policy/api/v1/policy/segments', // IPolicysvcListSegmentPsResponse
  postSegments: () => 'policy/api/v1/policy/segments', // body: { segment: ISegmentSegmentP, dry_run?: boolean }  => res: baseBaseResponse
  getSegmentsById: (id: string) => 'policy/api/v1/policy/segments/' + id, // ISegmentSegmentP
  deleteSegmentsById: (id: string) => 'policy/api/v1/policy/segments/' + id, // empty
  putSegmentsById: (id: string) => 'policy/api/v1/policy/segments/' + id, // baseBaseResponse

  getPreferenceByKey: (key: string, userId: string) => `policy/api/v1/policy/ui/preference/${key}/${userId}`, // res => IUserPreference
  getPostPreferencesList: () => `policy/api/v1/policy/ui/preference/list`, // reg body: IPolicysvcListUiPreferenceRequest => res IPolicysvcListUiPreferenceResponse
  postSavePreference: () => `policy/api/v1/policy/ui/preference`, // reg body { preference: IUserPreference }
  deletePreferenceByKey: (key: string, userId: string) => `/api/v1/policy/ui/preference/${key}/${userId}`, // res: {}
};
