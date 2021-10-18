import React from 'react';
import EdgesSelect from '../../../Components/EdgesSelect';
import Tag from '../../../Components/Tag';

const names = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'Omar Alexander', 'Carlos Abbott', 'Miriam Wagner', 'Bradley Wilkerson', 'Virginia Andrews', 'Kelly Snyder'];
interface Props {
  selectedEdges: string[];
  onChangeEdges: (value: string[]) => void;
  onRemoveEdge: (item: string) => void;
}

const EdgesStep: React.FC<Props> = (props: Props) => {
  const onChange = (items: any[]) => {
    props.onChangeEdges(items);
  };

  const onRemoveTag = (item: string) => {
    props.onRemoveEdge(item);
  };

  return (
    <>
      <EdgesSelect label="Edges" required placeholder="Select" onChange={onChange} items={names} value={props.selectedEdges} />
      {props.selectedEdges && props.selectedEdges.length ? props.selectedEdges.map((it, index) => <Tag key={`selectedEdgesTag${index}`} item={it} onDelete={onRemoveTag} />) : null}
    </>
  );
};

export default React.memo(EdgesStep);
