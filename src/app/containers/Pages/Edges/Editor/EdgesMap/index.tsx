import React from 'react';
import { ButtonsGroup } from '../styles';
import { FooterLabel, FooterRow, MapTitle, SvgStyles, SvgWrapper } from './styles';
import IconButton from 'app/components/Buttons/IconButton';
import { zoomCenterIcon, zoomInIcon, zoomOutIcon } from 'app/components/SVGIcons/zoom';
import {
  buildNodes,
  buildtransitNodes,
  EdgeNodeType,
  EDGE_MAP_CONSTANTS,
  INodesObject,
  ITransitionObject,
  ILinkObject,
  buildLinks,
  ISvgEdgeGroup,
  updateNodesCoord,
  updateAllNodes,
  SVG_EDGES_STYLES,
} from './helpers';
import EdgeNode from './EdgeNode';
import { useEdgeZoom } from './useEdgeZoom';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { DeploymentTypes, ISegmentP } from 'lib/api/ApiModels/Edges/apiModel';
import EdgeLink from './EdgeLink';
import ExpandCollapseAll from './ExpandCollapseAll';

interface Props {
  name: string;
  sites: string[];
  apps: string[];
  transitType: DeploymentTypes;
  selectedRegions: string[];
  selectedWedgeIds: string[];
  segmentPolicy: ISegmentP[];
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
    if (props.transitType === DeploymentTypes.NEW_REGIONS && props.selectedRegions) {
      const _transits: ITransitionObject = buildtransitNodes(props.selectedRegions, DeploymentTypes.NEW_REGIONS, SVG_EDGES_STYLES.mapColumn);
      setTransits(_transits);
    }
    if (props.transitType === DeploymentTypes.EXISTING_GWS && props.selectedWedgeIds) {
      const _transits: ITransitionObject = buildtransitNodes(props.selectedWedgeIds, DeploymentTypes.EXISTING_GWS, SVG_EDGES_STYLES.mapColumn, edges.wedges);
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
    const _appsObj: INodesObject = buildNodes(_arr, EDGE_MAP_CONSTANTS.appsNodePrefix, SVG_EDGES_STYLES.mapColumn * 2);
    setApps(_appsObj);
  }, [props.apps]);

  React.useEffect(() => {
    if (!props.segmentPolicy || !props.segmentPolicy.length) return;
    const _linksObj: ILinkObject = buildLinks(sites, apps, transits, props.segmentPolicy, EDGE_MAP_CONSTANTS.transitionPrefix);
    setLinks(_linksObj);
  }, [props.segmentPolicy, sites, apps, transits]);

  const onExpandCollapseSites = (node: ISvgEdgeGroup) => {
    const obj: INodesObject = updateNodesCoord(node, sites);
    setSites(obj);
  };

  const onExpandCollapseApps = (node: ISvgEdgeGroup) => {
    const obj: INodesObject = updateNodesCoord(node, apps);
    setApps(obj);
  };

  const onExpandAll = () => {
    const _sites: INodesObject = updateAllNodes(sites, true);
    const _apps: INodesObject = updateAllNodes(apps, true);
    setSites(_sites);
    setApps(_apps);
  };

  const onCollapseAll = () => {
    const _sites: INodesObject = sites && sites.nodes && sites.nodes.length ? updateAllNodes(sites, false) : null;
    const _apps: INodesObject = apps && apps.nodes && apps.nodes.length ? updateAllNodes(apps, false) : null;
    setSites(_sites);
    setApps(_apps);
  };

  const zoomIn = () => {
    onZoomIn();
  };
  const zoomOut = () => {
    onZoomOut();
  };
  return (
    <>
      <SvgWrapper>
        <SvgStyles id={EDGE_MAP_CONSTANTS.svg} viewBox={SVG_EDGES_STYLES.viewBox} width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id={EDGE_MAP_CONSTANTS.root}>
            <rect x="0" y="-5000" width={SVG_EDGES_STYLES.mapColumn} height="10000" fill="var(--_tableBg)" />
            <rect x={SVG_EDGES_STYLES.mapColumn} y="-5000" width={SVG_EDGES_STYLES.mapColumn} height="10000" fill="var(--_vmBg)" />
            <rect x={SVG_EDGES_STYLES.mapColumn * 2} y="-5000" width={SVG_EDGES_STYLES.mapColumn} height="10000" fill="var(--_tableBg)" />

            <g id={EDGE_MAP_CONSTANTS.rootScaleContainer}>
              <g id={EDGE_MAP_CONSTANTS.links}>{links && links.links && links.links.map(it => <EdgeLink key={`linksKey${it.id}`} dataItem={it} />)}</g>
              <g id={EDGE_MAP_CONSTANTS.sites}>
                {sites && sites.nodes && sites.nodes.map(it => <EdgeNode type={EdgeNodeType.SITES} key={`sitesNodeKey${it.nodeId}`} dataItem={it} onExpandCollapse={onExpandCollapseSites} />)}
              </g>
              <g id={EDGE_MAP_CONSTANTS.apps}>
                {apps && apps.nodes && apps.nodes.map(it => <EdgeNode type={EdgeNodeType.APPS} key={`appsNodeKey${it.nodeId}`} dataItem={it} onExpandCollapse={onExpandCollapseApps} />)}
              </g>
              <g id={EDGE_MAP_CONSTANTS.transit}>{transits && transits.nodes && transits.nodes.map(it => <EdgeNode type={EdgeNodeType.TRANSIT} key={`transitNodeKey${it.id}`} dataItem={it} />)}</g>
            </g>
          </g>
        </SvgStyles>
        <ExpandCollapseAll sites={sites && sites.nodes ? sites.nodes : null} apps={apps && apps.nodes ? apps.nodes : null} onCollapseAll={onCollapseAll} onExpandAll={onExpandAll} />
        <ButtonsGroup>
          <IconButton styles={{ margin: '10px 0 0 0' }} icon={zoomInIcon} title="Zoom in" onClick={zoomIn} />
          <IconButton iconStyles={{ verticalAlign: 'middle', height: '4px' }} styles={{ margin: '10px 0 0 0' }} icon={zoomOutIcon} title="Zoom out" onClick={zoomOut} />
          <IconButton styles={{ margin: '10px 0 0 0' }} icon={zoomCenterIcon} title="Center" onClick={onCentered} />
        </ButtonsGroup>
      </SvgWrapper>
      <MapTitle>{props.name || 'Unknown'}</MapTitle>
      <FooterRow>
        <FooterLabel>Sites</FooterLabel>
        <FooterLabel>Transit</FooterLabel>
        <FooterLabel>Apps</FooterLabel>
      </FooterRow>
    </>
  );
};

export default React.memo(EdgesMap);
