import React from 'react';
import * as d3 from 'd3';
import { IPosition } from '../model';

interface IProps {
  id: string;
  // popupId: string;
  skipTargetsLinks?: boolean;
  skipSourceLinks?: boolean;
  scaleFactor?: number;
}
export function useDrag(props: IProps, onUpdateCallBack: (pos: IPosition) => void) {
  const [id] = React.useState<string>(props.id);
  // const [popupId] = React.useState<string>(props.popupId);
  // const [scaleFactor] = React.useState<number>(props.scaleFactor || 1);
  const [position, setPosition] = React.useState<IPosition | null>(null);
  const [skipTargetsLinks] = React.useState<boolean>(props.skipTargetsLinks || false);
  const [skipSourceLinks] = React.useState<boolean>(props.skipSourceLinks || false);
  const [isUpdated, setIsUpdated] = React.useState<boolean>(false);
  const drag = d3
    .drag()
    .on('start', () => onDragStart())
    .on('drag', e => onDrag(e), { passive: true })
    .on('end', () => onDragEnd(), { passive: true });
  let translateX = 0;
  let translateY = 0;
  let node: any;
  // let popup: any;
  // let popupTranslateCoord: ICoord | null;
  let targetLinks = null;
  let sourceLinks = null;
  // let allNodes = null;
  React.useEffect(() => {
    return () => {
      onUnsubscribeDrag();
    };
  }, []);

  React.useEffect(() => {
    if (isUpdated) {
      setIsUpdated(false);
      onSubscribeDrag();
    }
  }, [isUpdated]);

  const onSubscribeDrag = () => {
    const _node = d3.select(`#${id}`);
    _node.on('drag', null);
    _node.call(drag);
  };
  const onUnsubscribeDrag = () => {
    const _node = d3.select(`#${id}`);
    _node.on('drag', null);
  };

  const onUpdate = (pos: IPosition) => {
    setPosition(pos);
    setIsUpdated(true);
  };

  const onDragStart = () => {
    translateX = position?.x || 0;
    translateY = position?.y || 0;
    node = d3.select(`#${id}`);
    // popup = d3.select(`#${popupId}`);
    if (!skipTargetsLinks) {
      targetLinks = d3.selectAll(`path[data-target_id=${id}]`);
    }
    if (!skipSourceLinks) {
      sourceLinks = d3.selectAll(`path[data-source_id=${id}]`);
    }
    // allNodes = d3.selectAll('.topologyNode');
    // if (popup && popup.node()) {
    //   popup.style('display', 'none');
    //   // popupTranslateCoord = {
    //   //   x: Number(popup.attr('data-x')),
    //   //   y: Number(popup.attr('data-y')),
    //   // };
    // }
  };

  // const collisionDetection = (e) => {
  //   console.log(e);
  //   console.log(node);
  //   console.log(allNodes);
  //   allNodes.each(n => {
  //     console.log(n);
  //   });
  // };

  const onDrag = e => {
    if (!node || !e) {
      return;
    }
    const { dx, dy } = e;
    translateX += dx;
    translateY += dy;
    // if (popupTranslateCoord) {
    //   popupTranslateCoord.x += dx;
    //   popupTranslateCoord.y += dy;
    //   popup
    //     .attr('data-x', popupTranslateCoord.x + 'px')
    //     .attr('data-y', popupTranslateCoord.y + 'px')
    //     .style('left', popupTranslateCoord.x + 'px')
    //     .style('top', popupTranslateCoord.y + 'px');
    // }
    // if (allNodes) {
    //   collisionDetection(e);
    // }
    if (targetLinks) {
      targetLinks.each(function (this: any) {
        const _l = d3.select(this);
        const _sX = Number(_l.attr('data-source_x'));
        const _sY = Number(_l.attr('data-source_y'));
        const _tX = Number(_l.attr('data-target_x')) + dx;
        const _tY = Number(_l.attr('data-target_y')) + dy;
        _l.attr('d', `M${_tX} ${_tY} L${_sX} ${_sY}`).attr('data-target_x', _tX).attr('data-target_y', _tY);
      });
    }
    if (sourceLinks) {
      sourceLinks.each(function (this: any) {
        const _l = d3.select(this);
        const _sX = Number(_l.attr('data-source_x')) + dx;
        const _sY = Number(_l.attr('data-source_y')) + dy;
        const _tX = Number(_l.attr('data-target_x'));
        const _tY = Number(_l.attr('data-target_y'));
        _l.attr('d', `M${_tX} ${_tY} L${_sX} ${_sY}`).attr('data-source_x', _sX).attr('data-source_y', _sY);
      });
    }
    node.attr('transform', `translate(${translateX}, ${translateY})`);
  };

  const onDragEnd = () => {
    // if (popup) {
    //   popup.style('display', 'block');
    // }
    node = null;
    // allNodes = null;
    // popup = null;
    // popupTranslateCoord = null;
    onUpdateCallBack({ x: translateX, y: translateY });
  };

  return {
    position,
    onUnsubscribeDrag,
    onUpdate,
  };
}
