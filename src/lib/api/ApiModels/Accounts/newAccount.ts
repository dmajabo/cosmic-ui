import { AccountVendorTypes } from './apiModel';

export const createNewCiscoMerakiAccount = () => {
  return {
    id: '',
    vendor: AccountVendorTypes.CISCO_MERAKI,
    name: '',
    description: '',
    // status: null,
    merakiPol: {
      apiKey: '',
      flowlogPol: {
        enableSyslog: false,
      },
    },
  };
};

export const createNewAwsAccount = () => {
  return {
    id: '',
    vendor: AccountVendorTypes.AMAZON_AWS,
    name: '',
    description: '',
    // status: null,
    awsPol: {
      username: '',
      accessKey: '',
      secret: '',
      regions: [],
      flowlogPol: {
        enable: false,
      },
    },
  };
};
