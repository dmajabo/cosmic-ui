import React from 'react';
import { ISegmentExternalSegMatchRuleP } from 'lib/api/ApiModels/Policy/Segment';
import { Validator } from 'ip-num/Validator';
import TextInput from 'app/components/Inputs/TextInput';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { RuleInputsWrapper, RuleWrapper } from '../styles';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { useDebounce } from 'use-debounce';
import IconWrapper from 'app/components/Buttons/IconWrapper';

interface Props {
  data: ISegmentExternalSegMatchRuleP;
  index: number;
  onChange: (rule: ISegmentExternalSegMatchRuleP, index: number) => void;
  onRemoveRule: (rule: ISegmentExternalSegMatchRuleP, index: number) => void;
}

const ExternalRule: React.FC<Props> = (props: Props) => {
  const [item, setItem] = React.useState<ISegmentExternalSegMatchRuleP>(props.data);
  const [error, setError] = React.useState<string>(null);
  const [value] = useDebounce(item.matchValue, 500);

  React.useEffect(() => {
    if (value) {
      props.onChange(item, props.index);
    }
  }, [value]);
  const onChangeValue = (value: string | null) => {
    const validObj: [boolean, string[]] = Validator.isValidIPv4CidrNotation(value);
    if (validObj && validObj.length) {
      if (!validObj[0] && validObj[1] && validObj[1].length && validObj[1][0].length) {
        setError(validObj[1][0]);
      } else if (!validObj[0] && (!validObj[1] || !validObj[1].length || !validObj[1][0].length)) {
        setError('Something incorrect');
      }
      if (validObj[0]) {
        setError(null);
      }
    } else if (error) {
      setError(null);
    }
    setItem({ ...item, matchValue: value });
  };

  const onRemoveRule = () => {
    props.onRemoveRule(props.data, props.index);
  };
  return (
    <RuleWrapper>
      <RuleInputsWrapper>
        <TextInput
          id={`${props.index}extMatchValueType`}
          name="extMatchKey"
          value={item.matchValue}
          label="IP"
          onChange={onChangeValue}
          disabled={!item.matchKey}
          styles={{ height: '72px', minHeight: '72px', width: 'calc(100% - 50px)', margin: '0' }}
          placeholder="10.0.0.0/0"
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

export default React.memo(ExternalRule);
