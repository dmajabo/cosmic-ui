import React from 'react';
import { TOPOLOGY_IDS } from '../../../model';
import { regionIcon } from 'app/components/SVGIcons/topologyIcons/TopoMapV2Icons/VnetPanelIcons/regionIcon';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { ITopoRegionNode } from 'lib/hooks/Topology/models';
import { closeIcon } from 'app/components/SVGIcons/close';
import { IPosition, STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import GContainer from '../../GContainer/GContainer';
import { useStructureZoom } from '../../../hooks/useStructureZoom';
import StructureNode from './StructureNode';
import { CloseBtn, ContainerHeader, ContainerName, ContainerWrapperStyles, MarkerNode } from './styled';
import { Rnd } from 'react-rnd';
import { OverflowStructureMapContainer, StyledMap } from '../../../styles';
import { ZoomButtonsWrapper } from 'app/components/Map/styles';
import IconButton from 'app/components/Buttons/IconButton';
import { zoomCenterIcon } from 'app/components/SVGIcons/zoom';

interface Props {
  region: ITopoRegionNode;
}
interface ISize {
  width: number | string;
  height: number | string;
}
const StructureContainer: React.FC<Props> = (props: Props) => {
  const { topology } = useTopologyV2DataContext();
  const [sizeData, setSize] = React.useState<ISize>({ width: '80%', height: '80%' });
  const [positionData, setPosition] = React.useState<IPosition>({ x: 40, y: 40 });
  const { onZoomInit, onUnsubscribe, onCentered } = useStructureZoom({
    svgId: `structure${props.region.dataItem.id}${TOPOLOGY_IDS.SVG}`,
    rootId: `structure${props.region.dataItem.id}${TOPOLOGY_IDS.G_ROOT}`,
  });

  React.useEffect(() => {
    onZoomInit();
    return () => {
      onUnsubscribe();
    };
  }, []);
  const onClose = () => {
    topology.onToogleRegionStructure(props.region);
  };

  const onCentering = () => {
    onCentered();
  };

  return (
    <Rnd
      default={{ width: '80%', height: '80%', x: 40, y: 40 }}
      size={{ width: sizeData.width, height: sizeData.height }}
      position={{ x: positionData.x, y: positionData.y }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setPosition({ x: position.x, y: position.y });
        setSize({
          width: ref.style.width,
          height: ref.style.height,
        });
      }}
      minWidth={260}
      minHeight={260}
      maxWidth="90%"
      maxHeight="90%"
      className="rndTooltip"
      resizeHandleClasses={{
        bottom: 'resize resize-b',
        bottomLeft: 'resize resize-rect resize-sw',
        bottomRight: 'resize resize-rect resize-se',
        left: 'resize resize-l',
        right: 'resize resize-r',
        top: 'resize resize-t',
        topLeft: 'resize resize-rect resize-nw',
        topRight: 'resize resize-rect resize-ne',
      }}
    >
      <ContainerWrapperStyles>
        <ContainerHeader>
          <MarkerNode>{regionIcon(24, 24)}</MarkerNode>
          <ContainerName>{props.region.dataItem.name}</ContainerName>
          <CloseBtn onClick={onClose}>{closeIcon}</CloseBtn>
        </ContainerHeader>
        <OverflowStructureMapContainer>
          <StyledMap
            id={`structure${props.region.dataItem.id}${TOPOLOGY_IDS.SVG}`}
            width="100%"
            height="100%"
            viewBox={`0 0 ${STANDART_DISPLAY_RESOLUTION_V2.width} ${STANDART_DISPLAY_RESOLUTION_V2.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ cursor: 'default', overflow: 'visible' }}
          >
            <GContainer id={`structure${props.region.dataItem.id}${TOPOLOGY_IDS.G_ROOT}`}>
              <StructureNode region={props.region} />
            </GContainer>
          </StyledMap>
          <ZoomButtonsWrapper>
            <IconButton styles={{ width: '40px', height: '40px' }} icon={zoomCenterIcon} title="Center" onClick={onCentering} />
          </ZoomButtonsWrapper>
        </OverflowStructureMapContainer>
      </ContainerWrapperStyles>
    </Rnd>
  );
};

export default React.memo(StructureContainer);
