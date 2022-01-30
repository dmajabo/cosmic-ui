import React from 'react';
import { PanelTitle } from '../../styles';
import { OverflowContainer } from 'app/components/PopupContainer/styles';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import RangeItem from './RangeItem/RangeItem';
import { createNewRange, IFlowRange } from './models';

interface Props {}

const FlowsOverviewSettings: React.FC<Props> = (props: Props) => {
  const [ranges, setRanges] = React.useState<IFlowRange[]>([]);

  const onCreateRange = () => {
    const _new: IFlowRange = createNewRange();
    setRanges([...ranges, _new]);
  };

  const onRemoveRange = (id: string) => {
    const _items: IFlowRange[] = ranges.filter(it => it.id !== id);
    setRanges(_items);
  };

  const onUpdateRange = (item: IFlowRange, index: number) => {
    const _items: IFlowRange[] = ranges.slice();
    _items.splice(index, 1, item);
    setRanges(_items);
  };

  return (
    <>
      <PanelTitle className="textOverflow">Flows Overview Settings</PanelTitle>
      <OverflowContainer style={{ left: '0', display: 'flex', flexDirection: 'column' }}>
        {ranges && ranges.length ? ranges.map((r, i) => <RangeItem key={`${r.id}${i}`} index={i} range={r} onUpdateRange={onUpdateRange} onRemoveRange={onRemoveRange} />) : null}
        <SecondaryButton styles={{ margin: ranges && ranges.length ? '0 0 0 auto' : '0 auto 0 0' }} label="Add Range" icon={addIcon} onClick={onCreateRange} />
      </OverflowContainer>
    </>
  );
};

export default React.memo(FlowsOverviewSettings);
