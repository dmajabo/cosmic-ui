import React from 'react';
import * as d3 from 'd3';
import { ITransform } from 'app/components/Map/model';

const EdgeZoomRange = { min: 0.1, max: 50 };
interface IProps {
  svgId: string;
  rootId: string;
  scaleRootId: string;
}
// , onUpdateCallBack: (_transform: ITransform) => void
export function useEdgeZoom(props: IProps) {
  const [svgId] = React.useState<string>(props.svgId);
  const [rootId] = React.useState<string>(props.rootId);
  const [scaleRootId] = React.useState<string>(props.scaleRootId);
  const [transform, setTransform] = React.useState<ITransform>({ k: 1, x: 0, y: 0 });
  const zoom = d3
    .zoom()
    .scaleExtent([EdgeZoomRange.min, EdgeZoomRange.max])
    .on('zoom', e => zoomed(e))
    .on('end', e => zoomEnd(e));

  const onZoomInit = () => {
    const svg = d3.select(`#${svgId}`);
    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.scale(1));
    svg.on('click.zoom', null).on('dblclick.zoom', null);
  };

  const onUnsubscribe = () => {
    const svg = d3.select(`#${svgId}`);
    svg.on('.zoom', null);
  };

  const onZoomIn = () => {
    const svg = d3.select(`#${svgId}`);
    let _k = transform.k + 0.1;
    if (_k >= EdgeZoomRange.max) {
      _k = EdgeZoomRange.max;
    }
    if (_k === transform.k) {
      return;
    }
    zoom.scaleTo(svg, _k);
  };

  const onZoomOut = () => {
    const svg = d3.select(`#${svgId}`);
    let _k = transform.k - 0.1;
    if (_k <= EdgeZoomRange.min) {
      _k = EdgeZoomRange.min;
    }
    if (_k === transform.k) {
      return;
    }
    zoom.scaleTo(svg, _k);
  };

  const onCentered = () => {
    const svg = d3.select(`#${svgId}`);
    const root = d3.select(`#${scaleRootId}`);
    const rootSize = root.node().getBBox();
    const devHeight = rootSize.height;
    const scale = getScaleSizeHelper(890, 816, 794, devHeight);
    const translateX = 890 / 2 - (794 * scale) / 2 - rootSize.x * scale;
    const translateY = 816 / 2 - (rootSize.height * scale) / 2 - rootSize.y * scale;
    svg.call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale));
  };

  const getScaleSizeHelper = (svgW, svgH, width, height) => {
    const scaleX = Math.min(1, (svgW - 50) / width);
    const scaleY = Math.min(1, (svgH - 50) / height);
    let k = Math.min(scaleX, scaleY);
    k = checkMinMaxScale(k);
    return k;
  };

  const checkMinMaxScale = scale => {
    if (scale <= EdgeZoomRange.min) return EdgeZoomRange.min;
    if (scale >= EdgeZoomRange.max) return EdgeZoomRange.max;
    return scale;
  };

  const zoomed = event => {
    if (!event || !event.transform) {
      return;
    }
    const g = d3.select(`#${rootId}`);
    const { k, x, y } = event.transform;
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
    const { k, x, y } = event.transform;
    setTransform({ x, y, k });
  };

  return {
    onZoomInit,
    onZoomIn,
    onZoomOut,
    onCentered,
    onUnsubscribe,
  };
}
