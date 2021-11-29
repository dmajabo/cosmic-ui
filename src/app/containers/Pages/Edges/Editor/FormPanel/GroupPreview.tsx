import React from 'react';
import { PreviewRow, PreviewTag, PreviewTagCount, PreviewText, PreviewWrapper } from './styles';
import { ITopologyGroup } from 'lib/api/ApiModels/Topology/endpoints';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
interface Props {
  ids: string[];
}

const GroupPreview: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [sitesGroups, setSitesGroups] = React.useState<ITopologyGroup[]>([]);

  React.useEffect(() => {
    if (!edges.groups || !edges.groups.length) return;
    const _arr: ITopologyGroup[] = [];
    if (props.ids && props.ids.length) {
      props.ids.forEach(it => {
        const _gr = edges.groups.find(el => el.id === it);
        if (_gr) {
          _arr.push(_gr);
        }
      });
    }
    setSitesGroups(_arr);
  }, [props.ids, edges.groups]);

  if (!sitesGroups || !sitesGroups.length) return null;
  return (
    <PreviewWrapper>
      <PreviewRow margin="8px 0 0 0" wrap="wrap">
        {sitesGroups.map(it => (
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
