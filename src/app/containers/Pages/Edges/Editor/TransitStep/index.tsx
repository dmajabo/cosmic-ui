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
import MatSelect from 'app/components/Inputs/MatSelect';
import { NwServiceT, NwServicesVendor } from 'lib/api/ApiModels/Edges/apiModel';

interface Props {
  service_type: NwServiceT;
  service_vendor: NwServicesVendor;
  regionCodes: string[];
  selectedAccount: string;
  onChange: (value: any, field: string) => void;
  onChangeNetwork: (value: any, field: string) => void;
}

const TransitStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [showLargeWindow, setShowLargeWindow] = React.useState<boolean>(false);
  const onFirewallChange = (v: boolean) => {
    const _v = v ? NwServiceT.FIREWALL : null;
    props.onChangeNetwork(_v, 'service_type');
  };

  const onAccountChange = (v: string) => {
    props.onChange(v, 'controller_name');
  };

  const onSelectRegion = (r: string[]) => {
    props.onChange(r, 'region_code');
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
        <CheckBox label="Add Firewall in each edge region" isChecked={props.service_type === NwServiceT.FIREWALL} toggleCheckboxChange={onFirewallChange} />
        <TextInputWrapper style={{ width: '244px', height: '50px', minHeight: '50px', margin: '0 0 0 20px' }}>
          <InputWrapper>
            <Input id="poloAlto" name="poloAlto" type="text" value="Palo Alto" onChange={() => {}} readOnly height="50px" padding="8px 24px 8px 56px" />
            <IconWrapper width="24px" height="24px" styles={{ position: 'absolute', top: 'calc(50% - 12px)', left: '20px', pointerEvents: 'none' }} icon={poloAltoIcon} />
          </InputWrapper>
        </TextInputWrapper>
      </PanelRow>
      <MatSelect
        id="accounts"
        label="Account"
        value={props.selectedAccount}
        options={edges.awsAccounts}
        disabled={!edges.awsAccounts || !edges.awsAccounts.length}
        onChange={onAccountChange}
        styles={{ height: '72px', minHeight: '72px', margin: '0 0 20px 0' }}
        selectClaassName="withLabel"
      />
      <PanelContentLabel>Map</PanelContentLabel>
      <Map regions={edges.regions} selectedRegions={props.regionCodes} onSelectRegion={onSelectRegion} onOpenLargeWindow={onOpenModal} />
      {props.regionCodes && props.regionCodes.length ? <TransitionTable regions={edges.regions} selectedRegions={props.regionCodes} /> : null}
      {showLargeWindow && (
        <ModalComponent showHeader title="Map" showCloseButton modalStyles={{ maxWidth: '80vw', maxHeight: '90vh' }} useFadeAnimation id="mapModalWindow" open={showLargeWindow} onClose={onClose}>
          <Map
            showFooterRow
            zoom={4}
            mapWrapStyles={{ height: 'calc(100% - 60px)', margin: '0' }}
            hideLargeButton
            regions={edges.regions}
            selectedRegions={props.regionCodes}
            onSelectRegion={onSelectRegion}
          />
        </ModalComponent>
      )}
    </>
  );
};
export default React.memo(TransitStep);
