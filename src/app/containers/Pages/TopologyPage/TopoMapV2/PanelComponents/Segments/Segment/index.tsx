import React from 'react';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { TopologyGroupTypesAsNumber, TopologyGroupTypesAsString, TopologyGroupTypesLabel } from 'lib/models/topology';
import { Content, GroupField, GroupWrapper } from './styles';
import { editIcon } from 'app/components/SVGIcons/edit';
import { dublicateIcon } from 'app/components/SVGIcons/dublicate';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { applicationIcon } from 'app/components/SVGIcons/topologyIcons/application';
import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
import SettingsButton from 'app/components/Buttons/SettingsButton';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';

interface IProps {
  segment: ITopologyGroup;
  onSelectSegment: (group: ITopologyGroup) => void;
  onDublicateSegment: (_group: ITopologyGroup) => void;
  onDeleteSegment: (_group: ITopologyGroup) => void;
  disabled?: boolean;
}

const Segment: React.FC<IProps> = (props: IProps) => {
  const onEdit = () => {
    props.onSelectSegment(props.segment);
  };
  const onDublicate = () => {
    props.onDublicateSegment(props.segment);
  };
  const onDelete = () => {
    props.onDeleteSegment(props.segment);
  };
  return (
    <GroupWrapper>
      {(props.segment.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || props.segment.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) && (
        <IconWrapper
          styles={{ borderRadius: '6px', background: 'var(--_primaryBg)', padding: '6px', boxShadow: '0px 20px 30px rgba(5, 20, 58, 0.05)' }}
          width="46px"
          height="46px"
          icon={ciscoMerakiLogoIcon(46)}
        />
      )}
      {(props.segment.type === TopologyGroupTypesAsNumber.APPLICATION || props.segment.type === TopologyGroupTypesAsString.APPLICATION) && (
        <IconWrapper
          styles={{ borderRadius: '6px', background: 'var(--_primaryBg)', padding: '9px', boxShadow: '0px 20px 30px rgba(5, 20, 58, 0.05)' }}
          width="46px"
          height="46px"
          icon={applicationIcon}
        />
      )}
      <Content>
        <GroupField primary>{props.segment.name}</GroupField>
        {(props.segment.type === TopologyGroupTypesAsNumber.BRANCH_NETWORKS || props.segment.type === TopologyGroupTypesAsString.BRANCH_NETWORKS) && (
          <GroupField>{TopologyGroupTypesLabel.BRANCH_NETWORKS}</GroupField>
        )}
        {(props.segment.type === TopologyGroupTypesAsNumber.APPLICATION || props.segment.type === TopologyGroupTypesAsString.APPLICATION) && (
          <GroupField>{TopologyGroupTypesLabel.APPLICATION}</GroupField>
        )}
      </Content>
      <SettingsButton id={props.segment.id} width="24px" height="40px" hoverIconColor="var(--_hoverButtonBg)" disabled={props.disabled}>
        <PopupContent>
          <PopupItem label="Edit" icon={editIcon} onClick={onEdit} />
          <PopupItem label="Duplicate" icon={dublicateIcon} onClick={onDublicate} />
          <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon()} onClick={onDelete} />
        </PopupContent>
      </SettingsButton>
    </GroupWrapper>
  );
};

export default React.memo(Segment);
