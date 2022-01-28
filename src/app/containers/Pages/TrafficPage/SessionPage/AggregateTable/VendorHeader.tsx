import React from 'react';
import { VendorHeaderStyles, VendorLabel } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { getVendorObject } from './helper';
import { IState } from './models';

interface Props {
  label: AccountVendorTypes;
}
const VendorHeader: React.FC<Props> = (props: Props) => {
  const [data, setData] = React.useState<IState>(null);
  React.useEffect(() => {
    if (!props.label) return;
    const _obj = getVendorObject(props.label);
    setData(_obj);
  }, [props.label]);

  return (
    <VendorHeaderStyles>
      {data && data.icon && <IconWrapper width="28px" height="28px" icon={data.icon} styles={{ margin: '0 12px 0 0' }} />}
      {data && <VendorLabel>{data.label}</VendorLabel>}
    </VendorHeaderStyles>
  );
};

export default React.memo(VendorHeader);
