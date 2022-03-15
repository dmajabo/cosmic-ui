import FilterGroup from 'app/components/Basic/FilterComponents/FilterGroup';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { PanelContent } from 'app/components/Basic/PanelBar/styles';
import { accountFilterIcon, awsVendorIcon } from 'app/components/SVGIcons/topologyIcons/TopoMapV2Icons/filterPanelIcon';
import { AccountVendorTypes } from 'lib/api/ApiModels/Accounts/apiModel';
import { IMapped_Application, IMapped_Segment, TopoFilterTypes } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import React, { useContext, useMemo } from 'react';
import { PanelHeader, PanelTitle } from '../styles';
import FilterApplicationGroup from './FilterApplicationGroup';
import FilterNodesGroup from './FilterNodesGroup';
import FilterSegmentsGroup from './FilterSegmentsGroup';

interface IProps {}

const FilterComponent: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();
  const userContext = useContext<UserContextState>(UserContext);

  const onSelectFilterOption = (groupType: TopoFilterTypes, v: any, selected: boolean) => {
    topology.onSelectFilterOption(groupType, v, selected);
  };

  const onSelectSegmentFilterOption = (segment: IMapped_Segment, index: number, selected: boolean) => {
    topology.onSelectSegmentFilterOption(segment, index, selected);
  };

  const onApplicationFilterOption = (app: IMapped_Application, index: number, selected: boolean) => {
    topology.onApplicationFilterOption(app, index, selected);
  };

  const IS_VENDOR_AWS = useMemo(() => {
    return userContext.vendors[AccountVendorTypes.AMAZON_AWS] ? true : false;
  }, [userContext.vendors]);

  const IS_VENDOR_MERAKI = useMemo(() => {
    return userContext.vendors[AccountVendorTypes.CISCO_MERAKI] ? true : false;
  }, [userContext.vendors]);

  return (
    <>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>Filters</PanelTitle>
      </PanelHeader>
      <OverflowContainer>
        <PanelContent>
          {/* <FilterGroup maxGroupHeight="260px" defaultOpen label="Entities" styles={{ margin: '0 0 5px 0' }}>
            <FilterEntityGroup type={TopoFilterTypes.Entities} data={entities} onClick={onSelectFilterOption} />
          </FilterGroup> */}
          {IS_VENDOR_MERAKI && (
            <FilterGroup maxGroupHeight="unset" label="Site Segments" styles={{ margin: '0' }} defaultOpen={true}>
              <FilterSegmentsGroup iconStyles={{ width: '20px', height: '20px' }} data={topology.segments} onClick={onSelectSegmentFilterOption} />
            </FilterGroup>
          )}
          {IS_VENDOR_MERAKI && (
            <FilterGroup maxGroupHeight="unset" label="External Segments" styles={{ margin: '0' }} defaultOpen={true}>
              <FilterApplicationGroup iconStyles={{ width: '20px', height: '20px' }} data={topology.applicationFilterOptions} onClick={onApplicationFilterOption} />
            </FilterGroup>
          )}
          {/* <FilterGroup maxGroupHeight="260px" label="Health Severity" styles={{ margin: '0 0 5px 0' }}>
            <FilterSeverityGroup type={TopoFilterTypes.Severity} data={topology.severity} onClick={onSelectFilterOption} />
          </FilterGroup> */}

          {IS_VENDOR_AWS && (
            <>
              <FilterGroup maxGroupHeight="unset" label="Regions" styles={{ margin: '0 0 5px 0' }}>
                <FilterNodesGroup type={TopoFilterTypes.Regions} icon={awsVendorIcon} data={topology.regions} onClick={onSelectFilterOption} />
              </FilterGroup>
              <FilterGroup maxGroupHeight="unset" label="Accounts" styles={{ margin: '0 0 5px 0' }}>
                <FilterNodesGroup type={TopoFilterTypes.Accounts} icon={accountFilterIcon} data={topology.accounts} onClick={onSelectFilterOption} />
              </FilterGroup>
            </>
          )}
        </PanelContent>
      </OverflowContainer>
    </>
  );
};

export default React.memo(FilterComponent);
