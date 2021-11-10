import React from 'react';
import { IEdgeModel } from '../../model';
import { ButtonsGroup } from '../styles';
import { SvgStyles, SvgWrapper } from './styles';
import IconButton from 'app/components/Buttons/IconButton';
import { zoomInIcon, zoomOutIcon } from 'app/components/SVGIcons/zoom';
import { buildNodes, buildtransitNodes, EdgeNodeType, EDGE_MAP_CONSTANTS, INodesObject, ISvgTransitNode } from './helpers';
import EdgeNode from './EdgeNode';

interface Props {
  dataItem: IEdgeModel;
}

const EdgesMap: React.FC<Props> = (props: Props) => {
  const [zoom, setZoom] = React.useState<number>(1);
  const [sites, setSites] = React.useState<INodesObject>(null);
  const [apps, setApps] = React.useState<INodesObject>(null);
  const [transits, setTransits] = React.useState<ISvgTransitNode[]>(null);
  React.useEffect(() => {
    const _sitesObj: INodesObject = buildNodes(props.dataItem.sites, EDGE_MAP_CONSTANTS.sitesNodePrefix);
    const _appsObj: INodesObject = buildNodes(props.dataItem.apps, EDGE_MAP_CONSTANTS.appsNodePrefix);
    const _transits: ISvgTransitNode[] = buildtransitNodes(props.dataItem.selectedRegions);
    setSites(_sitesObj);
    setApps(_appsObj);
    setTransits(_transits);
  }, [props.dataItem]);

  const onZoomIn = () => {
    const _newZoom = Math.min(10, zoom + 0.1);
    if (_newZoom === zoom) return;
    setZoom(_newZoom);
  };
  const onZoomOut = () => {
    const _newZoom = Math.max(0.1, zoom - 0.1);
    if (_newZoom === zoom) return;
    setZoom(_newZoom);
  };
  return (
    <SvgWrapper>
      <SvgStyles id={EDGE_MAP_CONSTANTS.svg} width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id={EDGE_MAP_CONSTANTS.root} style={{ transformOrigin: 'center center' }} transform={`scale(${zoom})`}>
          <g id={EDGE_MAP_CONSTANTS.sites}>
            <rect x="0" y="-5000" width="calc(100% / 3)" height="10000" fill="var(--_tableBg)" />
            {sites && sites.nodes && sites.nodes.map(it => <EdgeNode type={EdgeNodeType.SITES} key={`sitesNodeKey${it.id}`} dataItem={it} />)}
          </g>
          <g id={EDGE_MAP_CONSTANTS.transit}>
            <rect x="0" y="-5000" width="calc(100% / 3)" height="10000" fill="var(--_vmBg)" />
            {transits && transits.map(it => <EdgeNode type={EdgeNodeType.TRANSIT} key={`transitNodeKey${it.id}`} dataItem={it} />)}
          </g>
          <g id={EDGE_MAP_CONSTANTS.apps}>
            <rect x="0" y="-5000" width="calc(100% / 3)" height="10000" fill="var(--_tableBg)" />
            {apps && apps.nodes && apps.nodes.map(it => <EdgeNode type={EdgeNodeType.APPS} key={`appsNodeKey${it.id}`} dataItem={it} />)}
          </g>
        </g>
      </SvgStyles>
      <ButtonsGroup>
        <IconButton styles={{ margin: '10px 0 0 0' }} icon={zoomInIcon} title="Zoom in" onClick={onZoomIn} />
        <IconButton iconStyles={{ verticalAlign: 'middle', height: '4px' }} styles={{ margin: '10px 0 0 0' }} icon={zoomOutIcon} title="Zoom out" onClick={onZoomOut} />
      </ButtonsGroup>
    </SvgWrapper>
  );
};

export default React.memo(EdgesMap);
