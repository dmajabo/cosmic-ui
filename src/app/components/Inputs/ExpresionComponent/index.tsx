import React from 'react';
import { InputLabel } from '../styles/Label';
import { ExpresionArea, ExpresionPopup, ExpresionPopupItem, ExpresionWrapper, HintMessage } from './styles';
import { ISelectedListItem } from 'lib/models/general';
import { buildExpresion, getValues, onValidationExpr } from './helpers';
import { TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';
import { ClickAwayListener } from '@material-ui/core';
import { DEBOUNCE_TIME } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import getCaretCoordinates from 'textarea-caret';
import { infoIcon } from 'app/components/SVGIcons/infoIcon';
import HintButton from 'app/components/Buttons/HintButton';

interface IProps {
  type: TopologyGroupTypesAsString | TopologyGroupTypesAsNumber | null;
  value: string | null;
  possibleKeys: ISelectedListItem<string>[];
  possibleOperators: ISelectedListItem<string>[];
  possibleJoins: ISelectedListItem<string>[];
  label: JSX.Element | string;
  onChange: (value: string, err?: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  styles?: Object;
  className?: string;
}

const ExpresionComponent: React.FC<IProps> = (props: IProps) => {
  const [defaultValue, setDefaultValue] = React.useState<string | null>(props.value);
  const [values, setValues] = React.useState<ISelectedListItem<string>[] | null>(null);
  const [shouldFocus, setShouldFocus] = React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [currentCaretPosition, setCurrentCaretPosition] = React.useState<number>(null);
  const [pos, setPosition] = React.useState<number>(0);
  const [regKey, setRegKeys] = React.useState<RegExp>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const debouncedSearchTerm = useDebounce(defaultValue, DEBOUNCE_TIME);

  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      const err = onValidationExpr(defaultValue, props.possibleKeys);
      const value = defaultValue ? defaultValue.replace(/"/g, "'") : null;
      props.onChange(value, err);
    }
  }, [debouncedSearchTerm]);

  React.useEffect(() => {
    if (defaultValue !== props.value) {
      setDefaultValue(props.value);
    }
  }, [props.value]);

  React.useEffect(() => {
    let _reg = null;
    if (props.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || props.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) {
      _reg = /^(Name|Model|Serial|Type|NetworkId|PublicIp|Tag)/;
      setRegKeys(_reg);
    } else if (props.type === TopologyGroupTypesAsNumber.APPLICATION || props.type === TopologyGroupTypesAsString.APPLICATION) {
      _reg = /^(Name|ExtId|Tag)/;
      setRegKeys(_reg);
    }
    setDefaultValue(props.value);
  }, [props.type]);

  React.useEffect(() => {
    if (values && values.length) {
      const pos = getCaretCoordinates(inputRef.current);
      if (pos) {
        setPosition(pos.top + 36);
      }
    }
  }, [values]);

  React.useEffect(() => {
    if (shouldFocus && !props.disabled && !props.readOnly) {
      setShouldFocus(false);
      inputRef.current.focus();
    }
  }, [defaultValue]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, selectionStart } = e.target;
    let _str = value;
    if (_str && _str.length && _str.length > 1) {
      const _obj = getValues(props.possibleKeys, props.possibleOperators, props.possibleJoins, value, regKey);
      if (_obj && values !== _obj.values) {
        setValues(_obj.values);
      } else if (!_obj) {
        setValues(null);
      }
    } else if (!_str || (_str && _str.length <= 1)) {
      setValues(null);
    }
    if ((selectionStart || selectionStart === 0) && selectionStart !== currentCaretPosition) {
      setCurrentCaretPosition(selectionStart);
    }
    setIsTyping(true);
    setDefaultValue(_str);
  };

  const onAddValue = (item: ISelectedListItem<string>) => {
    if (props.possibleOperators.find(it => it.value === item.value)) {
      const _expr = buildExpresion(defaultValue, null, item.value, null, currentCaretPosition);
      setValues(null);
      setShouldFocus(true);
      setIsTyping(true);
      setCurrentCaretPosition(_expr.length);
      setDefaultValue(_expr);
      return;
    }
    if (props.possibleJoins.find(it => it.value === item.value)) {
      const _expr = buildExpresion(defaultValue, null, null, item.value, currentCaretPosition);
      setValues(null);
      setShouldFocus(true);
      setIsTyping(true);
      setCurrentCaretPosition(_expr.length);
      setDefaultValue(_expr);
      return;
    }
    const _expr = buildExpresion(defaultValue, item.value, null, null, currentCaretPosition);
    const _obj = getValues(props.possibleKeys, props.possibleOperators, props.possibleJoins, _expr, regKey);
    if (_obj && _obj.values) {
      setValues(_obj.values);
    } else {
      setValues(null);
    }
    setShouldFocus(true);
    setIsTyping(true);
    setCurrentCaretPosition(_expr.length);
    setDefaultValue(_expr);
  };

  const onHideValues = () => {
    setValues(null);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const setCaretPosition = e => {
    if (e && e.target && e.target.selectionStart) {
      setCurrentCaretPosition(Number(e.target.selectionStart));
    }
  };

  return (
    <>
      <ExpresionWrapper style={props.styles} className={`${props.className} ${isFocused ? 'focused' : ''}`}>
        <InputLabel disabled={props.disabled || props.readOnly}>
          {props.label}
          <HintButton icon={infoIcon} disabled={props.disabled || props.readOnly} width="12px" height="12px" arrow iconStyles={{ lineHeight: '12px', margin: '0 0 0 6px', border: 'none' }}>
            <HintMessage>Example 1: Name=~'somename'</HintMessage>
            <HintMessage>Example 2: Name=='somename' || Model=='somemodel'</HintMessage>
            <HintMessage>{`Example 3: Name=='somename' || Serial=='someserial' && Tag=='sometag'`}</HintMessage>
          </HintButton>
        </InputLabel>
        <ExpresionArea
          id={`expresionRow`}
          ref={inputRef}
          value={defaultValue || ''}
          disabled={props.disabled}
          readOnly={props.readOnly}
          onChange={onChange}
          onKeyUp={setCaretPosition}
          onFocus={onFocus}
          onBlur={onBlur}
        ></ExpresionArea>
        {values && (
          <ClickAwayListener onClickAway={onHideValues}>
            <ExpresionPopup y={pos ? pos : 0}>
              {values.map(it => (
                <ExpresionPopupItem onClick={() => onAddValue(it)} key={`expresionPossibleValues${it.id}`}>
                  {it.label}
                </ExpresionPopupItem>
              ))}
            </ExpresionPopup>
          </ClickAwayListener>
        )}
      </ExpresionWrapper>
    </>
  );
};

export default React.memo(ExpresionComponent);
