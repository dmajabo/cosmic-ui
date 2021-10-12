import React from 'react';
import { ContentWrapper } from './styles/styles';
import { IModal } from 'lib/models/general';
import ModalComponent from 'app/components/Modal';
import AccountForm from './Components/AccountForm/AccountForm';
import { useAccountsDataContext } from 'lib/hooks/Accounts/useAccountsDataContext';
import { useGet } from 'lib/api/http/useAxiosHook';
import { IAccount, AccountTypes, AccountStatus } from 'lib/api/ApiModels/Accounts/apiModel';
import { AccountsApi } from 'lib/api/ApiModels/Accounts/endpoints';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
// import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import PageHeaderRow from './Components/PageHeaderRow';
import AccountsListItems from './Components/AccountsListItems';
import { PageWrapperStyles } from '../Shared/styles';
interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const { accounts } = useAccountsDataContext();
  const { response, loading, error, onGet } = useGet<IAccount[]>();
  const [showModal, setShowModal] = React.useState<IModal<IAccount>>({ show: false, dataItem: null });

  React.useEffect(() => {
    onTryToLoadData();
  }, []);

  React.useEffect(() => {
    if (response) {
      accounts.onSetData(response);
    }
  }, [response]);

  React.useEffect(() => {
    // TO DO TEMPORARY
    if (error) {
      // accounts.onSetData([]);
      const _data: IAccount[] = [
        { id: '1', name: 'Test 1', type: AccountTypes.MERRAKI, description: 'Some short text', status: AccountStatus.CONNECTED },
        {
          id: '2',
          name: 'Test 2 AWS',
          type: AccountTypes.AWS,
          status: AccountStatus.DISCONNECTED,
          description:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
        },
        { id: '3', name: 'Test 3', type: AccountTypes.MERRAKI, description: 'Some short text' },
        { id: '4', name: 'Test 4', type: AccountTypes.MERRAKI, description: 'Some short text' },
        { id: '5', name: 'Test 5', type: AccountTypes.MERRAKI, description: 'Some short text' },
      ];
      accounts.onSetData(_data);
    }
  }, [error]);

  const onCreateAccount = (type: AccountTypes) => {
    setShowModal({ show: true, dataItem: { id: null, type: type, name: '', description: '' } });
  };
  const onEditAccount = (item: IAccount) => {
    setShowModal({ show: true, dataItem: item });
  };

  const handleClose = () => {
    setShowModal({ show: false, dataItem: null });
  };

  const onTryToLoadData = async () => {
    await onGet(AccountsApi.getAccounts());
  };

  return (
    <>
      <PageWrapperStyles>
        <PageHeaderRow onCreateAccount={onCreateAccount} />
        <ContentWrapper>
          {!loading && <AccountsListItems onEditAccount={onEditAccount} />}
          {/* {!loading && error && error.message && <ErrorMessage margin="auto">{error.message}</ErrorMessage>} */}
          {loading && (
            <AbsLoaderWrapper width="100%" height="100%">
              <LoadingIndicator margin="auto" />
            </AbsLoaderWrapper>
          )}
        </ContentWrapper>
      </PageWrapperStyles>
      <ModalComponent id="accountEditor" open={showModal && showModal.show} onClose={handleClose}>
        {showModal.show && <AccountForm dataItem={showModal.dataItem} onClose={handleClose} />}
      </ModalComponent>
    </>
  );
};

export default React.memo(MainPage);
