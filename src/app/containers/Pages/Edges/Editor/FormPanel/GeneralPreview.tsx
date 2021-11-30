import { IConnectionP } from 'lib/api/ApiModels/Edges/apiModel';
import React from 'react';
import { PreviewRow, PreviewText, PreviewWrapper } from './styles';

interface Props {
  name: string;
  connectionPolicy: IConnectionP;
  tags: string[];
}

const GeneralPreview: React.FC<Props> = ({ name, connectionPolicy, tags }) => {
  if (!name && (!tags || !tags.length) && (!connectionPolicy || (!connectionPolicy.enableNetworkLink && !connectionPolicy.enableVpnLink))) return null;
  return (
    <PreviewWrapper>
      {name && (
        <PreviewRow margin="20px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Name:
          </PreviewText>
          <PreviewText color="var(--_disabledTextColor)">{name}</PreviewText>
        </PreviewRow>
      )}
      {connectionPolicy && (connectionPolicy.enableNetworkLink || connectionPolicy.enableVpnLink) && (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Connection Types:
          </PreviewText>
          {connectionPolicy.enableNetworkLink && <PreviewText color="var(--_disabledTextColor)">VPC</PreviewText>}
          {connectionPolicy.enableNetworkLink && connectionPolicy.enableVpnLink && (
            <PreviewText margin="0 4px 0 0" color="var(--_disabledTextColor)">
              ,
            </PreviewText>
          )}
          {connectionPolicy.enableVpnLink && <PreviewText color="var(--_disabledTextColor)">VPN</PreviewText>}
        </PreviewRow>
      )}
      {tags && tags.length ? (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Tags:
          </PreviewText>
          <PreviewText color="var(--_disabledTextColor)">{tags.join(', ')}</PreviewText>
        </PreviewRow>
      ) : null}
    </PreviewWrapper>
  );
};
export default React.memo(GeneralPreview);
