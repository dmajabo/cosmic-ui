import React from 'react';
import EdgesSelect from '../../../Components/EdgesSelect';

const names = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'Omar Alexander', 'Carlos Abbott', 'Miriam Wagner', 'Bradley Wilkerson', 'Virginia Andrews', 'Kelly Snyder'];
interface Props {
  selectedEdges: string[];
  onChangeEdges: (value: string[]) => void;
}

const EdgesStep: React.FC<Props> = (props: Props) => {
  const onChange = (items: any[]) => {
    props.onChangeEdges(items);
  };

  return <EdgesSelect placeholder="Select" onChange={onChange} items={names} value={props.selectedEdges} />;
};

export default React.memo(EdgesStep);
