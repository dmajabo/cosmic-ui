import React from 'react';
import { CardsWrapper, ContentWrapper, PageWrapper, Title } from './styles';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import CardComponent from './CardComponent';

interface Props {
  onConnect: (type: AccountVendorTypes) => void;
}

const AccountsEmptyPage: React.FC<Props> = ({ onConnect }) => {
  const onCardClick = (_vendor: AccountVendorTypes) => {
    onConnect(_vendor);
  };
  return (
    <PageWrapper>
      <ContentWrapper>
        <Title>Connect To Your Edges</Title>
        <CardsWrapper>
          <CardComponent
            title="AWS"
            vendor={AccountVendorTypes.AMAZON_AWS}
            description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            onConnect={onCardClick}
            styles={{
              width: '100%',
              maxWidth: '364px',
              margin: '0 20px 20px 20px',
            }}
          />
          <CardComponent
            title="Cisco Meraki"
            vendor={AccountVendorTypes.CISCO_MERAKI}
            description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            onConnect={onCardClick}
            styles={{
              width: '100%',
              maxWidth: '364px',
              margin: '0 20px 20px 20px',
            }}
          />
        </CardsWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default React.memo(AccountsEmptyPage);
