import React from 'react';
import { ElasticFilterWrapper, ElasticLabel, PopupWrapper } from './styles';
import { ClickAwayListener } from '@material-ui/core';
import { ISelectedListItem } from 'lib/models/general';
import Popup from './Popup';
import SearchField from './SearchField';

interface Props {
  fields: ISelectedListItem<string>[];
  disabled?: boolean;
  placeholder?: string;
}
const ElasticFilter: React.FC<Props> = (props: Props) => {
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [selectedField, setSelectedField] = React.useState<ISelectedListItem<string>>(null);
  const ref = React.useRef(null);

  const onToogleShow = () => {
    if (props.disabled || showPopup) return;
    setShowPopup(true);
  };

  const onCloseDropdown = () => {
    setShowPopup(false);
  };

  const onClearSelectedField = () => {
    if (!selectedField) return;
    setSelectedField(null);
  };

  const onSelectField = (field: ISelectedListItem<string>) => {
    if (selectedField && field.id === selectedField.id) return;
    setSelectedField(field);
    setShowPopup(false);
    ref.current.focus();
  };

  return (
    <ElasticFilterWrapper>
      <ElasticLabel>Filter</ElasticLabel>
      <ClickAwayListener onClickAway={onCloseDropdown}>
        <PopupWrapper>
          <SearchField ref={ref} selectedField={selectedField} placeholder={props.placeholder} onClear={onClearSelectedField} onOpenPopup={onToogleShow} />
          {showPopup && <Popup items={props.fields} onSelectItem={onSelectField} selectedItem={selectedField} />}
        </PopupWrapper>
      </ClickAwayListener>
    </ElasticFilterWrapper>
  );
};
export default React.memo(ElasticFilter);
