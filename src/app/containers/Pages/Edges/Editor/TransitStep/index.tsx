import React from 'react';
import { Map } from 'app/containers/Pages/DashboardPage/components/Map/Map';
import { PanelRow } from './styles';
import CheckBox from 'app/components/Inputs/Checkbox/CheckBox';
import { PanelContentLabel } from '../FormPanel/styles';
import { FirewallRegionsValues } from '../model';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ISelectedListItem } from 'lib/models/general';
interface Props {
  // name: string;
  // type: string;
  firewall: boolean;
  firewallRegion: string;
  onChange: (value: any, field: string) => void;
}

const TransitStep: React.FC<Props> = (props: Props) => {
  const onFirewallChange = (v: boolean) => {
    props.onChange(v, 'firewall');
  };

  const onFirewallRegionChange = (v: ISelectedListItem<string>) => {
    props.onChange(v.value, 'firewallRegion');
  };

  return (
    <>
      <PanelRow>
        <CheckBox label="Add Firewall in each edge region" isChecked={props.firewall} toggleCheckboxChange={onFirewallChange} />
        <MatSelect
          id="firewallRegion"
          value={props.firewallRegion}
          options={FirewallRegionsValues}
          onChange={onFirewallRegionChange}
          styles={{ width: '244px', height: '50px', minHeight: '50px', margin: '0 0 0 20px' }}
          selectClaassName="fullHeight"
        />
      </PanelRow>
      <PanelContentLabel>Map</PanelContentLabel>
      <Map />
    </>
  );
};
export default React.memo(TransitStep);
