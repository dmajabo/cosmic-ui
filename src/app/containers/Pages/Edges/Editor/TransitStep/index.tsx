import React from 'react';
import { Map } from 'app/containers/Pages/DashboardPage/components/Map/Map';
interface Props {
  // name: string;
  // type: string;
  onChange: (value: any | null, field: string) => void;
}

const TransitStep: React.FC<Props> = ({ onChange }) => {
  const onInputChange = (value: string | null) => {
    onChange(value, 'name');
  };

  return (
    <>
      <Map />
    </>
  );
};
export default React.memo(TransitStep);
