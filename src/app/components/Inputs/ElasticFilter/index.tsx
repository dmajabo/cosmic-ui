import React from 'react';
import { ElasticFilterWrapper, ElasticLabel, ElasticValueWrapper, IconsWrapper, PopupWrapper, SearchFieldInput } from './styles';
import { ClickAwayListener } from '@mui/material';
import Popup from './Popup';
import Tags from './Tags';
import { useGet } from 'lib/api/http/useAxiosHook';
import useDebounce from 'lib/hooks/useDebounce';
import { KEYBOARD_KEYS } from 'lib/constants/general';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { filterIcon } from 'app/components/SVGIcons/filter';
import { getSearchedFields, ISearchData } from './helper';
import { ElasticFilterSuffics, IElasticField, IElasticFilterModel } from 'lib/models/elastic';
import { IParam, SESSIONS_TIME_RANGE_QUERY_TYPES } from 'lib/api/ApiModels/paramBuilders';
import { UserContextState, UserContext } from 'lib/Routes/UserProvider';
import LoadingIndicator from 'app/components/Loading';
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
  onMapRes?: (res: any) => void;
  onRefresh?: () => void;
  paramBuilder?: any;
}

const ElasticFilter: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { loading, response, onGet: onGetPossibleValues } = useGet<any>();
  const [popupItems, setPopupItems] = React.useState<IElasticField[]>([]);
  // const [resItems, setResItems] = React.useState<string[]>([]);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [selectedField, setSelectedField] = React.useState<IElasticField>(null);
  const [searchedValue, setSearchedValue] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState<string>('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [selectedTagIndex, setSelectedTagIndex] = React.useState<number>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(searchedValue, 1000);

  React.useEffect(() => {
    if (inputValue) {
      const _arr = inputValue.split(':');
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
      setShowPopup(true);
    } else {
      if (showPopup) {
        setShowPopup(false);
        setPopupItems(props.fields);
      }
    }
  }, [inputValue]);

  React.useEffect(() => {
    if (inputValue) {
      setIsTyping(false);
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
        onTryLoadData({ field: selectedField, value: searchedValue }, ElasticFilterSuffics.AUTOCOMPLETE);
      }
    }
  }, [debouncedSearchTerm]);

  React.useEffect(() => {
    if (response) {
      console.log(props.onMapRes(response));
      props.onLoadDataEnd(response);
    }
  }, [response]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    setIsTyping(true);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER.key && selectedField && searchedValue) {
      setSelectedField(null);
      setSearchedValue(null);
      setPopupItems(props.fields);
      setInputValue('');
      setSelectedTagIndex(null);
      if (selectedTagIndex || selectedTagIndex === 0) {
        props.onUpdateFilter({ field: selectedField, value: searchedValue }, selectedTagIndex);
      } else {
        props.onAddFilter({ field: selectedField, value: searchedValue });
      }
    }
  };

  const onToogleShow = () => {
    if (props.disabled) return;
    if (!selectedField) {
      setShowPopup(true);
      setPopupItems(props.fields);
      return;
    }
    setShowPopup(true);
    setPopupItems(props.fields);
  };

  const onCloseDropdown = () => {
    setShowPopup(false);
  };

  const onClear = () => {
    setShowPopup(false);
    setPopupItems([]);
    setSelectedField(null);
    setSearchedValue('');
    setInputValue('');
    props.onRefresh();
  };

  const onSelect = (item: IElasticField | string) => {
    if (typeof item === 'string') {
      onSelectValue(item);
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
    onTryLoadData({ field: item, value: _arr[1].trim() }, ElasticFilterSuffics.AUTOCOMPLETE);
    inputRef.current.focus();
  };

  const onSelectValue = (item: string) => {
    setShowPopup(false);
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
              <SearchFieldInput
                ref={inputRef}
                placeholder={props.placeholder && !selectedField && !searchedValue ? props.placeholder : ''}
                value={inputValue || ''}
                onChange={onSearch}
                onKeyUp={onKeyUp}
              />
              <IconsWrapper>
                {loading && <LoadingIndicator width="16px" height="16px" margin="0 0 0 12px" />}
                {inputValue && <IconWrapper styles={{ margin: '0 0 0 12px' }} onClick={onClear} icon={closeSmallIcon} />}
                <IconWrapper onClick={onToogleShow} icon={filterIcon} styles={{ margin: '0 0 0 12px' }} />
              </IconsWrapper>
            </ElasticValueWrapper>
            {showPopup && (
              <Popup
                // loading={loading}
                selectedField={selectedField}
                items={popupItems}
                onSelectItem={onSelect}
              />
            )}
          </PopupWrapper>
        </ClickAwayListener>
        <Tags items={props.applayedFilterItems} onClearAll={onClearAll} onRemoveTag={onClearFilteredItem} onSelectTag={onSelectTag} onChangeOperator={onChangeOperator} />
      </ElasticFilterWrapper>
    </>
  );
};
export default React.memo(ElasticFilter);
