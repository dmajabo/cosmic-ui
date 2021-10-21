import React from 'react';
import { ElasticFilterWrapper, ElasticLabel, ElasticValueWrapper, IconsWrapper, PopupWrapper, SearchFieldInput } from './styles';
import { ClickAwayListener } from '@material-ui/core';
import { ISelectionGridCellValue } from 'lib/models/general';
import Popup from './Popup';
import Tags from './Tags';
// import { useGet } from 'lib/api/http/useAxiosHook';
import { IFilterOpperator, ISessionsGridField } from 'app/containers/Pages/SessionsPage/SessionPage/models';
// import useDebounce from 'lib/hooks/useDebounce';
import { KEYBOARD_KEYS } from 'lib/constants/general';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { filterIcon } from 'app/components/SVGIcons/filter';
import { getField, getSearchedField, getSearchedFields, ISearchData } from './helper';

interface Props {
  fields: ISessionsGridField[];
  selectionFilterItems: (ISelectionGridCellValue<ISessionsGridField, ISessionsGridField> | IFilterOpperator)[];
  disabled?: boolean;
  placeholder?: string;
  onClearFilteredItem: (index: number) => void;
  onAddFilter: (_item: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>, index: number | null) => void;
  onChangeOperator: (_item: IFilterOpperator, index: number) => void;
  onClearFilter: () => void;
}

const ElasticFilter: React.FC<Props> = (props: Props) => {
  // const { loading, response, error, onGet: onGetPossibleValues } = useGet<any>();
  const [popupItems, setPopupItems] = React.useState<ISessionsGridField[]>([]);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [searchedField, setSearchedField] = React.useState<ISessionsGridField>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  // const [isTyping, setIsTyping] = React.useState(false);
  const [selectedTagIndex, setSelectedTagIndex] = React.useState<number>(null);
  const inputRef = React.useRef(null);

  // const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // React.useEffect(() => {
  //   if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
  //     setIsTyping(false);
  //     onTryLoadPossibleValues(searchTerm);
  //   }
  // }, [debouncedSearchTerm]);

  // React.useEffect(() => {
  //   if (response) {
  //     setPopupItems(response);
  //     setShowPopup(true);
  //   }
  // }, [response]);

  // React.useEffect(() => {
  //   if (error) {
  //     const data: ISessionsGridField[] = [
  //       {
  //         resField: 'deviceName',
  //         searchField: 'device_name',
  //         label: 'Device Name',
  //         isStaticField: false,
  //       },
  //       {
  //         resField: 'deviceExtId',
  //         searchField: 'device_ext_id',
  //         label: 'Device ID',
  //         isStaticField: false,
  //       },
  //     ];
  //     setPopupItems(data);
  //     setShowPopup(true);
  //   }
  // }, [error]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      onUpdateState([], null, false, '', false);
      return;
    }
    const _arr = value.split(':');
    if (!_arr || !_arr.length) {
      onUpdateState(props.fields, null, false, value, false);
      return;
    }
    if (_arr.length === 1) {
      const _data: ISearchData = getSearchedFields(_arr[0], props.fields);
      onUpdateState(_data.items, _data.field, !!_data.items.length, value, false);
      return;
    }
    if (_arr.length > 1) {
      const _currentField: ISearchData = getSearchedField(_arr[0], props.fields);
      if (!_currentField.field) {
        const _data: ISearchData = getSearchedFields(_arr[0], props.fields);
        onUpdateState(_data.items, _data.field, !!_data.items.length, value, false);
        return;
      }
    }
    setPopupItems([]);
    // setIsTyping(true);
    setSearchTerm(value);
  };

  const onUpdateState = (items, field, show, search, typing) => {
    setShowPopup(show);
    setPopupItems(items);
    setSearchedField(field);
    setSearchTerm(search);
    // setIsTyping(typing);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER.key && searchTerm) {
      const _arr = searchTerm.split(': ');
      if (_arr && _arr.length > 1) {
        const _field = getField(_arr[0], props.fields);
        if (!_field) return;
        const _str = _arr[1].split(' ').join('');
        if (!_str.length) return;

        if (selectedTagIndex || selectedTagIndex === 0) {
          setSelectedTagIndex(null);
          props.onAddFilter({ field: _field, value: { label: _arr[1], resField: null, searchField: null, isStaticField: false } }, selectedTagIndex);
        } else {
          props.onAddFilter({ field: _field, value: { label: _arr[1], resField: null, searchField: null, isStaticField: false } }, null);
        }
        onUpdateState([], null, false, '', false);
      }
    }
  };

  const onToogleShow = () => {
    if (props.disabled) return;
    if (!searchTerm) {
      onUpdateState(props.fields, null, true, '', false);
      return;
    }
    if (searchTerm) {
      const _arr = searchTerm.split(': ');
      if (!searchedField && _arr[0]) {
        const _data: ISearchData = getSearchedFields(_arr[0], props.fields);
        onUpdateState(_data.items, _data.field, !!_data.items.length, searchTerm, false);
        return;
      } else if (searchedField) {
        if (!_arr[1] || !_arr[1].length) return;
        // setIsTyping(true);
      }
    }
    setShowPopup(true);
  };

  const onCloseDropdown = () => {
    setPopupItems([]);
  };

  const onClear = () => {
    onUpdateState([], null, false, '', false);
  };

  const onClearAll = () => {
    props.onClearFilter();
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
        onUpdateState([], item, false, `${item.label}: `, false);
        inputRef.current.focus();
        return;
      }
      setShowPopup(false);
      setPopupItems([]);
      setSearchedField(item);
      setSearchTerm(`${item.label}:${_arr[1]}`);
      // setIsTyping(true);
      inputRef.current.focus();
      return;
    }
    onUpdateState([], item, false, `${item.label}: `, false);
    inputRef.current.focus();
  };

  const onSelectValue = (item: ISessionsGridField) => {
    const _fieldLabel = searchedField ? searchedField.label : '';
    onUpdateState(popupItems, searchedField, false, `${_fieldLabel}: ${item.label}`, false);
    inputRef.current.focus();
  };

  const onClearFilteredItem = (index: number) => {
    props.onClearFilteredItem(index);
  };

  const onSelectTag = (item: ISelectionGridCellValue<ISessionsGridField, ISessionsGridField>, index: number) => {
    setSearchedField(item.field);
    setShowPopup(false);
    setSelectedTagIndex(index);
    setSearchTerm(`${item.field.label}: ${item.value.label}`);
    inputRef.current.focus();
  };

  const onChangeOperator = (_item: IFilterOpperator, index: number) => {
    props.onChangeOperator(_item, index);
  };

  // const onTryLoadPossibleValues = async (v: string) => {
  //   await onGetPossibleValues('/api/v1/saf', { serach_term: v });
  // };

  return (
    <ElasticFilterWrapper>
      <ElasticLabel>Filter</ElasticLabel>
      <ClickAwayListener onClickAway={onCloseDropdown}>
        <PopupWrapper>
          <ElasticValueWrapper>
            <SearchFieldInput ref={inputRef} placeholder={props.placeholder && !searchTerm ? props.placeholder : ''} value={searchTerm || ''} onChange={onSearch} onKeyUp={onKeyUp} />
            <IconsWrapper>
              {searchTerm && <IconWrapper onClick={onClear} icon={closeSmallIcon} />}
              {!searchTerm && props.selectionFilterItems.length && <IconWrapper onClick={onClearAll} icon={closeSmallIcon} />}
              <IconWrapper onClick={onToogleShow} icon={filterIcon} styles={{ margin: '0 0 0 12px' }} />
            </IconsWrapper>
          </ElasticValueWrapper>
          {showPopup && (
            <Popup
              // loading={loading}
              items={popupItems}
              onSelectItem={onSelect}
            />
          )}
        </PopupWrapper>
      </ClickAwayListener>
      <Tags items={props.selectionFilterItems} onRemoveTag={onClearFilteredItem} onSelectTag={onSelectTag} onChangeOperator={onChangeOperator} />
    </ElasticFilterWrapper>
  );
};
export default React.memo(ElasticFilter);
