import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import IconWrapper from '../Buttons/IconWrapper';
import { separatorIcon } from '../SVGIcons/separatorIcon';
import BreadCrumbItem from './BreadCrumbItem';
interface Props {
  startItem?: any;
  items: any[];
  onClick: (to: any) => void;
}

const BreadCrumb: React.FC<Props> = (props: Props) => {
  return (
    <Breadcrumbs
      sx={{ margin: 'auto 20px', padding: '8px 0 0 0', lineHeight: '0' }}
      aria-label="breadcrumb"
      separator={<IconWrapper styles={{ margin: 'auto 0 0 0' }} width="8px" height="10px" icon={separatorIcon} />}
    >
      {props.startItem && <BreadCrumbItem highlight item={props.startItem} onClick={props.onClick} />}
      {props.items.map((it, i) => (
        <BreadCrumbItem key={`breadCrumbItem${i}${it}`} item={it} onClick={props.onClick} />
      ))}
    </Breadcrumbs>
  );
};
export default React.memo(BreadCrumb);
