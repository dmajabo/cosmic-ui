import React from 'react';
// import { Input, Wrapper } from './styles';
// import IconWrapper from 'app/components/Buttons/IconWrapper';
// import { filterIcon } from 'app/components/SVGIcons/filter';
// import { Popover } from '@material-ui/core';

interface IProps {
  onChange: (e: any, value: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
  items: any[];
  styles?: Object;
}

const Filter: React.FC<IProps> = (props: IProps) => {
  // const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null);
  // const [textValue, setTextValue] = React.useState<string>('');

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setTextValue(value);
  // };

  // const handleClick = (event: any) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;
  return null;
  // return (
  //   <>
  //     <Wrapper style={props.styles} aria-describedby={id}>
  //       <Input onFocus={handleClick} type="text" value={textValue} onChange={onChange} disabled={props.disabled} placeholder={props.placeholder || 'Search Filter'} />
  //       <IconWrapper onClick={handleClick} styles={{ position: 'absolute', right: '8px', top: 'calc(50% - 8px)' }} icon={filterIcon} />
  //     </Wrapper>
  //     <Popover
  //       id={id}
  //       open={open}
  //       anchorEl={anchorEl}
  //       onClose={handleClose}
  //       anchorOrigin={{
  //         vertical: 'bottom',
  //         horizontal: 'left',
  //       }}
  //     >
  //       <>The content of the Popover.</>
  //     </Popover>
  //   </>
  // );
};

export default React.memo(Filter);
