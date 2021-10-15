export const AccountsApi = {
  getAccounts: () => 'policy/api/v1/policy/controllers', // IAccountsController
  getAccountsById: (id: string) => 'policy/api/v1/policy/controllers/' + id,
  postCreateAccount: () => 'policy/api/v1/policy/controllers',
  putUpdateAccount: (name: string) => 'policy/api/v1/policy/controllers/' + name,
  deleteAccounts: (name: string) => 'policy/api/v1/policy/controllers/' + name,
};
