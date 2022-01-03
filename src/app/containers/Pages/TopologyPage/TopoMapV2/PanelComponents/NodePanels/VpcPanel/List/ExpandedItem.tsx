import React from 'react';
import { IApplication_Group } from 'lib/models/topology';
import { GroupWrapper, Label, GroupWrapStyles } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import Collapse from '@mui/material/Collapse';
import { applicationGroupIcon } from 'app/components/SVGIcons/topologyIcons/applicationGroup';
import VmItem from './VmItem';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { INetworkVM } from 'lib/api/ApiModels/Topology/apiModels';
import { CollapseStyles } from './CollapseStyle';

interface Props {
  dataItem: IApplication_Group;
  onClickVm: (_item: INetworkVM) => void;
}

const ExpandedItem: React.FC<Props> = (props: Props) => {
  const [checked, setChecked] = React.useState(props.dataItem.expanded);
  const classes = CollapseStyles();
  const handleChange = () => {
    setChecked(prev => !prev);
  };
  const onSelectVm = (_item: INetworkVM) => {
    props.onClickVm(_item);
  };
  return (
    <>
      <Collapse className={classes.root} orientation="vertical" in={checked} collapsedSize={50}>
        <GroupWrapper>
          <GroupWrapStyles onClick={handleChange}>
            <IconWrapper icon={applicationGroupIcon} width="20px" height="20px" styles={{ margin: '0 12px 0 0' }} />
            <Label>{props.dataItem.name}</Label>
            <IconWrapper classes={checked ? 'arrowTop' : 'arrow'} icon={arrowBottomIcon} width="12px" height="12px" styles={{ margin: '0 0 0 8px' }} />
          </GroupWrapStyles>
          {props.dataItem.items.map(it => (
            <VmItem key={`panelListItem${it.id}`} dataItem={it as INetworkVM} onClick={onSelectVm} />
          ))}
        </GroupWrapper>
      </Collapse>
    </>
  );
};

export default React.memo(ExpandedItem);
