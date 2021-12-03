import React from 'react';
import { ButtonsGroup } from '../styles';
import { FooterLabel, FooterRow, MapTitle, SvgStyles, SvgWrapper } from './styles';
import IconButton from 'app/components/Buttons/IconButton';
import { zoomCenterIcon, zoomInIcon, zoomOutIcon } from 'app/components/SVGIcons/zoom';
import { buildNodes, buildtransitNodes, EdgeNodeType, EDGE_MAP_CONSTANTS, INodesObject, ITransitionObject, ILinkObject, buildLinks } from './helpers';
import EdgeNode from './EdgeNode';
import { useEdgeZoom } from './useEdgeZoom';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { DeploymentTypes, IEdgePolicy } from 'lib/api/ApiModels/Edges/apiModel';
import { INetworkwEdge } from 'lib/models/topology';
import EdgeLink from './EdgeLink';

interface Props {
  name: string;
  sites: string[];
  apps: string[];
  wedges: INetworkwEdge[];
  transitType: DeploymentTypes;
  selectedRegions: string[];
  selectedWedgeIds: string[];
  policies: IEdgePolicy[] | null;
}

const EdgesMap: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [links, setLinks] = React.useState<ILinkObject>(null);
  const [sites, setSites] = React.useState<INodesObject>(null);
  const [apps, setApps] = React.useState<INodesObject>(null);
  const [transits, setTransits] = React.useState<ITransitionObject>(null);
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
    if (props.transitType === DeploymentTypes.Regions && props.selectedRegions) {
      const _transits: ITransitionObject = buildtransitNodes(props.selectedRegions, DeploymentTypes.Regions, 300);
      setTransits(_transits);
    }
    if (props.transitType === DeploymentTypes.Wedge && props.selectedWedgeIds) {
      const _transits: ITransitionObject = buildtransitNodes(props.selectedWedgeIds, DeploymentTypes.Wedge, 300, props.wedges);
      setTransits(_transits);
    }
  }, [props.transitType, props.selectedRegions, props.selectedWedgeIds]);

  React.useEffect(() => {
    if (!edges || !edges.groups || !edges.groups.length || !props.sites) return;
    const _arr: ITopologyGroup[] = [];
    props.sites.forEach(it => {
      const _gr = edges.groups.find(el => el.id === it);
      if (_gr) {
        _arr.push(_gr);
      }
    });
    const _sitesObj: INodesObject = buildNodes(_arr, EDGE_MAP_CONSTANTS.sitesNodePrefix, 0);
    setSites(_sitesObj);
  }, [props.sites]);

  React.useEffect(() => {
    if (!edges || !edges.groups || !edges.groups.length || !props.apps) return;
    const _arr: ITopologyGroup[] = [];
    props.apps.forEach(it => {
      const _gr = edges.groups.find(el => el.id === it);
      if (_gr) {
        _arr.push(_gr);
      }
    });
    const _appsObj: INodesObject = buildNodes(_arr, EDGE_MAP_CONSTANTS.appsNodePrefix, 600);
    setApps(_appsObj);
  }, [props.apps]);

  React.useEffect(() => {
    if (!props.policies || !props.policies.length) return;
    const _linksObj: ILinkObject = buildLinks(sites, apps, transits, props.policies, EDGE_MAP_CONSTANTS.transitionPrefix);
    setLinks(_linksObj);
  }, [props.policies, sites, apps, transits]);

  const zoomIn = () => {
    onZoomIn();
  };
  const zoomOut = () => {
    onZoomOut();
  };
  return (
    <>
      <SvgWrapper>
        <SvgStyles id={EDGE_MAP_CONSTANTS.svg} viewBox="0 0 900 816" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id={EDGE_MAP_CONSTANTS.root}>
            <rect x="0" y="-5000" width="300" height="10000" fill="var(--_tableBg)" />
            <rect x="300" y="-5000" width="300" height="10000" fill="var(--_vmBg)" />
            <rect x="600" y="-5000" width="300" height="10000" fill="var(--_tableBg)" />

            <g id={EDGE_MAP_CONSTANTS.rootScaleContainer}>
              <g id={EDGE_MAP_CONSTANTS.links}>{links && links.links && links.links.map(it => <EdgeLink key={`linksKey${it.id}`} dataItem={it} />)}</g>
              <g id={EDGE_MAP_CONSTANTS.sites}>{sites && sites.nodes && sites.nodes.map(it => <EdgeNode type={EdgeNodeType.SITES} key={`sitesNodeKey${it.nodeId}`} dataItem={it} />)}</g>
              <g id={EDGE_MAP_CONSTANTS.apps}>{apps && apps.nodes && apps.nodes.map(it => <EdgeNode type={EdgeNodeType.APPS} key={`appsNodeKey${it.nodeId}`} dataItem={it} />)}</g>
              <g id={EDGE_MAP_CONSTANTS.transit}>{transits && transits.nodes && transits.nodes.map(it => <EdgeNode type={EdgeNodeType.TRANSIT} key={`transitNodeKey${it.id}`} dataItem={it} />)}</g>
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
