import FilterGroup from 'app/components/Basic/FilterComponents/FilterGroup';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
// import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { PanelContent } from 'app/components/Basic/PanelBar/styles';
import { FilterEntityOptions, IMapped_Application, IMapped_Segment, TopoFilterTypes } from 'lib/hooks/Topology/models';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { cloneDeep } from 'lodash';
import React from 'react';
import { PanelHeader, PanelTitle } from '../styles';
import FilterApplicationGroup from './FilterApplicationGroup';
import FilterSegmentsGroup from './FilterSegmentsGroup';

interface IProps {}

const FilterComponent: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();

  const onSelectFilterOption = (groupType: TopoFilterTypes, v: any, selected: boolean) => {
    topology.onSelectFilterOption(groupType, v, selected);
  };

  const onSelectSegmentFilterOption = (segment: IMapped_Segment, index: number, selected: boolean) => {
    topology.onSelectSegmentFilterOption(segment, index, selected);
  };

  const onApplicationFilterOption = (app: IMapped_Application, index: number, selected: boolean) => {
    topology.onApplicationFilterOption(app, index, selected);
  };

  //TODO: Do this if only Meraki is configured
  const entities: FilterEntityOptions = cloneDeep(topology.entities);
  entities.peer_connections.hide = true;
  entities.transit.hide = true;
  entities.vpc.hide = true;
  entities.web_acls.hide = true;

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
          <FilterGroup maxGroupHeight="unset" label="Site Segments" styles={{ margin: '0' }}>
            <FilterSegmentsGroup iconStyles={{ width: '20px', height: '20px' }} data={topology.segments} onClick={onSelectSegmentFilterOption} />
          </FilterGroup>
          <FilterGroup maxGroupHeight="unset" label="External Segments" styles={{ margin: '0' }}>
            <FilterApplicationGroup iconStyles={{ width: '20px', height: '20px' }} data={topology.applicationFilterOptions} onClick={onApplicationFilterOption} />
          </FilterGroup>
          {/* <FilterGroup maxGroupHeight="260px" label="Health Severity" styles={{ margin: '0 0 5px 0' }}>
            <FilterSeverityGroup type={TopoFilterTypes.Severity} data={topology.severity} onClick={onSelectFilterOption} />
          </FilterGroup> */}

          {/* TODO: Hide this when only Meraki is configured */}

          {/* <FilterGroup maxGroupHeight="unset" label="Regions" styles={{ margin: '0 0 5px 0' }}>
            <FilterNodesGroup type={TopoFilterTypes.Regions} icon={regionFilterIcon} data={topology.regions} onClick={onSelectFilterOption} />
          </FilterGroup>
          <FilterGroup maxGroupHeight="unset" label="Accounts" styles={{ margin: '0 0 5px 0' }}>
            <FilterNodesGroup type={TopoFilterTypes.Accounts} icon={accountFilterIcon} data={topology.accounts} onClick={onSelectFilterOption} />
          </FilterGroup> */}
        </PanelContent>
      </OverflowContainer>
    </>
  );
};

export default React.memo(FilterComponent);
