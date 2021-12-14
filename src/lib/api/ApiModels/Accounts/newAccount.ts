import { AccountVendorTypes, AwsLogStorageType, IAWS_Account, IMeraki_Account } from './apiModel';

export const createNewCiscoMerakiAccount = () => {
  const _obj: IMeraki_Account = {
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
  return _obj;
};

export const createNewAwsAccount = () => {
  const _obj: IAWS_Account = {
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
        logStorageType: AwsLogStorageType.CLOUD_WATCH,
        logGroupName: '',
        storageBucketName: '',
      },
    },
  };
  return _obj;
};
