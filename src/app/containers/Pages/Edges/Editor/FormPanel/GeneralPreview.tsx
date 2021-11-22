import { IConnectionP } from 'lib/api/ApiModels/Edges/apiModel';
import React from 'react';
import { PreviewRow, PreviewText, PreviewWrapper } from './styles';

interface Props {
  name: string;
  connections: IConnectionP;
  tags: string[];
}

const GeneralPreview: React.FC<Props> = ({ name, connections, tags }) => {
  if (!name && (!tags || !tags.length) && (!connections || (!connections.enable_networklink && !connections.enable_vpnlink))) return null;
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
      {connections && (connections.enable_networklink || connections.enable_vpnlink) ? (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Connection Types:
          </PreviewText>
          {connections.enable_networklink && <PreviewText color="var(--_disabledTextColor)">VPC</PreviewText>}
          {connections.enable_vpnlink && <PreviewText color="var(--_disabledTextColor)">VPN</PreviewText>}
        </PreviewRow>
      ) : null}
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
