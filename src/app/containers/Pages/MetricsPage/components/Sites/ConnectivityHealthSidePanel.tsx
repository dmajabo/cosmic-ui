import React, { useContext } from 'react';
import { PanelTitle } from '../../../TrafficPage/Trends/styles';
import { OverflowContainer } from 'app/components/PopupContainer/styles';
import RangeItem from '../../../TrafficPage/Trends/Components/FlowsOverviewComponent/RangeItem/RangeItem';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { buildPreferenceKey, IFlowPreferenceRange, IPreferenceRes, IUserPreference, USER_PREFERENCE_KEYS } from 'lib/api/ApiModels/Policy/Preference';
import { useMetricsDataContext } from 'lib/hooks/Metrics/useMetricsDataContent';
import { usePost } from 'lib/api/http/useAxiosHook';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { getToBase64 } from 'lib/api/http/utils';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import _ from 'lodash';
import { createNewMetricsRange } from '../model';

export const ConnectivityHealthSidePanel: React.FC = () => {
  const userContext = useContext<UserContextState>(UserContext);
  const { metrics } = useMetricsDataContext();
  const [ranges, setRanges] = React.useState<IFlowPreferenceRange[]>([]);
  const [disabledCreate, setDisabledCreate] = React.useState<boolean>(true);
  const { response: postRes, error: postError, onPost } = usePost<IPreferenceRes, any>();
  React.useEffect(() => {
    setRanges(metrics.rangePreference);
  }, [metrics.rangePreference]);

  React.useEffect(() => {
    if (postRes && !postError) {
      metrics.onUpdatePreferenceRange(ranges);
    }
  }, [postRes]);

  React.useEffect(() => {
    if (ranges.some(r => !r.color || (!r.from && r.from !== 0) || (!r.to && r.to !== 0) || !r.name)) {
      setDisabledCreate(true);
    } else {
      setDisabledCreate(false);
    }
  }, [ranges]);

  const onCreateRange = () => {
    const _new: IFlowPreferenceRange = createNewMetricsRange();
    if (ranges && ranges.length) {
      _new.from = ranges[ranges.length - 1].to + 1;
    } else {
      _new.from = 0;
    }
    setRanges([...ranges, _new]);
    setDisabledCreate(true);
  };

  const onRemoveRange = (id: string) => {
    const _items: IFlowPreferenceRange[] = ranges.filter(it => it.id !== id);
    setRanges(_items);
    metrics.onUpdatePreferenceRange(_items);
    //onTrySavePreferences(_items); TODO: Uncomment after finding a way to differentiate between saved preferences
  };

  const onUpdateRange = (item: IFlowPreferenceRange, index: number) => {
    if (_.isEqual(item, ranges[index])) return;
    const _items: IFlowPreferenceRange[] = ranges.slice();
    if (item.from > item.to) {
      item.from = item.to - 1;
    }
    _items.splice(index, 1, item);
    if (_items[index + 1]) {
      for (let i = index + 1; i < _items.length; i++) {
        const _nextItem = { ..._items[i], from: _items[i - 1].to + 1 };
        if (_nextItem.from < _nextItem.to) {
          _items.splice(i, 1, _nextItem);
          break;
        }
        _nextItem.to = _nextItem.from + 1;
        _items.splice(i, 1, _nextItem);
      }
    }
    setRanges(_items);
    metrics.onUpdatePreferenceRange(_items);
    //onTrySavePreferences(_items); TODO: Uncomment after finding a way to differentiate between saved preferences
  };

  const onTrySavePreferences = async (data: IFlowPreferenceRange[]) => {
    const _obj: IUserPreference = {
      userId: userContext.user.sub,
      prefKey: buildPreferenceKey(USER_PREFERENCE_KEYS.FLOWS_OVERRVIEW_SETTINGS_RANGES, userContext.user.sub),
      prefData: getToBase64(data),
    };
    await onPost(PolicyApi.postSavePreference(), { preference: _obj }, userContext.accessToken!);
  };
  return (
    <>
      <PanelTitle className="textOverflowEllips">Health Settings</PanelTitle>
      <OverflowContainer style={{ left: '0', display: 'flex', flexDirection: 'column' }}>
        {ranges && ranges.length ? ranges.map((r, i) => <RangeItem key={`${r.id}${i}`} index={i} range={r} onUpdateRange={onUpdateRange} onRemoveRange={onRemoveRange} />) : null}
        <SecondaryButton disabled={disabledCreate} styles={{ margin: ranges && ranges.length ? '0 0 0 auto' : '0 auto 0 0' }} label="Add Range" icon={addIcon} onClick={onCreateRange} />
      </OverflowContainer>
    </>
  );
};
