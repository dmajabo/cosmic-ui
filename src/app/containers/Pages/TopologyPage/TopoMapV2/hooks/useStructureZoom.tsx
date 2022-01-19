import React from 'react';
import * as d3 from 'd3';
import { ITransform, ZoomRange } from 'lib/models/general';
import { STANDART_DISPLAY_RESOLUTION_V2 } from 'lib/models/general';

interface IProps {
  svgId: string;
  rootId: string;
}
// , onUpdateCallBack: (_transform: ITransform) => void
export function useStructureZoom(props: IProps) {
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
    let _k = transform.k + 0.01;
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
    let _k = transform.k - 0.01;
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

  const onCentered = () => {
    const svg = d3.select(`#${svgId}`);
    const root = d3.select(`#${rootId}`).node().getBBox();
    const scale = getScaleSizeHelper(root.width, root.height);
    const centerX = STANDART_DISPLAY_RESOLUTION_V2.width / 2 - (root.width * scale) / 2 - root.x * scale;
    const centerY = STANDART_DISPLAY_RESOLUTION_V2.height / 2 - (root.height * scale) / 2 - root.y * scale;
    svg.call(zoom.transform, d3.zoomIdentity.translate(centerX, centerY).scale(scale));
  };

  const getScaleSizeHelper = (width, height) => {
    const scaleX = Math.min(1, STANDART_DISPLAY_RESOLUTION_V2.width / width);
    const scaleY = Math.min(1, STANDART_DISPLAY_RESOLUTION_V2.height / height);
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

  return {
    zoomValue,
    transform,
    onZoomInit,
    onZoomIn,
    onZoomOut,
    onZoomChange,
    onCentered,
    onUnsubscribe,
  };
}
