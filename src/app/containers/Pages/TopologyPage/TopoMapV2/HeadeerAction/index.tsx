import React from 'react';
import { Side, Wrapper, ZoomValue } from './styles';
import { entitiesIcon } from 'app/components/SVGIcons/entities';
import { editIcon } from 'app/components/SVGIcons/edit';
import {
  TopologyPanelTypes,
  // ITopologySelectTypes, TOPOLOGY_SELECT_VALUES,
} from 'lib/models/topology';
// import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
// import { ISelectedListItem } from 'lib/models/general';
import IconButton from 'app/components/Buttons/IconButton';
import { refreshIcon } from 'app/components/SVGIcons/refresh';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { zoomCenterIcon, zoomFullScreenIcon, zoomInIcon, zoomOutFullScreenMode, zoomOutIcon } from 'app/components/SVGIcons/zoom';
// import MatSelect from 'app/components/Inputs/MatSelect';

interface IProps {
  zoomValue: number;
  isFullScreen: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCentered: () => void;
  onOpenFullScreen: () => void;
  onRefresh: () => void;
  onShowPanel: (panel: TopologyPanelTypes) => void;
}

const HeadeerAction: React.FC<IProps> = (props: IProps) => {
  // const { topology } = useTopologyDataContext();

  const onClick = (panel: TopologyPanelTypes) => {
    props.onShowPanel(panel);
  };

  // const onFilter = (value: string | null) => {
  //   topology?.onFilterQueryChange(value);
  // };

  // const onSelect = (_item: ISelectedListItem<ITopologySelectTypes>) => {
  //   topology?.onSetSelectedType(_item.id);
  // };

  const onOpenFullScreen = () => {
    props.onOpenFullScreen();
  };

  return (
    <Wrapper>
      <Side margin="0 auto 0 0">
        <IconButton iconStyles={{ verticalAlign: 'middle', height: '4px' }} styles={{ margin: '0 8px 0 0' }} icon={zoomOutIcon} title="Zoom out" onClick={props.onZoomOut} />
        <ZoomValue>{props.zoomValue} %</ZoomValue>
        <IconButton styles={{ margin: '0 20px 0 8px' }} icon={zoomInIcon} title="Zoom in" onClick={props.onZoomIn} />
        <IconButton styles={{ margin: '0 20px 0 0' }} icon={zoomCenterIcon} title="Center" onClick={props.onCentered} />
        <IconButton
          styles={{ margin: '0' }}
          icon={props.isFullScreen ? zoomOutFullScreenMode : zoomFullScreenIcon}
          title={props.isFullScreen ? 'Close fullscreen mode' : 'Open fullscreen mode'}
          onClick={onOpenFullScreen}
        />
      </Side>
      <Side margin="0 0 0 auto">
        <IconButton styles={{ margin: '0' }} icon={refreshIcon} title="Refresh Topology" onClick={props.onRefresh} />
        <SecondaryButton label="ENTITIES" icon={entitiesIcon} onClick={() => onClick(TopologyPanelTypes.ENTITIES)} disabled={false} styles={{ margin: '0 0 0 20px' }} />
        {/* <Filter onChange={onFilter} searchQuery={topology?.searchQuery || ''} /> */}
        <SecondaryButton label="Edit Topology" icon={editIcon} onClick={() => onClick(TopologyPanelTypes.GROUPS)} disabled={false} styles={{ margin: '0 0 0 20px' }} />
      </Side>
    </Wrapper>
  );
};

export default React.memo(HeadeerAction);
