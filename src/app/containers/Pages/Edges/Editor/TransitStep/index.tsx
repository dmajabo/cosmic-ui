import React from 'react';
import { PanelRow } from './styles';
import CheckBox from 'app/components/Inputs/Checkbox/CheckBox';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';
import { Input, InputWrapper, TextInputWrapper } from 'app/components/Inputs/TextInput/styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import ModalComponent from 'app/components/Modal';
import TransitionTable from './TransitionTable';
import MatSelect from 'app/components/Inputs/MatSelect';
import { NwServiceT, NwServicesVendor, DeploymentTypes } from 'lib/api/ApiModels/Edges/apiModel';
import { EmptyMessage } from '../Components/styles';
import { FormRow } from '../PolicyStep/styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import TransitModalWindow from './TransitModalWindow';

interface Props {
  serviceType: NwServiceT;
  serviceVendor: NwServicesVendor;
  transitType: DeploymentTypes;
  regionCodes: string[];
  wedgesIds: string[];
  selectedAccount: string;
  onChange: (value: any, field: string) => void;
  onChangeRegions: (value: any, option: DeploymentTypes) => void;
  onChangeNetwork: (value: any, field: string) => void;
}

const TransitStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [showCreator, setShowCreator] = React.useState<boolean>(false);

  const onFirewallChange = (v: boolean) => {
    const _v = v ? NwServiceT.FIREWALL : null;
    props.onChangeNetwork(_v, 'serviceType');
  };

  const onAccountChange = (v: string) => {
    props.onChange(v, 'controllerName');
  };

  const onAddTransits = (r: string[], option: DeploymentTypes) => {
    props.onChangeRegions(r, option);
    setShowCreator(false);
  };

  const onAddGroup = () => {
    setShowCreator(true);
  };

  const onClose = () => {
    setShowCreator(false);
  };

  return (
    <>
      <PanelRow>
        <CheckBox label="Add Firewall in each edge region" isChecked={props.serviceType === NwServiceT.FIREWALL} toggleCheckboxChange={onFirewallChange} />
        <TextInputWrapper style={{ width: '244px', height: '50px', minHeight: '50px', margin: '0 0 0 20px' }}>
          <InputWrapper>
            <Input id="poloAlto" name="poloAlto" type="text" value="Palo Alto" onChange={() => {}} readOnly height="50px" padding="8px 24px 8px 56px" />
            <IconWrapper width="24px" height="24px" styles={{ position: 'absolute', top: 'calc(50% - 12px)', left: '20px', pointerEvents: 'none' }} icon={poloAltoIcon()} />
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
        required
      />
      {(props.transitType === DeploymentTypes.Regions && props.regionCodes && props.regionCodes.length) ||
      (props.transitType === DeploymentTypes.Wedge && props.wedgesIds && props.wedgesIds.length) ? (
        <TransitionTable type={props.transitType} wedges={edges.wedges} selectedWedgesIds={props.wedgesIds} regions={edges.regions} selectedRegions={props.regionCodes} />
      ) : (
        <EmptyMessage>There is no transit yet. To add transit click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={edges.regions && edges.regions.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton icon={plusIcon} label="Add Transit" onClick={onAddGroup} />
      </FormRow>
      {showCreator && (
        <ModalComponent
          showHeader
          title="Add Transit"
          showCloseButton
          modalStyles={{ maxWidth: '800px', maxHeight: '90vh', padding: '40px' }}
          useFadeAnimation
          id="sitesModalWindow"
          open={showCreator}
          onClose={onClose}
        >
          <TransitModalWindow selectedRegion={props.regionCodes} selectedWedgeIds={props.wedgesIds} onAddTransits={onAddTransits} />
        </ModalComponent>
      )}
    </>
  );
};
export default React.memo(TransitStep);
