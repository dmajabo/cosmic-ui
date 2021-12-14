import React, { useContext } from 'react';
import { ContentWrapper } from './styles/styles';
import { IModal } from 'lib/models/general';
import ModalComponent from 'app/components/Modal';
import AccountForm from './Components/AccountForm/AccountForm';
import { useAccountsDataContext } from 'lib/hooks/Accounts/useAccountsDataContext';
import { useDelete, useGet } from 'lib/api/http/useAxiosHook';
import { AccountVendorTypes, IAccountsRes, IAwsRegionsRes, IAWS_Account, IAZURE_Account, IMeraki_Account } from 'lib/api/ApiModels/Accounts/apiModel';
import { AccountsApi } from 'lib/api/ApiModels/Accounts/endpoints';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import PageHeaderRow from './Components/PageHeaderRow';
import AccountsListItems from './Components/AccountsListItems';
import { PageWrapperStyles } from '../Shared/styles';
import { createNewCiscoMerakiAccount, createNewAwsAccount } from 'lib/api/ApiModels/Accounts/newAccount';
import { getPreparedAccountsRes } from 'lib/api/ApiModels/Accounts/helpers';
import AccountsEmptyPage from './Components/AccountsEmptyPage';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const { accounts } = useAccountsDataContext();
  const userContext = useContext<UserContextState>(UserContext);
  const { response, loading, error, onGet } = useGet<IAccountsRes>();
  const { response: resRegions, onGet: onGetRegions } = useGet<IAwsRegionsRes>();
  const { response: resDelete, loading: deleteLoading, onDelete } = useDelete<any>();
  const [showModal, setShowModal] = React.useState<IModal<IMeraki_Account | IAWS_Account | IAZURE_Account>>({ show: false, dataItem: null, isEditMode: false });
  const [tempDeleteId, setTempDeleteId] = React.useState<string>(null);
  React.useEffect(() => {
    onTryToLoadData();
    onTryLoadRegions();
  }, []);

  React.useEffect(() => {
    if (response) {
      const _data: (IMeraki_Account | IAWS_Account | IAZURE_Account)[] = getPreparedAccountsRes(response);
      accounts.onSetData(_data);
    }
  }, [response]);

  React.useEffect(() => {
    if (resDelete && tempDeleteId) {
      setTempDeleteId(null);
      accounts.onDeleteAccount(tempDeleteId);
    }
  }, [resDelete]);

  React.useEffect(() => {
    if (resRegions && resRegions.awsRegions) {
      accounts.onSetRegions(resRegions.awsRegions);
    }
  }, [resRegions]);

  React.useEffect(() => {
    // TO DO TEMPORARY
    if (error) {
      accounts.onSetData([]);
    }
  }, [error]);

  const onCreateAccount = (_type: AccountVendorTypes) => {
    let _dataItem: IMeraki_Account | IAWS_Account | IAZURE_Account = null;
    if (_type === AccountVendorTypes.CISCO_MERAKI) {
      _dataItem = createNewCiscoMerakiAccount();
    }
    if (_type === AccountVendorTypes.AMAZON_AWS) {
      _dataItem = createNewAwsAccount();
    }
    if (!_dataItem) return;
    setShowModal({ show: true, dataItem: _dataItem, isEditMode: false });
  };
  const onEditAccount = (item: IMeraki_Account | IAWS_Account | IAZURE_Account) => {
    setShowModal({ show: true, dataItem: item, isEditMode: true });
  };

  const onDeleteAccount = (id: string) => {
    setTempDeleteId(id);
    onTryDelete(id);
  };

  const handleClose = () => {
    setShowModal({ show: false, dataItem: null, isEditMode: false });
  };

  const onTryToLoadData = async () => {
    await onGet(AccountsApi.getAccounts(), userContext.accessToken!);
  };

  const onTryLoadRegions = async () => {
    await onGetRegions(AccountsApi.getAllAwsRegions(), userContext.accessToken!);
  };

  const onTryDelete = async (id: string) => {
    await onDelete(AccountsApi.deleteAccounts(id), userContext.accessToken!);
  };

  return (
    <>
      <PageWrapperStyles>
        {accounts.dataReadyToShow && accounts.data && accounts.data.length ? <PageHeaderRow onCreateAccount={onCreateAccount} /> : null}
        {!loading && !error && accounts.dataReadyToShow && (
          <ContentWrapper>
            {accounts.data.length ? <AccountsListItems onEditAccount={onEditAccount} onDeleteAccount={onDeleteAccount} /> : null}
            {!accounts.data.length ? <AccountsEmptyPage onConnect={onCreateAccount} /> : null}
          </ContentWrapper>
        )}
        {!loading && error && error.message && (
          <ErrorMessage fontSize={40} margin="auto">
            {error.message}
          </ErrorMessage>
        )}
        {(loading || deleteLoading) && (
          <AbsLoaderWrapper width="100%" height="100%" pointerEvents="all">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
      </PageWrapperStyles>
      <ModalComponent id="accountEditor" open={showModal && showModal.show} onClose={handleClose}>
        {showModal.show && <AccountForm regions={accounts.regions} isEditMode={showModal.isEditMode} dataItem={showModal.dataItem} onClose={handleClose} />}
      </ModalComponent>
    </>
  );
};

export default React.memo(MainPage);
