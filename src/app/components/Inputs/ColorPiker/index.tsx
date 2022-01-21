import { Popover } from '@mui/material';
import { DEBOUNCE_TIME } from 'lib/constants/general';
import useDebounce from 'lib/hooks/useDebounce';
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { Required } from '../FormTextInput/styles';
import { InputLabel } from '../styles/Label';
import { TextInputWrapper } from '../TextInput/styles';
import ColorSchema from './ColorSchema';
import { PoperStyles } from './PoperStyles';
import { Paper, PreviewColor, PreviewWrapper } from './styles';
interface Props {
  id: string;
  label?: string;
  color: string;
  colorSchema?: string[][];
  styles?: Object;
  required?: boolean;
  labelStyles?: Object;
  onChange: (v: string) => void;
}

const ColorPiker: React.FC<Props> = (props: Props) => {
  const [color, setColor] = React.useState<string>(props.color || '');
  const [isOpen, setOpenPopup] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = React.useState(false);
  const poperStyles = PoperStyles();

  const debouncedSearchTerm = useDebounce(color, DEBOUNCE_TIME);
  React.useEffect(() => {
    if ((debouncedSearchTerm || debouncedSearchTerm === '' || debouncedSearchTerm === null) && isTyping) {
      setIsTyping(false);
      if (props.onChange) {
        props.onChange(color);
      }
    }
  }, [debouncedSearchTerm]);

  React.useEffect(() => {
    if (props.color !== color) {
      setColor(color);
    }
  }, [props.color]);

  const onChange = (v: string) => {
    setColor(v);
    setIsTyping(true);
  };

  const onQuickSelect = (v: string) => {
    onClose();
    setColor(v);
    setIsTyping(true);
  };

  const onOpenPopup = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopup(true);
  };

  const onClose = () => {
    setAnchorEl(null);
    setOpenPopup(false);
  };

  return (
    <TextInputWrapper style={props.styles}>
      {props.label && (
        <InputLabel style={props.labelStyles} htmlFor={props.id}>
          {props.label}
          {props.required && <Required>*</Required>}
        </InputLabel>
      )}
      <PreviewWrapper onClick={e => onOpenPopup(e)}>
        <PreviewColor color={color} />
      </PreviewWrapper>
      <Popover
        id="color-piker"
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{ root: poperStyles.root, paper: poperStyles.paper }}
      >
        <Paper>
          <HexColorPicker color={props.color} onChange={onChange} />
          {props.colorSchema && props.colorSchema.length ? <ColorSchema id={props.id} schema={props.colorSchema} onClick={onQuickSelect} /> : null}
        </Paper>
      </Popover>
    </TextInputWrapper>
  );
};

export default React.memo(ColorPiker);
