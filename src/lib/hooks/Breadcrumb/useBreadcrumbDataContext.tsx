import * as React from 'react';
import { BreadCrumbContextType, useBreadCrumbContext } from './useBreadCrumb';

export interface SelectBreadCrumbType {
  breadcrumb: BreadCrumbContextType | null;
}

export const SelectBreadCrumbContext = React.createContext<SelectBreadCrumbType>({
  breadcrumb: null,
});

export const useBreadCrumbDataContext = () => React.useContext(SelectBreadCrumbContext);

export const useBreadCrumbActions = (): SelectBreadCrumbType => {
  const breadcrumbData = useBreadCrumbContext();
  return {
    breadcrumb: breadcrumbData,
  };
};

export const BreadCrumbProvider: React.FC<{ actions: SelectBreadCrumbType }> = props => {
  return <SelectBreadCrumbContext.Provider value={props.actions}>{props.children}</SelectBreadCrumbContext.Provider>;
};
