import { IDeviceNode, INetworkGroupNode, IVnetNode, IWedgeNode } from 'lib/models/topology';
import * as d3 from 'd3';
// import { TOPOLOGY_IDS } from '../model';
// export const drawSimulation = (nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[], links: ILink[]) => {
//   if (!nodes || !nodes.length) return;
//   const svg = d3.select(`#${TOPOLOGY_IDS.SVG}`);
//   drawNodes(svg, nodes);
// };

// function drawNodes(svg, items) {
//   const nc = svg.select('#nodesContainer');
//   nc.selectAll('*').remove();
//   const node = nc.selectAll('g').data(
//     items.filter(it => it.visible),
//     (d: IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode) => d,
//   );
//   const nodeEnter = node
//     .enter()
//     .append('g')
//     .attr('id', d => `${d.nodeType}${d.id}`)
//     .classed('topologyNode', true)
//     .attr('transform', d => `translate(${d.x},${d.y})`)
//     .attr('data-type', d => d.nodeType)
//     // .attr('cursor', d => {
//     //   if (
//     //     wholeSituation ||
//     //     d.data.type === NODETYPE.GOAL ||
//     //     (d.data.type === NODETYPE.SITUATION && !d.data.enabled) ||
//     //     (d.data.type === NODETYPE.SITUATION && !d.data.isValid) ||
//     //     (d.data.type === NODETYPE.SITUATION && !d.data.isDesigionTableValid)
//     //   )
//     //     return 'not-allowed';
//     //   return 'pointer';
//     // })
//     .attr('pointer-events', 'all');
//   // .on('click', d => {
//   //   if (
//   //     d.data.type === NODETYPE.GOAL ||
//   //     (d.data.type === NODETYPE.SITUATION && !d.data.enabled) ||
//   //     (d.data.type === NODETYPE.SITUATION && !d.data.isValid) ||
//   //     (d.data.type === NODETYPE.SITUATION && !d.data.isDesigionTableValid)
//   //   ) {
//   //     return d3.event.preventDefault();
//   //   }
//   //   return onClick(d);
//   // });
//   drawNode(nodeEnter);
// }

export function drawNode(ref, item: IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode) {
  const c = d3.select(ref);
  const drag = node => {
    let translateX = null;
    let translateY = null;
    const dragstarted = e => {
      translateX = node.x;
      translateY = node.y;
    };

    const dragged = e => {
      const { dx, dy } = e;
      translateX += dx;
      translateY += dy;
      c.attr('transform', `translate(${translateX}, ${translateY})`);
    };

    const dragended = e => {
      translateX = null;
      translateY = null;
    };

    return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
  };
  c.selectAll('*').remove();
  if (!item.visible) return;
  c.append('circle').attr('r', 50).attr('fill', 'red').call(drag(item));
  // const nodeContent = g.append('g').classed('node', true);
  // visualizationNodeContent(nodeContent);
}
// <g id={`${NODES_CONSTANTS.NETWORK_GROUP.type}${props.dataItem.id}`} className="topologyNode" transform={`translate(${pos.x}, ${pos.y})`} data-type={NODES_CONSTANTS.NETWORK_GROUP.type}>
//         {props.dataItem.devices && props.dataItem.devices.length && !props.dataItem.collapsed && <GroupDevicesContainer dataItem={props.dataItem} onClickDevice={onClickDevice} />}
//         <g
//           // onMouseEnter={e => onTogglePopup(e, true)}
//           // onMouseLeave={e => onTogglePopup(e, false)}
//           onClick={onExpandCollapse}
//           style={{ cursor: 'pointer' }}
//           pointerEvents="all"
//         >
//           <>{CISCO_MERAKI}</>
//         </g>
//         {props.dataItem.collapsed && <NodeName name={props.dataItem.name} dx={-NODES_CONSTANTS.NETWORK_GROUP.spaceX / 2} dy={NODES_CONSTANTS.NETWORK_GROUP.r * 2} />}
//       </g>
