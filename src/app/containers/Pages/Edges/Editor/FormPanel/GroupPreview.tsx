import React from 'react';
import { PreviewRow, PreviewTag, PreviewTagCount, PreviewText, PreviewWrapper } from './styles';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/apiModels';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
interface Props {
  field: string;
}

const GroupPreview: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [groups, setGroups] = React.useState<ITopologyGroup[]>([]);

  React.useEffect(() => {
    if (!edges.groups || !edges.groups.length) return;
    const _arr: ITopologyGroup[] = [];
    if (edges.editEdge[props.field] && edges.editEdge[props.field].length) {
      edges.editEdge[props.field].forEach(it => {
        const _gr = edges.groups.find(el => el.id === it);
        if (_gr) {
          _arr.push(_gr);
        }
      });
    }
    setGroups(_arr);
  }, [edges.editEdge, edges.groups]);

  if (!groups || !groups.length) return null;
  return (
    <PreviewWrapper>
      <PreviewRow margin="8px 0 0 0" wrap="wrap">
        {groups.map(it => (
          <PreviewTag key={`previewSitesTag${it.id}`} bg="var(--_rowBorder)">
            <PreviewText margin="auto 12px auto 0">{it.name}</PreviewText>
            {it.extIds && it.extIds.length ? <PreviewTagCount>{it.extIds.length}</PreviewTagCount> : null}
          </PreviewTag>
        ))}
      </PreviewRow>
    </PreviewWrapper>
  );
};
export default React.memo(GroupPreview);
