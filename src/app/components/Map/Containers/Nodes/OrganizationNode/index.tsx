import React from 'react';
import { IOrganization } from 'lib/models/topology';
// import { IPosition, NODES_CONSTANTS } from 'app/components/Map/model';
// import { useDrag } from 'app/components/Map/hooks/useDrag';
// import CISCO_MERAKI from './Cisco_MERAKI';
// import AWS from './AWS';
// import NodeTooltipPortal from 'components/Basic/NodeTooltipPortal';
// import { IPopupDisplay } from 'lib/models/general';
// import OrganizationPopup from '../../Popups/OrganizationPopup';

interface IProps {
  index: number;
  dataItem: IOrganization;
  // onUpdateNode: (_node: IOrganization, _position: IPosition) => void;
}
const OrganizationNode: React.FC<IProps> = (props: IProps) => {
  return null;
  // const { onUpdate, onUnsubscribeDrag } = useDrag(
  //   {
  //     id: `${NODES_CONSTANTS.Organization.type}${props.dataItem.id}`,
  //     // popupId: `popupContainer${props.dataItem.id}`,
  //   },
  //   (e: IPosition) => onUpdatePosition(e),
  // );
  // const [pos, setPosition] = React.useState<IPosition>({ x: props.dataItem.x, y: props.dataItem.y });
  // // const [showPopup, setShowPopup] = React.useState<IPopupDisplay>({ show: false, x: 0, y: 0 });

  // React.useEffect(() => {
  //   return () => {
  //     onUnsubscribeDrag();
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (pos) {
  //     onUpdate(pos);
  //   }
  // }, [pos]);

  // React.useEffect(() => {
  //   if (props.dataItem.x !== pos.x || props.dataItem.y !== pos.y) {
  //     onUpdate({ x: props.dataItem.x, y: props.dataItem.y });
  //   }
  // }, [props.dataItem]);

  // const onUpdatePosition = (_pos: IPosition) => {
  //   if (props.dataItem.x === _pos.x && props.dataItem.y === _pos.y) {
  //     setPosition(_pos);
  //     return;
  //   }
  //   // props.onUpdateNode(props.dataItem, _pos);
  // };

  // // const onTogglePopup = (e: React.MouseEvent, show: boolean) => {
  // //   if (!showPopup.show && !show) { return; }
  // //   const _x = show ? e.clientX : 0;
  // //   const _y = show ? e.clientY : 0;
  // //   setShowPopup({ show, x: _x, y: _y });
  // // };

  // if (!pos) {
  //   return null;
  // }
  // return (
  //   <>
  //     <g id={`${NODES_CONSTANTS.Organization.type}${props.dataItem.id}`} transform={`translate(${pos.x}, ${pos.y})`} data-type={NODES_CONSTANTS.Organization.type}>
  //       <g
  //       // onMouseEnter={e => onTogglePopup(e, true)}
  //       // onMouseLeave={e => onTogglePopup(e, false)}
  //       >
  //         {props.dataItem.vendorType === VendorTypes.MERAKI && <>{CISCO_MERAKI}</>}
  //         {props.dataItem.vendorType === VendorTypes.AWS && <>{AWS}</>}
  //       </g>
  //     </g>
  //     {/* {showPopup.show && (
  //       <NodeTooltipPortal id={props.dataItem.id} x={showPopup.x} y={showPopup.y}>
  //         <OrganizationPopup dataItem={props.dataItem} />
  //       </NodeTooltipPortal>
  //     )} */}
  //   </>
  // );
};

export default React.memo(OrganizationNode);
