import React from 'react';
import { NODES_CONSTANTS } from 'app/containers/Pages/TopologyPage/TopoMapV2/model';

interface Props {
  headerHeight: number;
  showWebAcls: boolean;
  webAclTotalHeight: number;
  offsetX: number;
  children: React.ReactNode;
}

const PeerContainer: React.FC<Props> = (props: Props) => {
  const [offsetTop, setOffsetTop] = React.useState<number>(NODES_CONSTANTS.REGION.expanded.contentPadding + props.headerHeight);

  React.useEffect(() => {
    if (props.showWebAcls) {
      const _off = NODES_CONSTANTS.REGION.expanded.contentPadding * 2 + props.headerHeight + props.webAclTotalHeight;
      setOffsetTop(_off);
    } else {
      const _off = NODES_CONSTANTS.REGION.expanded.contentPadding + props.headerHeight;
      setOffsetTop(_off);
    }
  }, [props.showWebAcls, props.webAclTotalHeight]);

  return <g transform={`translate(${props.offsetX}, ${offsetTop})`}>{props.children}</g>;
};

export default React.memo(PeerContainer);
