import React from 'react';
import { ElasticFilterWrapper, ElasticLabel, ElasticValueWrapper, IconsWrapper, PopupWrapper, SearchFieldInput } from './styles';
import { ClickAwayListener } from '@material-ui/core';
import { ISelectionGridCellValue } from 'lib/models/general';
import Popup from './Popup';
import Tags from './Tags';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ISessionsGridField } from 'app/containers/Pages/SessionsPage/SessionPage/models';
import useDebounce from 'lib/hooks/useDebounce';
import { KEYBOARD_KEYS } from 'lib/constants/general';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { filterIcon } from 'app/components/SVGIcons/filter';
import { getSearchedField, getSearchedFields, ISearchData } from './helper';

interface Props {
  fields: ISessionsGridField[];
  selectionFilterItems: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>[];
  disabled?: boolean;
  placeholder?: string;
  onClearFilteredItem: (index: number) => void;
  onAddFilter: (_item: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>) => void;
}

const ElasticFilter: React.FC<Props> = (props: Props) => {
  const { loading, response, error, onGet: onGetPossibleValues } = useGet<any>();
  const [popupItems, setPopupItems] = React.useState<ISessionsGridField[]>([]);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [searchedField, setSearchedField] = React.useState<ISessionsGridField>(null);
  const [searchedValue, setSearchedValue] = React.useState<ISessionsGridField>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [isTyping, setIsTyping] = React.useState(false);
  const inputRef = React.useRef(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      onTryLoadPossibleValues(searchTerm);
    }
  }, [debouncedSearchTerm]);

  React.useEffect(() => {
    if (response) {
      setPopupItems(response);
      setShowPopup(true);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      const data: ISessionsGridField[] = [
        {
          resField: 'deviceName',
          searchField: 'device_name',
          label: 'Device Name',
          isStaticField: false,
        },
        {
          resField: 'deviceExtId',
          searchField: 'device_ext_id',
          label: 'Device ID',
          isStaticField: false,
        },
      ];
      setPopupItems(data);
      setShowPopup(true);
    }
  }, [error]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      onUpdateState([], null, null, false, '', false);
      return;
    }
    const _arr = value.split(':');
    if (!_arr || !_arr.length) {
      onUpdateState([], null, null, false, value, false);
      return;
    }
    if (_arr.length === 1) {
      const _data: ISearchData = getSearchedFields(_arr[0], props.fields);
      onUpdateState(_data.items, _data.field, null, !!_data.items.length, value, false);
      return;
    }
    if (_arr.length > 1) {
      const _currentField: ISearchData = getSearchedField(_arr[0], props.fields);
      if (!_currentField.field) {
        const _data: ISearchData = getSearchedFields(_arr[0], props.fields);
        onUpdateState(_data.items, _data.field, null, !!_data.items.length, value, false);
        return;
      }
    }
    setPopupItems([]);
    setIsTyping(true);
    setSearchTerm(value);
  };

  const onUpdateState = (items, field, value, show, search, typing) => {
    setShowPopup(show);
    setPopupItems(items);
    setSearchedField(field);
    setSearchedValue(value);
    setSearchTerm(search);
    setIsTyping(typing);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER.key && searchedField && searchedValue) {
      props.onAddFilter({ field: searchedField, value: searchedValue });
      onUpdateState([], null, null, false, '', false);
    }
  };

  const onToogleShow = () => {
    if (props.disabled) return;
    if (!searchTerm) {
      onUpdateState(props.fields, null, null, true, '', false);
      return;
    }
    if (searchTerm) {
      const _arr = searchTerm.split(': ');
      if (!searchedField && _arr[0]) {
        const _data: ISearchData = getSearchedFields(_arr[0], props.fields);
        onUpdateState(_data.items, _data.field, null, !!_data.items.length, searchTerm, false);
        return;
      } else if (searchedField) {
        if (!_arr[1] || !_arr[1].length) return;
        setIsTyping(true);
      }
    }
    setShowPopup(true);
  };

  const onCloseDropdown = () => {
    setPopupItems([]);
  };

  const onClear = () => {
    onUpdateState([], null, null, false, '', false);
  };

  const onSelect = (item: ISessionsGridField) => {
    if (item.isStaticField) {
      onSelectItem(item);
      return;
    }
    onSelectValue(item);
  };

  const onSelectItem = (item: ISessionsGridField) => {
    if (searchTerm) {
      const _arr = searchTerm.split(':');
      if (_arr.length <= 1) {
        onUpdateState([], item, null, false, `${item.label}: `, false);
        inputRef.current.focus();
        return;
      }
      setShowPopup(false);
      setPopupItems([]);
      setSearchedField(item);
      setSearchTerm(`${item.label}:${_arr[1]}`);
      setIsTyping(true);
      inputRef.current.focus();
      return;
    }
    onUpdateState([], item, null, false, `${item.label}: `, false);
    inputRef.current.focus();
  };

  const onSelectValue = (item: ISessionsGridField) => {
    const _fieldLabel = searchedField ? searchedField.label : '';
    onUpdateState(popupItems, searchedField, item, false, `${_fieldLabel}: ${item.label}`, false);
    inputRef.current.focus();
  };

  const onClearFilteredItem = (index: number) => {
    props.onClearFilteredItem(index);
  };

  const onTryLoadPossibleValues = async (v: string) => {
    await onGetPossibleValues('/api/v1/saf', { serach_term: v });
  };

  return (
    <ElasticFilterWrapper>
      <ElasticLabel>Filter</ElasticLabel>
      <ClickAwayListener onClickAway={onCloseDropdown}>
        <PopupWrapper>
          <ElasticValueWrapper>
            {/* <DisplayValue onClick={onOpenPopup} item={props.selectedField} /> */}
            <SearchFieldInput ref={inputRef} placeholder={props.placeholder && !searchTerm ? props.placeholder : ''} value={searchTerm || ''} onChange={onSearch} onKeyUp={onKeyUp} />
            <IconsWrapper>
              {searchedField && <IconWrapper onClick={onClear} icon={closeSmallIcon} />}
              <IconWrapper onClick={onToogleShow} icon={filterIcon} styles={{ margin: '0 0 0 12px' }} />
            </IconsWrapper>
          </ElasticValueWrapper>
          {showPopup && <Popup loading={loading} items={popupItems} onSelectItem={onSelect} />}
        </PopupWrapper>
      </ClickAwayListener>
      <Tags items={props.selectionFilterItems} onRemoveTag={onClearFilteredItem} />
    </ElasticFilterWrapper>
  );
};
export default React.memo(ElasticFilter);
