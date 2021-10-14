export const AccountsApi = {
  getAccounts: () => 'policy/api/v1/policy/controllers', // IAccountsController
  getAccountsByName: (name: string) => 'policy/api/v1/policy/controllers/' + name,
  postCreateAccount: () => 'policy/api/v1/policy/controller',
  putUpdateAccount: (name: string) => 'policy/api/v1/policy/controllers/' + name,
  deleteAccounts: (name: string) => 'policy/api/v1/policy/controllers/' + name,
};
