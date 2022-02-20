import React from 'react';
import * as d3 from 'd3';
import { IObject, ISize, ITransform, ZoomRange } from 'lib/models/general';
import { ITopoAccountNode, ITopoRegionNode, ITopoSitesNode, TopoNodeTypes } from 'lib/hooks/Topology/models';
import { STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';
import { NODES_CONSTANTS } from '../model';

interface IProps {
  pageId: string;
  svgId: string;
  rootId: string;
}
// , onUpdateCallBack: (_transform: ITransform) => void
export function useZoom(props: IProps) {
  const [pageId] = React.useState<string>(props.pageId);
  const [svgId] = React.useState<string>(props.svgId);
  const [rootId] = React.useState<string>(props.rootId);
  const [transform, setTransform] = React.useState<ITransform>({ k: 1, x: 0, y: 0 });
  const [zoomValue, setZoomValue] = React.useState<number>(100);

  let disabledTransition = false;

  const zoom = d3
    .zoom()
    .scaleExtent([ZoomRange.min, ZoomRange.max])
    .wheelDelta(function wheelDelta(event) {
      return -event.deltaY * (event.deltaMode === 1 ? 0.01 : event.deltaMode ? 1 : 0.002);
    })
    .on('zoom', e => zoomed(e))
    .on('end', e => zoomEnd(e));

  const onZoomInit = () => {
    const svg = d3.select(`#${svgId}`);
    svg.call(zoom);
    svg.on('click.zoom', null).on('dblclick.zoom', null);
    // onCentered(nodes, true);
  };

  const convertScale = (k: number): number => {
    if (!k || k === 0) return 0;
    const scale = k * 100;
    return Number(scale.toFixed(0));
  };

  const onUnsubscribe = () => {
    const svg = d3.select(`#${svgId}`);
    svg.on('.zoom', null);
  };

  const onZoomIn = () => {
    const svg = d3.select(`#${svgId}`);
    let _k = transform.k + 0.1;
    if (_k >= ZoomRange.max) {
      _k = ZoomRange.max;
    }
    if (_k === transform.k) {
      return;
    }
    zoom.scaleTo(svg, _k);
  };

  const onZoomOut = () => {
    const svg = d3.select(`#${svgId}`);
    let _k = transform.k - 0.1;
    if (_k <= ZoomRange.min) {
      _k = ZoomRange.min;
    }
    if (_k === transform.k) {
      return;
    }
    zoom.scaleTo(svg, _k);
  };

  const onZoomChange = (v: number) => {
    if (v === transform.k) return;
    const svg = d3.select(`#${svgId}`);
    zoom.scaleTo(svg, v);
  };

  const onCentered = (accounts: IObject<ITopoAccountNode>, sites: IObject<ITopoSitesNode>, regions: IObject<ITopoRegionNode>, _disabledTransition?: boolean) => {
    const svg = d3.select(`#${svgId}`);
    const rootSize = getMapSize(accounts, sites, regions);
    const scale = getScaleSizeHelper(rootSize.width, rootSize.height);
    const centerX = STANDART_DISPLAY_RESOLUTION_V2.width / 2 - (rootSize.width * scale) / 2 - rootSize.left * scale;
    const centerY = STANDART_DISPLAY_RESOLUTION_V2.height / 2 - (rootSize.height * scale) / 2 - rootSize.top * scale;
    if (_disabledTransition) {
      disabledTransition = _disabledTransition;
    }
    svg.call(zoom.transform, d3.zoomIdentity.translate(centerX, centerY).scale(scale));
  };

  const getScaleSizeHelper = (width, height) => {
    const scaleX = Math.min(1, (STANDART_DISPLAY_RESOLUTION_V2.width - 40) / width);
    const scaleY = Math.min(1, (STANDART_DISPLAY_RESOLUTION_V2.height - 40) / height);
    let k = Math.min(scaleX, scaleY);
    k = checkMinMaxScale(k);
    return Number(k.toFixed(4));
  };

  const checkMinMaxScale = scale => {
    if (scale <= ZoomRange.min) return ZoomRange.min;
    if (scale >= ZoomRange.max) return ZoomRange.max;
    return scale;
  };

  const zoomed = event => {
    if (!event || !event.transform) {
      return;
    }
    const g = d3.select(`#${rootId}`);
    const { x, y, k } = event.transform;
    if (!event.sourceEvent) {
      if (disabledTransition) {
        disabledTransition = false;
        g.attr('transform', `translate(${x}, ${y}) scale(${k})`).attr('data-k', k);
        return;
      }
      g.transition().attr('transform', `translate(${x}, ${y}) scale(${k})`).attr('data-k', k);
      return;
    }
    if (disabledTransition) {
      disabledTransition = false;
      g.attr('transform', `translate(${x}, ${y}) scale(${k})`).attr('data-k', k);
      return;
    }
    g.transition().duration(0).attr('transform', `translate(${x}, ${y}) scale(${k})`).attr('data-k', k);
  };

  const zoomEnd = event => {
    if (!event || !event.transform) {
      return;
    }
    const { x, y, k } = event.transform;
    setZoomValue(convertScale(k));
    setTransform({ x, y, k });
  };

  const getMapSize = (accounts: IObject<ITopoAccountNode>, sites: IObject<ITopoSitesNode>, regions: IObject<ITopoRegionNode>) => {
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    Object.keys(accounts).forEach((key, i) => {
      const nodeW = accounts[key].width;
      const nodeH = accounts[key].height;
      if (i === 0) {
        left = accounts[key].x;
        right = accounts[key].x + nodeW;
        top = accounts[key].y;
        bottom = accounts[key].y + nodeH;
        return;
      }
      if (accounts[key].x < left) {
        left = accounts[key].x;
      }
      if (accounts[key].x + nodeW > right) {
        right = accounts[key].x + nodeW;
      }
      if (accounts[key].y < top) {
        top = accounts[key].y;
      }
      if (accounts[key].y + nodeH > bottom) {
        bottom = accounts[key].y + nodeH;
      }
    });
    Object.keys(sites).forEach((key, i) => {
      const nodeW = sites[key].width;
      const nodeH = sites[key].height;
      if (i === 0) {
        left = Math.min(left, sites[key].x);
        right = Math.max(right, sites[key].x + nodeW);
        top = Math.min(top, sites[key].y);
        bottom = Math.max(bottom, sites[key].y + nodeH);
        return;
      }
      if (sites[key].x < left) {
        left = sites[key].x;
      }
      if (sites[key].x + nodeW > right) {
        right = sites[key].x + nodeW;
      }
      if (sites[key].y < top) {
        top = sites[key].y;
      }
      if (sites[key].y + nodeH > bottom) {
        bottom = sites[key].y + nodeH;
      }
    });
    Object.keys(regions).forEach((key, i) => {
      const nodeW = regions[key].width;
      const nodeH = regions[key].height;
      if (i === 0) {
        left = Math.min(left, regions[key].x);
        right = Math.max(right, regions[key].x + nodeW);
        top = Math.min(top, regions[key].y);
        bottom = Math.max(bottom, regions[key].y + nodeH);
        return;
      }
      if (regions[key].x < left) {
        left = regions[key].x;
      }
      if (regions[key].x + nodeW > right) {
        right = regions[key].x + nodeW;
      }
      if (regions[key].y < top) {
        top = regions[key].y;
      }
      if (regions[key].y + nodeH > bottom) {
        bottom = regions[key].y + nodeH;
      }
    });
    return { width: right - left, height: bottom - top, left: left, rigth: right, top: top, bottom: bottom };
  };

  const onCenteredToNode = (selectedNode: any, panelWidth: number) => {
    const { svgCenterX, svgCenterY } = getSvgCenter(panelWidth);
    const { width, height } = getNodeSize(selectedNode.nodeType);
    const d3Svg = d3.select(`#${svgId}`);
    const { x, y } = selectedNode;
    const translateX = -x + svgCenterX - width; // - size.halfWidth
    const translateY = -y + svgCenterY - height; // - size.halfHeight
    d3Svg.call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(1));
  };

  const getSvgCenter = (panelWidth: number) => {
    const page = document.getElementById(pageId).getBoundingClientRect();
    const svgCenterX = (page.width - panelWidth) / 2;
    const svgCenterY = page.height / 2;
    return { svgCenterX, svgCenterY };
  };

  const getNodeSize = (nodeType: TopoNodeTypes): ISize => {
    if (nodeType === TopoNodeTypes.WEDGE) return { width: NODES_CONSTANTS.NETWORK_WEDGE.collapse.r, height: NODES_CONSTANTS.NETWORK_WEDGE.collapse.r };
    if (nodeType === TopoNodeTypes.DEVICE) return { width: NODES_CONSTANTS.DEVICE.collapse.width / 2, height: NODES_CONSTANTS.DEVICE.collapse.height / 2 };
    if (nodeType === TopoNodeTypes.VNET) return { width: NODES_CONSTANTS.NETWORK_VNET.collapse.r, height: NODES_CONSTANTS.NETWORK_VNET.collapse.r };
    return { width: 0, height: 0 };
  };

  return {
    zoomValue,
    transform,
    onZoomInit,
    onZoomIn,
    onZoomOut,
    onZoomChange,
    onCentered,
    onCenteredToNode,
    onUnsubscribe,
  };
}
