import React from 'react';
import { PreviewRow, PreviewTag, PreviewTagCount, PreviewText, PreviewWrapper } from './styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';

interface Props {}

const PolicyPreview: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  if (!edges.editEdge.segmentPolicy || !edges.editEdge.segmentPolicy.length) return null;
  return (
    <PreviewWrapper>
      <PreviewRow margin="8px 0 0 0" wrap="wrap">
        {edges.editEdge.segmentPolicy.map((policy, index) => {
          return (
            <PreviewTag key={`previewPolicyRuleTag${index}`} bg="var(--_rowBorder)">
              <PreviewText margin="auto 12px auto 0">{policy.name || 'Unknown'}</PreviewText>
              {policy.rules && policy.rules.length ? <PreviewTagCount>{policy.rules.length}</PreviewTagCount> : null}
            </PreviewTag>
          );
        })}
      </PreviewRow>
    </PreviewWrapper>
  );
};
export default React.memo(PolicyPreview);
