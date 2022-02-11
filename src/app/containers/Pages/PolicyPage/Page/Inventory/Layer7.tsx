import React from 'react';
import H2 from 'app/components/Basic/H2';

interface Props {}

const Layer7 = (props: Props) => {
  return (
    <>
      <H2>Layer 7</H2>
    </>
  );
};

export default React.memo(Layer7);
