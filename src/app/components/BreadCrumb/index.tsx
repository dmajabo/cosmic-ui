import React from 'react';
import { Breadcrumbs } from '@mui/material';
import IconWrapper from '../Buttons/IconWrapper';
import { separatorIcon } from '../SVGIcons/separatorIcon';
import BreadCrumbItem from './BreadCrumbItem';
import { BreadcrumbsWrapper } from './styles';
interface Props {
  startItem?: any;
  items: any[];
  onClick: (to: any) => void;
}

const BreadCrumb: React.FC<Props> = (props: Props) => {
  return (
    <BreadcrumbsWrapper>
      <Breadcrumbs aria-label="breadcrumb" separator={<IconWrapper styles={{ margin: 'auto 0' }} width="8px" height="10px" icon={separatorIcon} />}>
        {props.startItem && <BreadCrumbItem highlight item={props.startItem} onClick={props.onClick} />}
        {props.items.map((it, i) => (
          <BreadCrumbItem key={`breadCrumbItem${i}${it}`} item={it} onClick={props.onClick} />
        ))}
      </Breadcrumbs>
    </BreadcrumbsWrapper>
  );
};
export default React.memo(BreadCrumb);
