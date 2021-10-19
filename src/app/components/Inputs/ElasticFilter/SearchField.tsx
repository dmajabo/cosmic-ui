import React from 'react';
import { ElasticValueWrapper, IconsWrapper, SearchFieldInput } from './styles';
import { ISelectedListItem } from 'lib/models/general';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { filterIcon } from 'app/components/SVGIcons/filter';
import DisplayValue from './DisplayValue';

interface Props {
  selectedField: ISelectedListItem<string>;
  placeholder?: string;
  onClear: () => void;
  onOpenPopup: () => void;
}
const SearchField = React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const [searchTerm, setSearchTerm] = React.useState<string>(null);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClear = () => {
    props.onClear();
  };
  const onOpenPopup = () => {
    props.onOpenPopup();
  };
  const onInputClick = () => {
    if (props.selectedField || searchTerm) return;
    props.onOpenPopup();
  };
  return (
    <ElasticValueWrapper>
      <DisplayValue onClick={onOpenPopup} item={props.selectedField} />
      <SearchFieldInput onClick={onInputClick} readOnly={!props.selectedField} ref={ref} placeholder={props.placeholder} value={searchTerm || ''} onChange={onSearch} />
      <IconsWrapper>
        {props.selectedField && <IconWrapper onClick={onClear} icon={closeSmallIcon} />}
        <IconWrapper onClick={onOpenPopup} icon={filterIcon} styles={{ margin: '0 0 0 12px' }} />
      </IconsWrapper>
    </ElasticValueWrapper>
  );
});
export default React.memo(SearchField);
