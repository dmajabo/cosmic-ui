export const AccountsApi = {
  getAccounts: () => 'topo/accounts',
  postCreateAccount: () => 'topo/accounts',
  putUpdateAccount: (id: string) => 'topo/accounts/' + id,
  deleteAccounts: (id: string) => 'topo/accounts/' + id,
};
