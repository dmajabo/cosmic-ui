import React from 'react';
import { PreviewRow, PreviewText, PreviewWrapper } from './styles';

interface Props {
  name: string;
  connection: string[];
  tags: string[];
}

const GeneralPreview: React.FC<Props> = ({ name, connection, tags }) => {
  if (!name && (!connection || !connection.length)) return null;
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
      {connection && connection.length ? (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Connection Types:
          </PreviewText>
          <PreviewText color="var(--_disabledTextColor)">{connection.join(', ')}</PreviewText>
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
