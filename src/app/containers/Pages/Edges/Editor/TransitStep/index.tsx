import React from 'react';
import { PanelRow } from './styles';
import CheckBox from 'app/components/Inputs/Checkbox/CheckBox';
import { PanelContentLabel } from '../FormPanel/styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import Map from './Map';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';
import { Input, InputWrapper, TextInputWrapper } from 'app/components/Inputs/TextInput/styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import ModalComponent from 'app/components/Modal';
import TransitionTable from './TransitionTable';

interface Props {
  firewall: boolean;
  firewallRegion: string;
  selectedRegions: string[];
  onChange: (value: any, field: string) => void;
}

const TransitStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [showLargeWindow, setShowLargeWindow] = React.useState<boolean>(false);
  const onFirewallChange = (v: boolean) => {
    props.onChange(v, 'firewall');
  };

  // const onFirewallRegionChange = (v: ISelectedListItem<string>) => {
  //   props.onChange(v.value, 'firewallRegion');
  // };

  const onSelectRegion = (r: string[]) => {
    props.onChange(r, 'selectedRegions');
  };

  const onOpenModal = () => {
    setShowLargeWindow(true);
  };

  const onClose = () => {
    setShowLargeWindow(false);
  };

  return (
    <>
      <PanelRow>
        <CheckBox label="Add Firewall in each edge region" isChecked={props.firewall} toggleCheckboxChange={onFirewallChange} />
        <TextInputWrapper style={{ width: '244px', height: '50px', minHeight: '50px', margin: '0 0 0 20px' }}>
          <InputWrapper>
            <Input id="poloAlto" name="poloAlto" type="text" value="Polo Alto" onChange={() => {}} readOnly height="50px" padding="8px 24px 8px 56px" />
            <IconWrapper width="24px" height="24px" styles={{ position: 'absolute', top: 'calc(50% - 12px)', left: '20px', pointerEvents: 'none' }} icon={poloAltoIcon} />
          </InputWrapper>
        </TextInputWrapper>
        {/* <MatSelect
          id="firewallRegion"
          value={props.firewallRegion}
          options={FirewallRegionsValues}
          onChange={onFirewallRegionChange}
          styles={{ width: '244px', height: '50px', minHeight: '50px', margin: '0 0 0 20px' }}
          selectClaassName="fullHeight"
        /> */}
      </PanelRow>
      <PanelContentLabel>Map</PanelContentLabel>
      <Map regions={edges.regions} selectedRegions={props.selectedRegions} onSelectRegion={onSelectRegion} onOpenLargeWindow={onOpenModal} />
      {props.selectedRegions && props.selectedRegions.length ? <TransitionTable regions={edges.regions} selectedRegions={props.selectedRegions} /> : null}
      {showLargeWindow && (
        <ModalComponent showHeader title="Map" showCloseButton modalStyles={{ maxWidth: '80vw', maxHeight: '90vh' }} useFadeAnimation id="mapModalWindow" open={showLargeWindow} onClose={onClose}>
          <Map
            showFooterRow
            zoom={4}
            mapWrapStyles={{ height: 'calc(100% - 60px)', margin: '0' }}
            hideLargeButton
            regions={edges.regions}
            selectedRegions={props.selectedRegions}
            onSelectRegion={onSelectRegion}
          />
        </ModalComponent>
      )}
    </>
  );
};
export default React.memo(TransitStep);
