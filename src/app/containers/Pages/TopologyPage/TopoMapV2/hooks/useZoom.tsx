import React from 'react';
import * as d3 from 'd3';
import { ISize, ITransform, ZoomRange } from 'lib/models/general';
import { ITopoNode } from 'lib/hooks/Topology/models';

interface IProps {
  svgId: string;
  rootId: string;
}
// , onUpdateCallBack: (_transform: ITransform) => void
export function useZoom(props: IProps) {
  const [svgId] = React.useState<string>(props.svgId);
  const [rootId] = React.useState<string>(props.rootId);
  const [transform, setTransform] = React.useState<ITransform>({ k: 1, x: 0, y: 0 });
  const [zoomValue, setZoomValue] = React.useState<number>(100);

  let disabledTransition = false;

  const zoom = d3
    .zoom()
    .scaleExtent([ZoomRange.min, ZoomRange.max])
    .on('zoom', e => zoomed(e))
    .on('end', e => zoomEnd(e));

  const onZoomInit = (nodes: ITopoNode<any>[]) => {
    const svg = d3.select(`#${svgId}`);
    svg.call(zoom);
    svg.on('click.zoom', null).on('dblclick.zoom', null);
    onCentered(nodes, true);
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

  const onCentered = (nodes: ITopoNode<any>[], _disabledTransition?: boolean) => {
    const svg = d3.select(`#${svgId}`);
    const svgSize = document.getElementById(svgId).getBoundingClientRect();
    const rootSize = getMapSize(nodes);
    const scale = getScaleSizeHelper(svgSize, rootSize.width, rootSize.height);
    const centerX = svgSize.width / 2 - (rootSize.width / 2) * scale;
    const centerY = svgSize.height / 2 - (rootSize.height / 2) * scale;
    if (_disabledTransition) {
      disabledTransition = _disabledTransition;
    }
    svg.call(zoom.transform, d3.zoomIdentity.translate(centerX, centerY).scale(scale));
  };

  const getScaleSizeHelper = (svg, width, height) => {
    const scaleX = Math.min(1, (svg.width - 80) / width);
    const scaleY = Math.min(1, (svg.height - 80) / height);
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
        g.attr('transform', `translate(${x}, ${y}) scale(${k})`);
        return;
      }
      g.transition().attr('transform', `translate(${x}, ${y}) scale(${k})`);
      return;
    }
    if (disabledTransition) {
      disabledTransition = false;
      g.attr('transform', `translate(${x}, ${y}) scale(${k})`);
      return;
    }
    g.transition().duration(0).attr('transform', `translate(${x}, ${y}) scale(${k})`);
  };

  const zoomEnd = event => {
    if (!event || !event.transform) {
      return;
    }
    const { x, y, k } = event.transform;
    setZoomValue(convertScale(k));
    setTransform({ x, y, k });
  };

  const getMapSize = (nodes: ITopoNode<any>[]): ISize => {
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    nodes.forEach(node => {
      if (node.x < left) {
        left = node.x;
      }
      const nodeW = node.collapsed ? node.collapsedSize.width : node.expandedSize.width;
      const nodeH = node.collapsed ? node.collapsedSize.height : node.expandedSize.height;
      if (node.x + nodeW > right) {
        right = node.x + nodeW;
      }
      if (node.y < top) {
        top = node.y;
      }
      if (node.y + nodeH > bottom) {
        bottom = node.y + nodeH;
      }
    });
    return { width: right - left, height: bottom - top };
  };

  return {
    zoomValue,
    transform,
    onZoomInit,
    onZoomIn,
    onZoomOut,
    onCentered,
    onUnsubscribe,
  };
}
