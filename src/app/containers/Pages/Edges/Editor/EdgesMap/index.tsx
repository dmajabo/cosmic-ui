import React from 'react';
import { ButtonsGroup } from '../styles';
import { FooterLabel, FooterRow, MapTitle, SvgStyles, SvgWrapper } from './styles';
import IconButton from 'app/components/Buttons/IconButton';
import { zoomCenterIcon, zoomInIcon, zoomOutIcon } from 'app/components/SVGIcons/zoom';
import { buildNodes, buildtransitNodes, EdgeNodeType, EDGE_MAP_CONSTANTS, INodesObject, ISvgTransitNode } from './helpers';
import EdgeNode from './EdgeNode';
import { useEdgeZoom } from './useEdgeZoom';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';

interface Props {
  name: string;
  sites: ITopologyGroup[];
  apps: ITopologyGroup[];
  selectedRegions: string[];
}

const EdgesMap: React.FC<Props> = (props: Props) => {
  const [sites, setSites] = React.useState<INodesObject>(null);
  const [apps, setApps] = React.useState<INodesObject>(null);
  const [transits, setTransits] = React.useState<ISvgTransitNode[]>(null);
  const { onZoomInit, onZoomIn, onZoomOut, onCentered, onUnsubscribe } = useEdgeZoom({
    svgId: EDGE_MAP_CONSTANTS.svg,
    rootId: EDGE_MAP_CONSTANTS.root,
    scaleRootId: EDGE_MAP_CONSTANTS.rootScaleContainer,
  });

  React.useEffect(() => {
    onZoomInit();
    return () => {
      onUnsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const _transits: ISvgTransitNode[] = buildtransitNodes(props.selectedRegions);
    setTransits(_transits);
  }, [props.selectedRegions]);

  React.useEffect(() => {
    const _sitesObj: INodesObject = buildNodes(props.sites, EDGE_MAP_CONSTANTS.sitesNodePrefix);
    setSites(_sitesObj);
  }, [props.sites]);

  React.useEffect(() => {
    const _appsObj: INodesObject = buildNodes(props.apps, EDGE_MAP_CONSTANTS.appsNodePrefix);
    setApps(_appsObj);
  }, [props.apps]);

  const zoomIn = () => {
    onZoomIn();
  };
  const zoomOut = () => {
    onZoomOut();
  };
  return (
    <>
      <SvgWrapper>
        <SvgStyles id={EDGE_MAP_CONSTANTS.svg} width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id={EDGE_MAP_CONSTANTS.root}>
            <rect x="0" y="-5000" width="calc(100% / 3)" height="10000" fill="var(--_tableBg)" />
            <rect x="calc(100% / 3)" y="-5000" width="calc(100% / 3)" height="10000" fill="var(--_vmBg)" />
            <rect x="calc(100% - 100% / 3)" y="-5000" width="calc(100% / 3)" height="10000" fill="var(--_tableBg)" />

            <g id={EDGE_MAP_CONSTANTS.rootScaleContainer}>
              <g id={EDGE_MAP_CONSTANTS.sites}>{sites && sites.nodes && sites.nodes.map(it => <EdgeNode type={EdgeNodeType.SITES} key={`sitesNodeKey${it.id}`} dataItem={it} />)}</g>
              <g id={EDGE_MAP_CONSTANTS.apps}>{apps && apps.nodes && apps.nodes.map(it => <EdgeNode type={EdgeNodeType.APPS} key={`appsNodeKey${it.id}`} dataItem={it} />)}</g>
              <g id={EDGE_MAP_CONSTANTS.transit}>{transits && transits.map(it => <EdgeNode type={EdgeNodeType.TRANSIT} key={`transitNodeKey${it.id}`} dataItem={it} />)}</g>
            </g>
          </g>
        </SvgStyles>
        <ButtonsGroup>
          <IconButton styles={{ margin: '10px 0 0 0' }} icon={zoomInIcon} title="Zoom in" onClick={zoomIn} />
          <IconButton iconStyles={{ verticalAlign: 'middle', height: '4px' }} styles={{ margin: '10px 0 0 0' }} icon={zoomOutIcon} title="Zoom out" onClick={zoomOut} />
          <IconButton styles={{ margin: '10px 0 0 0' }} icon={zoomCenterIcon} title="Center" onClick={onCentered} />
        </ButtonsGroup>
      </SvgWrapper>
      <MapTitle>{props.name || 'Unknow'}</MapTitle>
      <FooterRow>
        <FooterLabel>Sites</FooterLabel>
        <FooterLabel>Transit</FooterLabel>
        <FooterLabel>Apps</FooterLabel>
      </FooterRow>
    </>
  );
};

export default React.memo(EdgesMap);
