import React, { useContext } from 'react';
import { PanelTitle } from '../../styles';
import { OverflowContainer } from 'app/components/PopupContainer/styles';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import RangeItem from './RangeItem/RangeItem';
import { createNewRange } from './models';
import { usePost } from 'lib/api/http/useAxiosHook';
import { PolicyApi } from 'lib/api/ApiModels/Services/policy';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { IFlowPreferenceRange, IPreferenceRes, IUserPreference, USER_PREFERENCE_KEYS } from 'lib/api/ApiModels/Policy/Preference';
import { getToBase64 } from 'lib/api/http/utils';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { useTrafficDataContext } from 'lib/hooks/Traffic/useTrafficDataCont';
import _ from 'lodash';
interface Props {}

const FlowsOverviewSettings: React.FC<Props> = (props: Props) => {
  const userContext = useContext<UserContextState>(UserContext);
  const { traffic } = useTrafficDataContext();
  const [ranges, setRanges] = React.useState<IFlowPreferenceRange[]>([]);
  const [disabledCreate, setDisabledCreate] = React.useState<boolean>(true);
  const { response: postRes, error: postError, loading, onPost } = usePost<IPreferenceRes, any>();
  React.useEffect(() => {
    setRanges(traffic.rangePreference);
  }, []);

  React.useEffect(() => {
    if (postRes && !postError) {
      traffic.onUpdatePreferenceRange(ranges);
    }
  }, [postRes]);

  React.useEffect(() => {
    if (ranges.some(r => !r.color || !r.from || !r.to || !r.name)) {
      setDisabledCreate(true);
    } else {
      setDisabledCreate(false);
    }
  }, [ranges]);

  const onCreateRange = () => {
    const _new: IFlowPreferenceRange = createNewRange();
    setRanges([...ranges, _new]);
    setDisabledCreate(true);
  };

  const onRemoveRange = (id: string) => {
    const _items: IFlowPreferenceRange[] = ranges.filter(it => it.id !== id);
    setRanges(_items);
    onTrySavePreferences(_items);
  };

  const onUpdateRange = (item: IFlowPreferenceRange, index: number) => {
    if (_.isEqual(item, ranges[index])) return;
    const _items: IFlowPreferenceRange[] = ranges.slice();
    _items.splice(index, 1, item);
    setRanges(_items);
    onTrySavePreferences(_items);
  };

  const onTrySavePreferences = async (data: IFlowPreferenceRange[]) => {
    const _obj: IUserPreference = {
      userId: userContext.user.sub,
      prefKey: USER_PREFERENCE_KEYS.FLOWS_OVERRVIEW_SETTINGS_RANGES,
      prefData: getToBase64(data),
    };
    await onPost(PolicyApi.postSavePreference(), { preference: _obj }, userContext.accessToken!);
  };

  return (
    <>
      <PanelTitle className="textOverflow">Flows Overview Settings</PanelTitle>
      <OverflowContainer style={{ left: '0', display: 'flex', flexDirection: 'column' }}>
        {ranges && ranges.length
          ? ranges.map((r, i) => (
              <RangeItem
                key={`${r.id}${i}`}
                index={i}
                range={r}
                color={r.color}
                id={r.id}
                name={r.name}
                from={r.from}
                to={r.to}
                prevTo={ranges[i - 1] ? ranges[i - 1].to : null}
                nextFrom={ranges[i + 1] ? ranges[i + 1].from : null}
                onUpdateRange={onUpdateRange}
                onRemoveRange={onRemoveRange}
              />
            ))
          : null}
        <SecondaryButton disabled={disabledCreate} styles={{ margin: ranges && ranges.length ? '0 0 0 auto' : '0 auto 0 0' }} label="Add Range" icon={addIcon} onClick={onCreateRange} />
      </OverflowContainer>
      {loading && (
        <AbsLoaderWrapper width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </>
  );
};

export default React.memo(FlowsOverviewSettings);
