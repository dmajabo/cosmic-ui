import * as React from 'react';
import { PolicyContextType, usePolicyContext } from './usePolicy';

export interface SelectPolicyType {
  policy: PolicyContextType | null;
}

export const SelectPolicyContext = React.createContext<SelectPolicyType>({
  policy: null,
});

export const usePolicyDataContext = () => React.useContext(SelectPolicyContext);

export const usePolicyActions = (): SelectPolicyType => {
  const policyData = usePolicyContext();
  return {
    policy: policyData,
  };
};

export const PolicyProvider: React.FC<{ actions: SelectPolicyType }> = props => {
  return <SelectPolicyContext.Provider value={props.actions}>{props.children}</SelectPolicyContext.Provider>;
};
