import React from 'react';
// import { TOPOLOGY_IDS } from 'components/Map/model';
// import DeviceFilter from './DeviceFilter';
// import VNetFilter from './VNetFilter';
// import WEdgeFilter from './WEdgeFilter';
// import OrganizationFilter from './OrganizationFilter';

const DefsComponent: React.FC<{}> = () => {
  return (
    <defs>
      {/* <DeviceFilter id={TOPOLOGY_IDS.DEVICE_FILTER} />
      <VNetFilter id={TOPOLOGY_IDS.VNET_FILTER} />
      <WEdgeFilter id={TOPOLOGY_IDS.WEdge_FILTER} />
      <OrganizationFilter id={TOPOLOGY_IDS.Organization_FILTER} /> */}
      <path id="vntHeader" fill="none" stroke="red" d="M10 90 H50 M30 90 H70" />
    </defs>
  );
};

export default React.memo(DefsComponent);
