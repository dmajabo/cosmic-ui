import React from 'react';
import * as d3 from 'd3';
import { ITransform, ZoomRange } from '../model';

interface IProps {
  svgId: string;
  rootId: string;
}
// , onUpdateCallBack: (_transform: ITransform) => void
export function useZoom(props: IProps) {
  const [svgId] = React.useState<string>(props.svgId);
  const [rootId] = React.useState<string>(props.rootId);
  const [transformStyle, setTransformStyle] = React.useState<string>('translate(0, 0) scale(0)');
  const [transform, setTransform] = React.useState<ITransform>({ k: 1, x: 0, y: 0 });
  const [lock, setTooglelock] = React.useState<boolean>(false);
  // const [isUpdated, setIsUpdated] = React.useState<boolean>(false);
  const zoom = d3
    .zoom()
    .scaleExtent([ZoomRange.min, ZoomRange.max])
    .on('zoom', e => zoomed(e))
    .on('end', e => zoomEnd(e));

  const onToogleLock = () => {
    const _lock = !lock;
    setTooglelock(_lock);
    const svg = d3.select(`#${svgId}`);
    if (!_lock) {
      onUnBlock(svg);
    } else {
      onBlock(svg);
    }
  };

  const onZoomInit = (data: ITransform) => {
    const k = prepareDataValue(data.k, 1, ZoomRange.min, ZoomRange.max);
    const x = prepareDataValue(data.x, 0);
    const y = prepareDataValue(data.y, 0);
    const svg = d3.select(`#${svgId}`);
    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(k));
    svg.on('click.zoom', null).on('dblclick.zoom', null);
  };
  const onZoomInitReadOnly = (data: ITransform) => {
    const k = prepareDataValue(data.k, 1, ZoomRange.min, ZoomRange.max);
    const x = prepareDataValue(data.x, 0);
    const y = prepareDataValue(data.y, 0);
    setTransform(data);
    setTransformStyle(`translate(${x}, ${y}) scale(${k})`);
  };

  const onUnsubscribe = () => {
    const svg = d3.select(`#${svgId}`);
    onBlock(svg);
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

  const onCentered = () => {
    const svg = d3.select(`#${svgId}`);
    const root = d3.select(`#${rootId}`);
    const svgSize = document.getElementById(svgId).getBoundingClientRect();
    const rootSize = root.node().getBBox();
    const devWidth = rootSize.width;
    const devHeight = rootSize.height;
    const scale = getScaleSizeHelper(svgSize, devWidth, devHeight);
    const centerX = svgSize.width / 2 - devWidth / 2 - rootSize.x;
    const centerY = svgSize.height / 2 - devHeight / 2 - rootSize.y;
    svg.call(zoom.transform, d3.zoomIdentity.translate(centerX, centerY).scale(scale));
    // zoom.scaleTo(root, scale);
    // zoom.translateTo(root, );
  };

  const getScaleSizeHelper = (svg, width, height) => {
    const scaleX = Math.min(1, svg.width / width);
    const scaleY = Math.min(1, svg.height / height);
    let k = Math.min(scaleX, scaleY);
    k = checkMinMaxScale(k);
    return k;
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
      g.transition().attr('transform', `translate(${x}, ${y}) scale(${k.toFixed(4)})`);
      return;
    }
    g.transition()
      .duration(0)
      .attr('transform', `translate(${x}, ${y}) scale(${k.toFixed(4)})`);
  };

  const zoomEnd = event => {
    if (!event || !event.transform) {
      return;
    }
    const { x, y, k } = event.transform;
    setTransformStyle(`translate(${x}, ${y}) scale(${k})`);
    setTransform({ x, y, k });
  };

  // const whellZoom = () => {
  //   const a = -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1) / 500;
  //   if (a < 0) {
  //     onZoomOut();
  //   } else if (a > 0) {
  //     onZoomIn();
  //   }
  // };

  const onBlock = svg => {
    svg.on('.zoom', null);
  };

  const onUnBlock = svg => {
    svg.call(zoom);
    svg.on('click.zoom', null).on('dblclick.zoom', null).on('wheel.zoom', null);
    // if (isMobileDevice()) {
    //   svg.on('click.zoom', null).on('dblclick.zoom', null).on('wheel.zoom', null); // block
    // } else {
    //   svg.on('click.zoom', null).on('dblclick.zoom', null).on('wheel.zoom', null);
    // }
  };

  // const isMobileDevice = () => {
  //   if (navigator.userAgent.match(/Android/i)
  //     || navigator.userAgent.match(/webOS/i)
  //     || navigator.userAgent.match(/iPhone/i)
  //     || navigator.userAgent.match(/iPad/i)
  //     || navigator.userAgent.match(/iPod/i)
  //     || navigator.userAgent.match(/BlackBerry/i)
  //     || navigator.userAgent.match(/Windows Phone/i)) {
  //     return true;
  //   }
  //   return false;
  // };

  const prepareDataValue = (value: number, defaultValue: number, min?: number, max?: number): number => {
    if (!value || (!value && value !== 0)) {
      return defaultValue;
    }
    if (min && value < min) {
      return min;
    }
    if (max && value > max) {
      return max;
    }
    return value;
  };

  return {
    transform,
    transformStyle,
    lock,
    onZoomInit,
    onZoomInitReadOnly,
    onZoomIn,
    onZoomOut,
    onCentered,
    onUnsubscribe,
    onToogleLock,
  };
}
