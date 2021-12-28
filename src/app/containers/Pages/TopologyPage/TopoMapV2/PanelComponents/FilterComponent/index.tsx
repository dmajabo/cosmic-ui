import React from 'react';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
// import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { PanelContent } from 'app/components/Basic/PanelBar/styles';
import { PanelHeader, PanelTitle } from '../styles';
import FilterGroup from 'app/components/Basic/FilterComponents/FilterGroup';
import { useTopologyV2DataContext } from 'lib/hooks/Topology/useTopologyDataContext';
import { TopoFilterTypes } from 'lib/hooks/Topology/models';
import FilterEntityGroup from './FilterEntityGroup';
import FilterSeverityGroup from './FilterSeverityGroup';

interface IProps {}

const FilterComponent: React.FC<IProps> = (props: IProps) => {
  const { topology } = useTopologyV2DataContext();

  const onSelectFilterOption = (groupType: TopoFilterTypes, type: any, selected: boolean) => {
    topology.onSelectFilterOption(groupType, type, selected);
  };

  return (
    <>
      <PanelHeader direction="column" align="unset">
        <PanelTitle>Filters</PanelTitle>
      </PanelHeader>
      <OverflowContainer>
        <PanelContent>
          <FilterGroup maxGroupHeight="260px" defaultOpen label="Entities" styles={{ margin: '0 0 5px 0' }}>
            <FilterEntityGroup type={TopoFilterTypes.Entities} data={topology.entities} onClick={onSelectFilterOption} />
          </FilterGroup>
          <FilterGroup maxGroupHeight="260px" defaultOpen label="Health Severity" styles={{ margin: '0 0 5px 0' }}>
            <FilterSeverityGroup type={TopoFilterTypes.Severity} data={topology.severity} onClick={onSelectFilterOption} />
          </FilterGroup>
        </PanelContent>
      </OverflowContainer>
    </>
  );
};

export default React.memo(FilterComponent);
