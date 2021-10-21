import React from 'react';
import { ItemsContainer, ListItem, ListItemsWrapper, OperatorPopupWrapper, TagItem, TagItemLabel, TextWrapper } from './styles';
import { FilterOpperators, FilterOpperatorTypes, IFilterOpperator } from 'app/containers/Pages/SessionsPage/SessionPage/models';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { ClickAwayListener } from '@material-ui/core';

interface Props {
  item: IFilterOpperator;
  index: number;
  onChangeOperator: (_item: IFilterOpperator, index: number) => void;
}

const OperatorTag: React.FC<Props> = ({ item, index, onChangeOperator }) => {
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const onOpenPopup = () => {
    setShowPopup(true);
  };

  const onClosePopup = () => {
    setShowPopup(false);
  };

  const onUpdate = (type: FilterOpperatorTypes) => {
    if (type === item.value) return;
    setShowPopup(false);
    if (type === FilterOpperatorTypes.OR) {
      onChangeOperator(jsonClone(FilterOpperators.OR), index);
      return;
    }
    onChangeOperator(jsonClone(FilterOpperators.AND), index);
  };

  return (
    <TagItem>
      <ClickAwayListener onClickAway={onClosePopup}>
        <OperatorPopupWrapper>
          <TextWrapper onClick={onOpenPopup}>
            <TagItemLabel fontSize="12px" lineHeight="23px" color="var(--_primaryColor)">
              {item.label}
            </TagItemLabel>
          </TextWrapper>
          {showPopup && (
            <ListItemsWrapper minWidth="100px" left="-12px">
              <ItemsContainer>
                <ListItem selected={item.value === FilterOpperatorTypes.AND} onClick={() => onUpdate(FilterOpperatorTypes.AND)}>
                  {FilterOpperators.AND.label}
                </ListItem>
                <ListItem selected={item.value === FilterOpperatorTypes.OR} onClick={() => onUpdate(FilterOpperatorTypes.OR)}>
                  {FilterOpperators.OR.label}
                </ListItem>
              </ItemsContainer>
            </ListItemsWrapper>
          )}
        </OperatorPopupWrapper>
      </ClickAwayListener>
    </TagItem>
  );
};

export default React.memo(OperatorTag);
