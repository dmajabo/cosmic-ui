import React from 'react';
import { NODES_CONSTANTS } from '../../../../model';
import { IDeviceNode } from 'lib/hooks/Topology/models';
// import { buildPeerLinks, IPeerLink } from './helper';
interface Props {
  // item: INetworkVNetworkPeeringConnectionNode;
  item: IDeviceNode;
}

const DeviceNode: React.FC<Props> = (props: Props) => {
  // const [links, setLinks] = React.useState<IPeerLink[]>([]);
  // const [vpsOffsetY, setVpcOffsetY] = React.useState<number>(0);

  // React.useEffect(() => {
  //   const _links = buildPeerLinks(props.item, props.dataItem);
  //   const _offsetY = props.dataItem.peerConnectionsRows.rows * (NODES_CONSTANTS.DEVICE.collapse.r * 2) + 20;
  //   setVpcOffsetY(_offsetY);
  //   setLinks(_links);
  // }, []);
  return (
    <>
      {/* {links.map(it => (
        <PeerConnectionLink key={`${it.from.id}${it.to.id}peerLink`} from={it.from} to={it.to} offsetY={vpsOffsetY} />
      ))} */}
      <g transform={`translate(${props.item.x}, ${props.item.y})`}>
        <use href={`#bg${NODES_CONSTANTS.DEVICE.type}`} width={NODES_CONSTANTS.DEVICE.collapse.width} height={NODES_CONSTANTS.DEVICE.collapse.height} />
        <use
          href={`#${NODES_CONSTANTS.DEVICE.type}`}
          width={NODES_CONSTANTS.DEVICE.collapse.iconWidth}
          height={NODES_CONSTANTS.DEVICE.collapse.iconHeight}
          x={NODES_CONSTANTS.DEVICE.collapse.iconOffsetX}
          y={NODES_CONSTANTS.DEVICE.collapse.iconOffsetY}
        />
        <foreignObject
          width={NODES_CONSTANTS.DEVICE.labelHtmlStyles.width}
          height={NODES_CONSTANTS.DEVICE.labelHtmlStyles.height}
          x={NODES_CONSTANTS.DEVICE.labelHtmlStyles.x}
          y={NODES_CONSTANTS.DEVICE.labelHtmlStyles.y}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
            }}
            title={props.item.name}
          >
            <span
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                margin: 'auto',
                color: NODES_CONSTANTS.DEVICE.labelHtmlStyles.fill,
                fontSize: NODES_CONSTANTS.DEVICE.labelHtmlStyles.fontSize + 'px',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                fontWeight: 500,
              }}
            >
              {props.item.name || props.item.extId}
            </span>
          </div>
        </foreignObject>
      </g>
    </>
  );
};

export default React.memo(DeviceNode);
