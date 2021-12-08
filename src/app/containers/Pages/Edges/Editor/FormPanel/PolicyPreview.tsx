import React from 'react';
import { PreviewRow, PreviewText, PreviewWrapper } from './styles';
import { ISegmentP } from 'lib/api/ApiModels/Edges/apiModel';

interface Props {
  segmentPolicy: ISegmentP;
}

const PolicyPreview: React.FC<Props> = ({ segmentPolicy }) => {
  if (!segmentPolicy || (!segmentPolicy.name && (!segmentPolicy.rules || !segmentPolicy.rules.length))) return null;
  return (
    <PreviewWrapper>
      {segmentPolicy.name && (
        <PreviewRow margin="20px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Name:
          </PreviewText>
          <PreviewText color="var(--_disabledTextColor)">{segmentPolicy.name}</PreviewText>
        </PreviewRow>
      )}
      {segmentPolicy.rules && segmentPolicy.rules.length && (
        <>Policy rules present</>
        // <PreviewRow margin="8px 0 0 0">
        //   <PreviewText className="label" margin="0 4px 0 0">
        //     Connection Types:
        //   </PreviewText>
        //   {connectionPolicy.enableNetworkLink && <PreviewText color="var(--_disabledTextColor)">VPC</PreviewText>}
        //   {connectionPolicy.enableNetworkLink && connectionPolicy.enableVpnLink && (
        //     <PreviewText margin="0 4px 0 0" color="var(--_disabledTextColor)">
        //       ,
        //     </PreviewText>
        //   )}
        //   {connectionPolicy.enableVpnLink && <PreviewText color="var(--_disabledTextColor)">VPN</PreviewText>}
        // </PreviewRow>
      )}
    </PreviewWrapper>
  );
};
export default React.memo(PolicyPreview);
