import React from 'react';
import GeneralStep from '../GeneralStep';
import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { EdgesStepperTypes } from '../model';
import { IEdgeModel } from '../../model';
import { PanelContent, PanelFotter, PanelHeader, PanelTitle } from './styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { nextArrow, prevArrow } from 'app/components/SVGIcons/arrows';
import SitesStep from '../SitesStep';
import AppsStep from '../AppsStep';
import TransitStep from '../TransitStep';
import PolicyStep from '../PolicyStep';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';

interface Props {
  dataItem: IEdgeModel;
  lastIndex: number;
  selectedStep: IStepperItem<EdgesStepperTypes>;
  onChangeField: (value: any, field: string, step: EdgesStepperTypes) => void;
  onChangeSitesField: (value: any, field: string) => void;
  onChangeAppsField: (value: any, field: string) => void;
  onGoPrev: () => void;
  onGoNext: () => void;
  onSave: () => void;
}

const FormPanel: React.FC<Props> = ({ dataItem, selectedStep, lastIndex, onChangeField, onChangeSitesField, onChangeAppsField, onSave, onGoPrev, onGoNext }) => {
  if (!selectedStep) return null;
  return (
    <>
      <PanelHeader>
        <PanelTitle>{selectedStep.label}</PanelTitle>
      </PanelHeader>
      <PanelContent>
        {selectedStep.id === EdgesStepperTypes.GENERAL && (
          <GeneralStep connection={dataItem.connection} name={dataItem.name} onChange={(v: any, f: string) => onChangeField(v, f, EdgesStepperTypes.GENERAL)} />
        )}
        {selectedStep.id === EdgesStepperTypes.SITES && <SitesStep type={dataItem.sites.type} name={dataItem.sites.name} onChange={(v: any, f: string) => onChangeSitesField(v, f)} />}
        {selectedStep.id === EdgesStepperTypes.APPS && <AppsStep type={dataItem.apps.type} name={dataItem.apps.name} onChange={(v: any, f: string) => onChangeAppsField(v, f)} />}
        {selectedStep.id === EdgesStepperTypes.TRANSIT && <TransitStep type={dataItem.apps.type} name={dataItem.apps.name} onChange={(v: any, f: string) => onChangeAppsField(v, f)} />}
        {selectedStep.id === EdgesStepperTypes.POLICY && <PolicyStep policies={dataItem.policies} onChange={(v: any, f: string) => onChangeAppsField(v, f)} />}
      </PanelContent>
      <PanelFotter>
        {selectedStep.index !== 0 && <SecondaryButton icon={prevArrow} styles={{ height: '100%' }} label="Back" onClick={onGoPrev} />}
        {selectedStep.index !== lastIndex && (
          <SecondaryButton disabled={selectedStep.state !== StepperItemStateType.COMPLETE} icon={nextArrow} styles={{ height: '100%', margin: '0 0 0 10px' }} label="Next" onClick={onGoNext} />
        )}
        {selectedStep.index === lastIndex && <PrimaryButton styles={{ height: '100%', margin: '0 0 0 10px' }} label="CREATE EDGE" onClick={onSave} />}
      </PanelFotter>
    </>
  );
};

export default React.memo(FormPanel);
