import React from 'react';
import { PreviewRow, PreviewTag, PreviewTagCount, PreviewText, PreviewWrapper } from './styles';
import { ISegmentP } from 'lib/api/ApiModels/Edges/apiModel';

interface Props {
  segmentPolicy: ISegmentP[];
}

const PolicyPreview: React.FC<Props> = ({ segmentPolicy }) => {
  if (!segmentPolicy || !segmentPolicy.length) return null;
  return (
    <PreviewWrapper>
      <PreviewRow margin="8px 0 0 0" wrap="wrap">
        {segmentPolicy.map((policy, index) => {
          if (!policy.name && (!policy.rules || policy.rules.length)) return null;
          return (
            <PreviewTag key={`previewPolicyRuleTag${index}`} bg="var(--_rowBorder)">
              <PreviewText margin="auto 12px auto 0">{policy.name}</PreviewText>
              {policy.rules && policy.rules.length ? <PreviewTagCount>{policy.rules.length}</PreviewTagCount> : null}
            </PreviewTag>
          );
        })}
      </PreviewRow>
    </PreviewWrapper>
  );
};
export default React.memo(PolicyPreview);
