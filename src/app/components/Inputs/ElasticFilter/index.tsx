import React from 'react';
import { ElasticFilterWrapper, ElasticLabel, ElasticValueWrapper, IconsWrapper, PopupWrapper } from './styles';
import { ClickAwayListener } from '@mui/material';
import Popup from './Popup';
import Tags from './Tags';
import { useGet } from 'lib/api/http/useAxiosHook';
import useDebounce from 'lib/hooks/useDebounce';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { filterIcon } from 'app/components/SVGIcons/filter';
import { getSearchedFields, ISearchData } from './helper';
import { ElasticFilterSuffics, IElasticField, IElasticFilterModel } from 'lib/models/elastic';
import { IParam, SESSIONS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
import Input from './Input';

interface Props {
  fields: IElasticField[];
  applayedFilterItems: (IElasticFilterModel | string)[];
  disabled?: boolean;
  placeholder?: string;
  onRemoveFilteredItem: (index: number) => void;
  onUpdateFilter: (_item: IElasticFilterModel, index: number) => void;
  onAddFilter: (_item: IElasticFilterModel) => void;
  onChangeOperator: (_item: string, index: number) => void;
  onClearAllFilter: () => void;
  url?: string;
  timePeriod?: string | SESSIONS_TIME_RANGE_QUERY_TYPES;
  stitch?: boolean;
  onLoadDataEnd?: (data: any) => void;
  onMapRes?: (res: any, field: IElasticField, stitch?: boolean) => string[];
  onRefresh?: () => void;
  paramBuilder?: any;
}

const ElasticFilter: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, response, onGet: onGetPossibleValues } = useGet<any>();
  const [popupItems, setPopupItems] = React.useState<IElasticField[] | string[]>(props.fields);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [selectedField, setSelectedField] = React.useState<IElasticField>(null);
  const [searchedValue, setSearchedValue] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState<string>('');
  const [selectedTagIndex, setSelectedTagIndex] = React.useState<number>(null);
  const [isTyping, setIsTyping] = React.useState(false);
  const [needGetValues, setNeedGetValues] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(searchedValue, 500);

  React.useEffect(() => {
    if (inputValue) {
      setSelectedField(null);
      setSearchedValue(null);
      setPopupItems(props.fields);
      setInputValue('');
    }
  }, [props.stitch, props.timePeriod, props.url]);

  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      if (selectedField && searchedValue) {
        setNeedGetValues(true);
        onTryLoadData({ field: selectedField, value: searchedValue }, ElasticFilterSuffics.AUTOCOMPLETE);
      }
    }
  }, [debouncedSearchTerm]);

  React.useEffect(() => {
    if (response) {
      if (needGetValues) {
        const _items: string[] = props.onMapRes(response, selectedField, props.stitch);
        setNeedGetValues(false);
        setPopupItems(_items);
        setShowPopup(true);
      }
      props.onLoadDataEnd(response);
    }
  }, [response]);

  const onSearch = (value: string) => {
    if (value) {
      const _arr = value.split(':');
      if (!_arr || !_arr.length) {
        setSelectedField(null);
        setSearchedValue(null);
        setPopupItems(props.fields);
      } else if (_arr.length <= 1) {
        const _data: ISearchData = getSearchedFields(_arr[0].trim(), props.fields);
        setPopupItems(_data.items);
        setSelectedField(_data.field);
        setSearchedValue(null);
        if (!selectedField && _data.field) {
          setInputValue(`${_data.field.label}: `);
        } else if (_data.field && selectedField && selectedField.label !== _data.field.label) {
          setInputValue(`${_data.field.label}: `);
        }
      } else {
        const _data: ISearchData = getSearchedFields(_arr[0].trim(), props.fields);
        if (!_data.field) {
          setPopupItems(_data.items);
        } else {
          setPopupItems([]);
        }
        setSelectedField(_data.field);
        const _v = _arr[1].trim();
        if (_v.length) {
          setSearchedValue(_v);
        }
      }
    } else {
      setPopupItems(props.fields);
    }
    setShowPopup(true);
    setIsTyping(true);
    setInputValue(value);
  };

  const onKeyUp = (value: string) => {
    if (!selectedField || !searchedValue) return;
    setNeedGetValues(false);
    setSelectedField(null);
    setSearchedValue(null);
    setShowPopup(false);
    setPopupItems(props.fields);
    setInputValue('');
    setIsTyping(false);
    const _arr = value.split(':');
    if (!_arr || _arr.length <= 1) return;
    const _data: ISearchData = getSearchedFields(_arr[0].trim(), props.fields);
    if (!_data || !_data.field) return;
    if (selectedTagIndex || selectedTagIndex === 0) {
      props.onUpdateFilter({ field: _data.field, value: _arr[1].trim() }, selectedTagIndex);
    } else {
      props.onAddFilter({ field: _data.field, value: _arr[1].trim() });
    }
  };

  const onToogleShow = () => {
    if (props.disabled || showPopup) return;
    setShowPopup(true);
  };

  const onCloseDropdown = () => {
    if (props.disabled || !showPopup) return;
    setShowPopup(false);
  };

  const onClear = () => {
    setShowPopup(false);
    setPopupItems(props.fields);
    setSelectedField(null);
    setSearchedValue('');
    setInputValue('');
    props.onRefresh();
  };

  const onSelect = (item: IElasticField | string) => {
    if (typeof item === 'string') {
      onSelectPossibleValue(item);
      return;
    }
    onChooseField(item);
  };

  const onChooseField = (item: IElasticField) => {
    setShowPopup(false);
    setSelectedField(item);
    if (!inputValue) {
      setInputValue(`${item.label}: `);
      inputRef.current.focus();
      return;
    }
    const _arr = inputValue.split(':');
    if (_arr.length <= 1) {
      setInputValue(`${item.label}: `);
      inputRef.current.focus();
      return;
    }
    setInputValue(`${item.label}: ${_arr[1].trim()}`);
    setNeedGetValues(true);
    onTryLoadData({ field: item, value: _arr[1].trim() }, ElasticFilterSuffics.AUTOCOMPLETE);
    inputRef.current.focus();
  };

  const onSelectPossibleValue = (item: string) => {
    setNeedGetValues(false);
    setSelectedField(null);
    setSearchedValue(null);
    setShowPopup(false);
    setPopupItems(props.fields);
    setInputValue('');
    setIsTyping(false);
    if (!selectedField) return;
    if (selectedTagIndex || selectedTagIndex === 0) {
      props.onUpdateFilter({ field: selectedField, value: item }, selectedTagIndex);
    } else {
      props.onAddFilter({ field: selectedField, value: item });
    }
    inputRef.current.focus();
  };

  const onClearFilteredItem = (index: number) => {
    props.onRemoveFilteredItem(index);
  };

  const onClearAll = () => {
    inputRef.current.focus();
    props.onClearAllFilter();
  };

  const onSelectTag = (item: IElasticFilterModel, index: number) => {
    setSelectedField(item.field);
    setSearchedValue(item.value);
    setSelectedTagIndex(index);
    setInputValue(`${item.field.label}: ${item.value}`);
    inputRef.current.focus();
  };

  const onChangeOperator = (_item: string, index: number) => {
    props.onChangeOperator(_item, index);
  };

  const onTryLoadData = async (filter: IElasticFilterModel, filterSuffics: ElasticFilterSuffics) => {
    const _param: IParam = props.paramBuilder ? props.paramBuilder({ time_range: props.timePeriod, stitchOnly: props.stitch, filters: [filter], filterSuffics: filterSuffics }) : null;
    await onGetPossibleValues(props.url, userContext.accessToken!, _param);
  };

  return (
    <>
      <ElasticFilterWrapper>
        <ElasticLabel>Filter</ElasticLabel>
        <ClickAwayListener onClickAway={onCloseDropdown}>
          <PopupWrapper>
            <ElasticValueWrapper>
              <Input ref={inputRef} placeholder={props.placeholder ? props.placeholder : ''} value={inputValue || ''} onSearchChange={onSearch} onKeyUp={onKeyUp} />
              <IconsWrapper>
                {loading && <LoadingIndicator width="16px" height="16px" margin="0 0 0 12px" />}
                {inputValue && <IconWrapper styles={{ margin: '0 0 0 12px' }} onClick={onClear} icon={closeSmallIcon} />}
                <IconWrapper onClick={onToogleShow} icon={filterIcon} styles={{ margin: '0 0 0 12px' }} />
              </IconsWrapper>
            </ElasticValueWrapper>
            {showPopup && <Popup loading={loading} selectedField={selectedField} items={popupItems} onSelectItem={onSelect} />}
          </PopupWrapper>
        </ClickAwayListener>
        <Tags items={props.applayedFilterItems} onClearAll={onClearAll} onRemoveTag={onClearFilteredItem} onSelectTag={onSelectTag} onChangeOperator={onChangeOperator} />
      </ElasticFilterWrapper>
    </>
  );
};
export default React.memo(ElasticFilter);
