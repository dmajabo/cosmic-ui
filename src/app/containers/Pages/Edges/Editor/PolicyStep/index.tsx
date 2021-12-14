import React from 'react';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import { ISegmentP } from 'lib/api/ApiModels/Edges/apiModel';
import SegmentPolicy from './SegmentPolicy';
import { createNewSegmentP } from '../helper';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { FormRow } from './styles';
import { plusIcon } from 'app/components/SVGIcons/plusIcon';
import { EmptyMessage } from '../Components/styles';

interface Props {}

const PolicyStep: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();

  const onAddPolicy = () => {
    const _obj: ISegmentP = createNewSegmentP();
    edges.onAddPolicy(_obj);
  };

  return (
    <>
      {edges.editEdge.segmentPolicy && edges.editEdge.segmentPolicy.length ? (
        edges.editEdge.segmentPolicy.map((policy, index) => <SegmentPolicy key={`segmentPolicy${index}${policy}`} index={index} policy={policy} />)
      ) : (
        <EmptyMessage>There are no policies yet. To create policy click the button bellow.</EmptyMessage>
      )}
      <FormRow justifyContent={edges.editEdge.segmentPolicy && edges.editEdge.segmentPolicy.length ? 'flex-end' : 'flex-start'}>
        <SecondaryButton
          disabled={
            !!(edges.edgeValidationResult && edges.edgeValidationResult.policy && edges.edgeValidationResult.policy.errors && edges.edgeValidationResult.policy.errors.length) ||
            !edges.combinations ||
            !edges.combinations.length
          }
          icon={plusIcon}
          label="Create Policy"
          onClick={onAddPolicy}
        />
      </FormRow>
    </>
  );
};
export default React.memo(PolicyStep);
