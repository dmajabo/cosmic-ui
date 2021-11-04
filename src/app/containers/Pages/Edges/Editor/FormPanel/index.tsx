import React from 'react';
import GeneralStep from '../GeneralStep';
import { IStepperItem, StepperItemStateType } from 'app/components/Stepper/model';
import { EdgesStepperTypes } from '../model';
import { IEdgeModel } from '../../model';
import { PanelContent, PanelFotter, PanelHeader, PanelTitle } from './styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { nextArrow, prevArrow } from 'app/components/SVGIcons/arrows';

interface Props {
  dataItem: IEdgeModel;
  lastIndex: number;
  selectedStep: IStepperItem<EdgesStepperTypes>;
  onChangeField: (value: any, field: string, step: EdgesStepperTypes) => void;
  onGoPrev: () => void;
  onGoNext: () => void;
}

const FormPanel: React.FC<Props> = ({ dataItem, selectedStep, lastIndex, onChangeField, onGoPrev, onGoNext }) => {
  if (!selectedStep) return null;
  return (
    <>
      <PanelHeader>
        <PanelTitle>
          Step {selectedStep.index + 1}: {selectedStep.label}
        </PanelTitle>
      </PanelHeader>
      <PanelContent>
        {selectedStep.id === EdgesStepperTypes.GENERAL && <GeneralStep name={dataItem.name} onChange={(v: any, f: string) => onChangeField(v, f, EdgesStepperTypes.GENERAL)} />}
      </PanelContent>
      <PanelFotter>
        {selectedStep.index !== 0 && <SecondaryButton icon={prevArrow} styles={{ height: '100%' }} label="Back" onClick={onGoPrev} />}
        {selectedStep.index !== lastIndex && (
          <SecondaryButton disabled={selectedStep.state !== StepperItemStateType.COMPLETE} icon={nextArrow} styles={{ height: '100%', margin: '0 0 0 10px' }} label="Next" onClick={onGoNext} />
        )}
      </PanelFotter>
    </>
  );
};

export default React.memo(FormPanel);
