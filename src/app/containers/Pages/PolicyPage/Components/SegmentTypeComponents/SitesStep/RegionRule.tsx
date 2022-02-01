import React from 'react';
import { ISegmentSiteSegmentMatchRuleP } from 'lib/api/ApiModels/Policy/Segment';
import TextInput from 'app/components/Inputs/TextInput';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { RuleInputsWrapper, RuleWrapper } from '../../styles';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { useDebounce } from 'use-debounce';
import IconWrapper from 'app/components/Buttons/IconWrapper';

interface Props {
  data: ISegmentSiteSegmentMatchRuleP;
  index: number;
  onChange: (rule: ISegmentSiteSegmentMatchRuleP, index: number) => void;
  onRemoveRule: (rule: ISegmentSiteSegmentMatchRuleP, index: number) => void;
}

const RegionRule: React.FC<Props> = (props: Props) => {
  const [item, setItem] = React.useState<ISegmentSiteSegmentMatchRuleP>(props.data);
  const [error, setError] = React.useState<string>(null);
  const [value] = useDebounce(item.matchValuePrimary, 500);

  React.useEffect(() => {
    if (value) {
      props.onChange(item, props.index);
    }
  }, [value]);
  const onChangeValue = (value: string | null) => {
    if (!value || !value.length) {
      setError(`Region name can't be empty`);
    } else if (error) {
      setError(null);
    }
    setItem({ ...item, matchValuePrimary: value });
  };

  const onRemoveRule = () => {
    props.onRemoveRule(props.data, props.index);
  };
  return (
    <RuleWrapper>
      <RuleInputsWrapper>
        <TextInput
          id={`${props.index}siteMatchValueType`}
          name="siteMatchKey"
          value={item.matchValuePrimary}
          label="Region Name"
          onChange={onChangeValue}
          disabled={!item.matchKey}
          styles={{ height: '72px', minHeight: '72px', width: 'calc(100% - 50px)', margin: '0' }}
          placeholder="name"
          required
          inputStyles={{ height: '50px' }}
        />
        <span onClick={onRemoveRule} style={{ margin: 'auto 0 0 20px', width: '30px', height: '50px', display: 'inline-flex', flexShrink: 0 }}>
          <IconWrapper icon={deleteIcon()} styles={{ margin: 'auto' }} width="24px" height="24px" />
        </span>
      </RuleInputsWrapper>
      {error && (
        <ErrorMessage margin="20px auto 20px 0" textAlign="left">
          {error}
        </ErrorMessage>
      )}
    </RuleWrapper>
  );
};

export default React.memo(RegionRule);
