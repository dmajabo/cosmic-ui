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
import { NwServiceT, DeploymentTypes, IDeploymentP } from 'lib/api/ApiModels/Edges/apiModel';
import { EmptyMessage } from '../Components/styles';
import { FormRow } from '../PolicyStep/styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import TransitModalWindow from './TransitModalWindow';
import { createNewDeploymentPolicy } from '../helper';
import { jsonClone } from 'lib/helpers/cloneHelper';

interface Props {
  deploymentPolicy: IDeploymentP[];
}

const TransitStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [deployment, setDeployment] = React.useState<IDeploymentP>(null);
  const [showCreator, setShowCreator] = React.useState<boolean>(false);

  React.useEffect(() => {
    // To do
    const _d: IDeploymentP = props.deploymentPolicy && props.deploymentPolicy.length ? props.deploymentPolicy[0] : createNewDeploymentPolicy();
    setCurrentIndex(0);
    setDeployment(_d);
  }, [props.deploymentPolicy]);

  const onFirewallChange = (v: boolean) => {
    const _d: IDeploymentP = jsonClone(deployment);
    _d.nwServicesPolicy[0].serviceType = v ? NwServiceT.FIREWALL : null;
    setDeployment(_d);
    edges.onChangeDeployment(_d, currentIndex);
  };

  const onAccountChange = (v: string) => {
    const _d: IDeploymentP = jsonClone(deployment);
    _d.controllerName = v;
    setDeployment(_d);
    edges.onChangeDeployment(_d, currentIndex);
  };

  const onAddTransits = (r: string[], option: DeploymentTypes) => {
    const _d: IDeploymentP = jsonClone(deployment);
    _d.deploymentType = option;
    if (option === DeploymentTypes.NEW_REGIONS) {
      _d.regionCode = r;
      _d.wanGwExtIds = [];
    }
    if (option === DeploymentTypes.EXISTING_GWS) {
      _d.regionCode = [];
      _d.wanGwExtIds = r;
    }
    setShowCreator(false);
    setDeployment(_d);
    edges.onChangeDeployment(_d, currentIndex);
  };

  const onAddGroup = () => {
    setShowCreator(true);
  };

  const onClose = () => {
    setShowCreator(false);
  };

  if (!deployment) return null;

  return (
    <>
      <MatSelect
        id="accounts"
        label="Account"
        value={deployment.controllerName}
        options={edges.awsAccounts}
        disabled={!edges.awsAccounts || !edges.awsAccounts.length}
        onChange={onAccountChange}
        styles={{ height: '72px', minHeight: '72px', margin: '0 0 20px 0' }}
        selectClaassName="withLabel"
        required
      />
      <PanelRow>
        <CheckBox label="Add Firewall in each edge region" isChecked={deployment.nwServicesPolicy[0].serviceType === NwServiceT.FIREWALL} toggleCheckboxChange={onFirewallChange} />
        <TextInputWrapper style={{ width: '244px', height: '50px', minHeight: '50px', margin: '0 0 0 20px' }}>
          <InputWrapper>
            <Input
              id="serviceVendor"
              name="serviceVendor"
              type="text"
              value="Palo Alto" // {deployment.nwServicesPolicy.serviceVendor}
              onChange={() => {}}
              readOnly
              height="50px"
              padding="8px 24px 8px 56px"
            />
            <IconWrapper width="24px" height="24px" styles={{ position: 'absolute', top: 'calc(50% - 12px)', left: '20px', pointerEvents: 'none' }} icon={poloAltoIcon()} />
          </InputWrapper>
        </TextInputWrapper>
      </PanelRow>

      {(deployment.deploymentType === DeploymentTypes.NEW_REGIONS && deployment.regionCode && deployment.regionCode.length) ||
      (deployment.deploymentType === DeploymentTypes.EXISTING_GWS && deployment.wanGwExtIds && deployment.wanGwExtIds.length) ? (
        <TransitionTable type={deployment.deploymentType} wedges={edges.wedges} selectedWedgesIds={deployment.wanGwExtIds} regions={edges.regions} selectedRegions={deployment.regionCode} />
      ) : (
        <EmptyMessage>There are no edges yet. To add edge click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={edges.regions && edges.regions.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton icon={plusIcon} label="Add Edge" onClick={onAddGroup} />
      </FormRow>
      {showCreator && (
        <ModalComponent showHeader title="Add Edge" showCloseButton modalStyles={{ maxWidth: '800px', maxHeight: '90vh' }} useFadeAnimation id="sitesModalWindow" open={showCreator} onClose={onClose}>
          <TransitModalWindow selectedRegion={deployment.regionCode} selectedWedgeIds={deployment.wanGwExtIds} onAddTransits={onAddTransits} />
        </ModalComponent>
      )}
    </>
  );
};
export default React.memo(TransitStep);
