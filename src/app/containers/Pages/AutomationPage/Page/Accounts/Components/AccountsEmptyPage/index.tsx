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
            description=""
            onConnect={onCardClick}
            styles={{
              width: 'calc(100% - 40px)',
              flex: '1 1 calc(50% - 40px)',
              minWidth: '400px',
              maxWidth: '500px',
              margin: '0 20px 20px 20px',
            }}
          />
          <CardComponent
            title="Cisco Meraki"
            vendor={AccountVendorTypes.CISCO_MERAKI}
            description=""
            onConnect={onCardClick}
            styles={{
              width: 'calc(100% - 40px)',
              flex: '1 1 calc(50% - 40px)',
              minWidth: '400px',
              maxWidth: '500px',
              margin: '0 20px 20px 20px',
            }}
          />
        </CardsWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default React.memo(AccountsEmptyPage);
