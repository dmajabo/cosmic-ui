import React from 'react';
import { PreviewRow, PreviewText, PreviewWrapper } from './styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';

interface Props {}

const GeneralPreview: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  if (
    !edges.editEdge.name &&
    (!edges.editEdge.tags || !edges.editEdge.tags.length) &&
    (!edges.editEdge.connectionPolicy || (!edges.editEdge.connectionPolicy.enableNetworkLink && !edges.editEdge.connectionPolicy.enableVpnLink))
  )
    return null;
  return (
    <PreviewWrapper>
      {edges.editEdge.name && (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Name:
          </PreviewText>
          <PreviewText color="var(--_disabledTextColor)">{edges.editEdge.name}</PreviewText>
        </PreviewRow>
      )}
      {edges.editEdge.connectionPolicy && (edges.editEdge.connectionPolicy.enableNetworkLink || edges.editEdge.connectionPolicy.enableVpnLink) && (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Connection Types:
          </PreviewText>
          {edges.editEdge.connectionPolicy.enableNetworkLink && <PreviewText color="var(--_disabledTextColor)">VPC</PreviewText>}
          {edges.editEdge.connectionPolicy.enableNetworkLink && edges.editEdge.connectionPolicy.enableVpnLink && (
            <PreviewText margin="0 4px 0 0" color="var(--_disabledTextColor)">
              ,
            </PreviewText>
          )}
          {edges.editEdge.connectionPolicy.enableVpnLink && <PreviewText color="var(--_disabledTextColor)">VPN</PreviewText>}
        </PreviewRow>
      )}
      {edges.editEdge.tags && edges.editEdge.tags.length ? (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Tags:
          </PreviewText>
          <PreviewText color="var(--_disabledTextColor)">{edges.editEdge.tags.join(', ')}</PreviewText>
        </PreviewRow>
      ) : null}
    </PreviewWrapper>
  );
};
export default React.memo(GeneralPreview);
