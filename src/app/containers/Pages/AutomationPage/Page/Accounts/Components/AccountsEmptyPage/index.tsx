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
              width: '100%',
              maxWidth: '360px',
              margin: '0 20px 20px 20px',
            }}
          />
          <CardComponent
            title="Cisco Meraki"
            vendor={AccountVendorTypes.CISCO_MERAKI}
            description=""
            onConnect={onCardClick}
            styles={{
              width: '100%',
              maxWidth: '360px',
              margin: '0 20px 20px 20px',
            }}
          />
        </CardsWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default React.memo(AccountsEmptyPage);
