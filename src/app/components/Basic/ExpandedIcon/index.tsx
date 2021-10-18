import React from 'react';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';

const ExpandedIcon: React.FC<{}> = () => {
  return <>{arrowBottomIcon}</>;
};

export default React.memo(ExpandedIcon);
