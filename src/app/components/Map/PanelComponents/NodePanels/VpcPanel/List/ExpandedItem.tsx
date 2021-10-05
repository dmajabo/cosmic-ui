import React from 'react';
import { IApplication_Group, IVm } from 'lib/models/topology';
import { Label, VmWrapStyles } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import Collapse from '@mui/material/Collapse';
import { applicationGroupIcon } from 'app/components/SVGIcons/topologyIcons/applicationGroup';
import VmItem from './VmItem';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const CollapseStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        width: 'calc(100% - 20px)',
        margin: '0 0 0 20px',
        fontFamily: 'DMSans',
      },
    }),
  {
    index: 1,
  },
);
interface Props {
  dataItem: IApplication_Group;
  onClickVm: (_item: IVm) => void;
}

const ExpandedItem: React.FC<Props> = (props: Props) => {
  const [checked, setChecked] = React.useState(false);
  const classes = CollapseStyles();
  const handleChange = () => {
    setChecked(prev => !prev);
  };
  const onSelectVm = (_item: IVm) => {
    props.onClickVm(_item);
  };
  return (
    <>
      <VmWrapStyles onClick={handleChange}>
        <IconWrapper icon={applicationGroupIcon} width="20px" height="20px" styles={{ margin: '0 12px 0 0' }} />
        <Label>{props.dataItem.name}</Label>
      </VmWrapStyles>
      <Collapse className={classes.root} orientation="vertical" in={checked}>
        <>
          {props.dataItem.items.map(it => (
            <VmItem key={`panelListItem${it.id}`} dataItem={it as IVm} onClick={onSelectVm} />
          ))}
        </>
      </Collapse>
    </>
  );
};

export default React.memo(ExpandedItem);
