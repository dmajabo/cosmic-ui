import React from 'react';
import { Side, Wrapper } from './styles';
import { entitiesIcon } from 'app/components/SVGIcons/entities';
import { editIcon } from 'app/components/SVGIcons/edit';
import { TopologyPanelTypes, ITopologySelectTypes, TOPOLOGY_SELECT_VALUES } from 'lib/models/topology';
import { useTopologyDataContext } from 'lib/hooks/useTopologyDataContext';
import { ISelectedListItem } from 'lib/models/general';
import IconButton from 'app/components/Buttons/IconButton';
import { refreshIcon } from 'app/components/SVGIcons/refresh';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import MatSelect from 'app/components/Inputs/MatSelect';

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
        <MatSelect
          styles={{ display: 'flex', alignItems: 'center', minWidth: '260px', maxWidth: '400px', height: '40px', minHeight: '40px' }}
          labelStyles={{ flexShrink: 0, margin: '0 8px 0 0', textTransform: 'none' }}
          id="edge_metric"
          labelBefore="Edge metric"
          value={topology && topology.selectedType ? topology.selectedType : TOPOLOGY_SELECT_VALUES[0]}
          options={TOPOLOGY_SELECT_VALUES}
          onChange={onSelect}
        />
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
