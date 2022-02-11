import React from 'react';
import Search from 'app/components/Inputs/Search';
// import PrimaryButton from 'app/components/Buttons/PrimaryButton';
// import { addIcon } from 'app/components/SVGIcons/addIcon';
import { ActionPart, ActionRowStyles } from 'app/containers/Pages/Shared/styles';
import { ALERT_TIME_RANGE_QUERY_TYPES, convertPeriodToUserFriendlyString } from 'lib/api/ApiModels/paramBuilders';
import MatSelect from 'app/components/Inputs/MatSelect';
import IconButton from 'app/components/Buttons/IconButton';
import { refreshIcon } from 'app/components/SVGIcons/refresh';

interface Props {
  selectedTimeRangePeriod: string;
  searchValue: string | null;
  onSearchChange: (v: string | null) => void;
  onChangePeriod: (_value: ALERT_TIME_RANGE_QUERY_TYPES) => void;
  onRefreshData: () => void;
}

const Header: React.FC<Props> = (props: Props) => {
  const onSearhChange = (value: string | null) => {
    props.onSearchChange(value);
  };

  const onChangePeriod = (value: ALERT_TIME_RANGE_QUERY_TYPES) => {
    props.onChangePeriod(value);
  };

  const onRefresh = () => {
    props.onRefreshData();
  };

  return (
    <>
      <ActionRowStyles>
        <ActionPart margin="0 auto 0 0" minWidth="440px">
          <Search searchQuery={props.searchValue} onChange={onSearhChange} styles={{ minWidth: '440px', height: '50px' }} />
        </ActionPart>
        <ActionPart margin="0 0 0 auto">
          <MatSelect
            id="logsTimePeriod"
            label="Show"
            labelStyles={{ margin: 'auto 10px auto 0' }}
            value={props.selectedTimeRangePeriod}
            options={[ALERT_TIME_RANGE_QUERY_TYPES.LAST_DAY, ALERT_TIME_RANGE_QUERY_TYPES.LAST_WEEK]}
            onChange={onChangePeriod}
            renderValue={(v: ALERT_TIME_RANGE_QUERY_TYPES) => convertPeriodToUserFriendlyString(v)}
            renderOption={(v: ALERT_TIME_RANGE_QUERY_TYPES) => convertPeriodToUserFriendlyString(v)}
            styles={{ height: '50px', minHeight: '50px', width: 'auto', display: 'inline-flex', alignItems: 'center' }}
            selectStyles={{ height: '50px', width: 'auto', minWidth: '240px', border: '1px solid transparent' }}
          />
          <IconButton styles={{ margin: '0 0 0 20px', flexShrink: 0, border: '1px solid transparent' }} icon={refreshIcon} title="Reload" onClick={onRefresh} />
        </ActionPart>
      </ActionRowStyles>
    </>
  );
};

export default React.memo(Header);
