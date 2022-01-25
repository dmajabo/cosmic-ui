import React from 'react';
import { Side, Wrapper } from './styles';
// import { ISelectedListItem } from 'lib/models/general';
import IconButton from 'app/components/Buttons/IconButton';
import { refreshIcon } from 'app/components/SVGIcons/refresh';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { zoomInIcon, zoomOutIcon } from 'app/components/SVGIcons/zoom';
import { filterIcon } from 'app/components/SVGIcons/filter';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { TopologyPanelTypes } from 'lib/hooks/Topology/models';
import { ITransform, ZoomRange } from 'lib/models/general';
import ZoomInput from './ZoomInput';
import { segmentsIcon } from 'app/components/SVGIcons/segmentsIcon';
import history from 'utils/history';
import { ROUTE } from 'lib/Routes/model';
// import MatSelect from 'app/components/Inputs/MatSelect';

interface IProps {
  disabledReload: boolean;
  onlyRefreshAvaible: boolean;
  transform: ITransform;
  isFullScreen: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomChange: (v: number) => void;
  // onCentered: (nodes: (ITopoAccountNode | ITopoSitesNode | ITopoRegionNode)[]) => void;
  // onOpenFullScreen: () => void;
  onRefresh: () => void;
}

const HeadeerAction: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const onClick = (panel: TopologyPanelTypes) => {
    topology.onToogleTopoPanel(panel, true);
  };
  const onGoToSegments = () => {
    history.push(ROUTE.app + ROUTE.policy);
  };
  // const onFilter = (value: string | null) => {
  //   topology?.onFilterQueryChange(value);
  // };

  // const onSelect = (_item: ISelectedListItem<ITopologySelectTypes>) => {
  //   topology?.onSetSelectedType(_item.id);
  // };

  // const onOpenFullScreen = () => {
  //   props.onOpenFullScreen();
  // };

  // const onCentered = () => {
  //   props.onCentered(topology.nodes);
  // };

  return (
    <Wrapper>
      <Side margin="0 auto 0 0">
        {!props.onlyRefreshAvaible && (
          <>
            <IconButton
              iconStyles={{ verticalAlign: 'middle', height: '4px' }}
              styles={{ margin: '0 10px 0 0', width: '40px', height: '40px' }}
              icon={zoomOutIcon}
              title="Zoom out"
              onClick={props.onZoomOut}
            />
            <ZoomInput value={props.transform} min={ZoomRange.min} max={ZoomRange.max} onChange={props.onZoomChange} />
            <IconButton styles={{ margin: '0 20px 0 10px', width: '40px', height: '40px' }} icon={zoomInIcon} title="Zoom in" onClick={props.onZoomIn} />
            {/* <IconButton styles={{ margin: '0 20px 0 0' }} icon={zoomCenterIcon} title="Center" onClick={onCentered} /> */}
            {/* <IconButton
              styles={{ margin: '0' }}
              icon={props.isFullScreen ? zoomOutFullScreenMode : zoomFullScreenIcon}
              title={props.isFullScreen ? 'Close fullscreen mode' : 'Open fullscreen mode'}
              onClick={onOpenFullScreen}
            /> */}
          </>
        )}
      </Side>
      <Side margin="0 0 0 auto">
        <IconButton disabled={props.disabledReload} styles={{ margin: '0', width: '40px', height: '40px' }} icon={refreshIcon} title="Refresh Topology" onClick={props.onRefresh} />
        {!props.onlyRefreshAvaible && (
          <>
            <SecondaryButton label="FILTER" icon={filterIcon} onClick={() => onClick(TopologyPanelTypes.FILTERS)} disabled={false} styles={{ margin: '0 0 0 20px' }} height="40px" />
            <SecondaryButton label="Segments" icon={segmentsIcon} onClick={onGoToSegments} disabled={false} styles={{ margin: '0 0 0 20px' }} height="40px" />
            {/* <Filter onChange={onFilter} searchQuery={topology?.searchQuery || ''} /> */}
            {/* <SecondaryButton label="Edit Topology" icon={editIcon} onClick={() => onClick(TopologyPanelTypes.SEGMENTS)} disabled={false} styles={{ margin: '0 0 0 20px' }} /> */}
          </>
        )}
      </Side>
    </Wrapper>
  );
};

export default React.memo(HeadeerAction);
