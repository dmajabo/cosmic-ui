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
              styles={{ display: 'inline-flex', margin: '0 10px 0 0', width: '30px', height: '30px' }}
              iconStyles={{ margin: 'auto', width: '12px', height: '12px' }}
              icon={zoomInIcon}
              title="Zoom in"
              onClick={props.onZoomIn}
            />
            <ZoomInput value={props.transform} min={ZoomRange.min} max={ZoomRange.max} onChange={props.onZoomChange} />
            <IconButton
              iconStyles={{ margin: 'auto', height: '4px', width: '12px' }}
              styles={{ display: 'inline-flex', margin: '0 20px 0 10px', width: '30px', height: '30px' }}
              icon={zoomOutIcon}
              title="Zoom out"
              onClick={props.onZoomOut}
            />
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
        <IconButton
          disabled={props.disabledReload}
          styles={{ display: 'inline-flex', margin: '0', width: '30px', height: '30px' }}
          iconStyles={{ margin: 'auto', width: '12px', height: '12px' }}
          icon={refreshIcon}
          title="Refresh Topology"
          onClick={props.onRefresh}
        />
        {!props.onlyRefreshAvaible && (
          <>
            <SecondaryButton
              label="FILTER"
              icon={filterIcon}
              onClick={() => onClick(TopologyPanelTypes.FILTERS)}
              disabled={false}
              styles={{ margin: '0 0 0 20px', padding: '4px 24px' }}
              height="30px"
              iconWidth="12px"
              iconHeight="12px"
            />
            <SecondaryButton
              label="Segments"
              icon={segmentsIcon}
              onClick={onGoToSegments}
              disabled={false}
              iconWidth="12px"
              iconHeight="12px"
              styles={{ margin: '0 0 0 20px', padding: '4px 24px' }}
              height="30px"
            />
            {/* <Filter onChange={onFilter} searchQuery={topology?.searchQuery || ''} /> */}
            {/* <SecondaryButton label="Edit Topology" icon={editIcon} onClick={() => onClick(TopologyPanelTypes.SEGMENTS)} disabled={false} styles={{ margin: '0 0 0 20px' }} /> */}
          </>
        )}
      </Side>
    </Wrapper>
  );
};

export default React.memo(HeadeerAction);
