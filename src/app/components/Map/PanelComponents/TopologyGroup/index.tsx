import React from 'react';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { ITopologyGroup, TopologyGroupTypesAsNumber, TopologyGroupTypesAsString } from 'lib/models/topology';
import { ButtonStyles, Content, GroupField, GroupWrapper, PopupContent } from './styles';
import { settingsDotsIcon } from 'app/components/SVGIcons/settingsDots';
import Popover from '@material-ui/core/Popover';
import PopupItem from './PopupItem';
import { editTopologyIcon } from 'app/components/SVGIcons/edit';
import { dublicateIcon } from 'app/components/SVGIcons/dublicate';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { applicationIcon } from 'app/components/SVGIcons/topologyIcons/application';

interface IProps {
  group: ITopologyGroup;
  onSelectGroup: (group: ITopologyGroup) => void;
  onDublicateGroup: (_group: ITopologyGroup) => void;
  onDeleteGroup: (_group: ITopologyGroup) => void;
  disabled?: boolean;
}

const TopologyGroup: React.FC<IProps> = (props: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (props.disabled) {
      return;
    }
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setShowPopup(!showPopup);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowPopup(false);
  };
  const onEdit = () => {
    handleClose();
    props.onSelectGroup(props.group);
  };
  const onDublicate = () => {
    handleClose();
    props.onDublicateGroup(props.group);
  };
  const onDelete = () => {
    handleClose();
    props.onDeleteGroup(props.group);
  };
  return (
    <GroupWrapper>
      {(props.group.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || props.group.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) && (
        <IconWrapper
          styles={{ borderRadius: '6px', background: 'var(--_primaryBg)', padding: '6px', boxShadow: '0px 20px 30px rgba(5, 20, 58, 0.05)' }}
          width="46px"
          height="46px"
          icon={ciscoMerakiLogoIcon(46)}
        />
      )}
      {(props.group.type === TopologyGroupTypesAsNumber.APPLICATION || props.group.type === TopologyGroupTypesAsString.APPLICATION) && (
        <IconWrapper
          styles={{ borderRadius: '6px', background: 'var(--_primaryBg)', padding: '9px', boxShadow: '0px 20px 30px rgba(5, 20, 58, 0.05)' }}
          width="46px"
          height="46px"
          icon={applicationIcon}
        />
      )}
      <Content>
        <GroupField primary>{props.group.name}</GroupField>
        <GroupField>{props.group.type}</GroupField>
      </Content>
      <ButtonStyles
        width="24px"
        height="40px"
        disabled={props.disabled}
        onClick={handleClick}
        hoverIconColor="var(--_hoverButtonBg)"
        className={`${showPopup ? 'active' : ''}`}
        aria-describedby={`${props.group.id || ''}poper`}
        type="button"
      >
        <IconWrapper icon={settingsDotsIcon} />
      </ButtonStyles>
      <Popover
        id={`${props.group.id || ''}poper`}
        open={showPopup}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className="buttonPopup"
      >
        <PopupContent>
          <PopupItem label="Edit" icon={editTopologyIcon} onClick={onEdit} />
          <PopupItem label="Duplicate" icon={dublicateIcon} onClick={onDublicate} />
          <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon} onClick={onDelete} />
        </PopupContent>
      </Popover>
    </GroupWrapper>
  );
};

export default React.memo(TopologyGroup);
