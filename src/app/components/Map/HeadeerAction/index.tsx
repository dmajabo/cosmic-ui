import React from 'react';
import { Side, Wrapper } from './styles';
import { entitiesIcon } from 'app/components/SVGIcons/entities';
import { editIcon } from 'app/components/SVGIcons/edit';
import { TopologyPanelTypes, ITopologySelectTypes, TOPOLOGY_SELECT_VALUES } from 'lib/models/topology';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import Dropdown from 'app/components/Inputs/Dropdown';
import { ISelectedListItem } from 'lib/models/general';
import IconButton from 'app/components/Buttons/IconButton';
import { refreshIcon } from 'app/components/SVGIcons/refresh';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';

interface IProps {
  onRefresh: () => void;
  onShowPanel: (panel: TopologyPanelTypes) => void;
}

const HeadeerAction: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyDataContext();

  const onClick = (panel: TopologyPanelTypes) => {
    props.onShowPanel(panel);
  };

  // const onFilter = (value: string | null) => {
  //   topology?.onFilterQueryChange(value);
  // };

  const onSelect = (_item: ISelectedListItem<ITopologySelectTypes>) => {
    topology?.onSetSelectedType(_item.id);
  };

  return (
    <Wrapper>
      <Side margin="0 auto 0 0">
        <Dropdown label="Edge metric" selectedValue={topology?.selectedType || null} values={TOPOLOGY_SELECT_VALUES} onSelectValue={onSelect} />
      </Side>
      <Side margin="0 0 0 auto">
        <IconButton styles={{ margin: '0' }} icon={refreshIcon} title="Zoom in" onClick={props.onRefresh} />
        <SecondaryButton withoutBorder label="ENTITIES" icon={entitiesIcon} onClick={() => onClick(TopologyPanelTypes.ENTITIES)} disabled={false} styles={{ margin: '0 0 0 20px' }} />
        {/* <Filter onChange={onFilter} searchQuery={topology?.searchQuery || ''} /> */}
        <SecondaryButton withoutBorder label="Edit Topology" icon={editIcon} onClick={() => onClick(TopologyPanelTypes.GROUPS)} disabled={false} styles={{ margin: '0 0 0 20px' }} />
      </Side>
    </Wrapper>
  );
};

export default React.memo(HeadeerAction);
