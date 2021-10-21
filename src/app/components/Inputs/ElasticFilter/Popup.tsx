import React from 'react';
import { ListItemsWrapper, ListItem, ItemsContainer } from './styles';
import LoadingIndicator from 'app/components/Loading';
import { ISessionsGridField } from 'app/containers/Pages/SessionsPage/SessionPage/models';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
interface Props {
  items: ISessionsGridField[];
  onSelectItem: (item: ISessionsGridField) => void;
  loading?: boolean;
}
const Popup: React.FC<Props> = (props: Props) => {
  const onSelectField = (item: ISessionsGridField) => {
    props.onSelectItem(item);
  };

  return (
    <ListItemsWrapper>
      <ItemsContainer>
        {props.items.map(it => (
          <ListItem selected={false} onClick={() => onSelectField(it)} key={`suggestField${it.resField}`}>
            {it.label}
          </ListItem>
        ))}
        <AbsLoaderWrapper width="100%" height="100%">
          {props.loading && <LoadingIndicator margin="auto" />}
        </AbsLoaderWrapper>
      </ItemsContainer>
    </ListItemsWrapper>
  );
};
export default React.memo(Popup);
