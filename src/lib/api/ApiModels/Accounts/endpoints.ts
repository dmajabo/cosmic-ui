export const AccountsApi = {
  getAccounts: () => 'policy/api/v1/policy/controllers', // IAccountsController
  getAccountsById: (id: string) => 'policy/api/v1/policy/controllers/' + id,
  postCreateAccount: () => 'policy/api/v1/policy/controllers',
  putUpdateAccount: (id: string) => 'policy/api/v1/policy/controllers/' + id,
  deleteAccounts: (id: string) => 'policy/api/v1/policy/controllers/' + id,
  getAllAwsRegions: () => 'policy/api/v1/policy/aws-regions', // => IAwsRegionsRes
};
