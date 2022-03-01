import React from 'react';
import { ChartContent, ChartItem, ChartTitle, ChartValue } from './styles';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGetChainData } from 'lib/api/http/useAxiosHook';
import { IInOutBoundRes, ToposvcRuleType } from 'lib/api/ApiModels/Topology/apiModels';
import LoadingIndicator from 'app/components/Loading';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import DonutChart, { PieDataItem } from 'app/components/Charts/DonutChart';
import history from 'utils/history';
import { ROUTE } from 'lib/Routes/model';
import { POLICY_TABS } from 'lib/hooks/Policy/models';

interface Props {
  styles?: Object;
}

const InOutBound: React.FC<Props> = (props: Props) => {
  const { accessToken } = React.useContext<UserContextState>(UserContext);
  const { loading, error, response, onGetChainData } = useGetChainData<IInOutBoundRes>();
  const [data, setData] = React.useState<PieDataItem[]>([]);

  React.useEffect(() => {
    onTryLoadData();
  }, []);

  React.useEffect(() => {
    if (response) {
      const _data: PieDataItem[] = [
        { name: 'Cellular', id: 'Cell', value: response.cellular ? response.cellular.count : 0, hide: false, color: 'var(--_warningColor)' },
        { name: 'Outbound', id: 'Outb', value: response.outbound ? response.outbound.count : 0, hide: false, color: 'var(--_highlightColor)' },
      ];
      setData(_data);
    } else {
      setData([]);
    }
  }, [response]);

  React.useEffect(() => {
    if (error) {
      setData([]);
    }
  }, [error]);

  const onTryLoadData = async () => {
    await onGetChainData([TopoApi.getRulesCount(ToposvcRuleType.Cellular_Firewall), TopoApi.getRulesCount(ToposvcRuleType.L3_Outbound)], ['cellular', 'outbound'], accessToken!);
  };

  const onItemClick = (_item: PieDataItem) => {
    history.push(ROUTE.app + ROUTE.policy, { tab: POLICY_TABS.inventory.id, tableId: ToposvcRuleType.L7_Outbound });
  };

  return (
    <ChartItem style={props.styles}>
      <ChartTitle>Layer 3</ChartTitle>
      {!error && data !== null && (
        <DonutChart
          data={data}
          legendPosition="bottom"
          donutWidth={100}
          donutHeight={85}
          legendSize={0.85}
          arcLabelFontSize={16}
          donutPadding={0}
          disabledLegendHide
          totalStyle={{ fontSize: 28, fontLabelSize: 12, offsetY: 0, offsetLabelY: 18 }}
          donutRadius={{ innerRadius: 1.75, outerRadius: 0.85, textOuteOffset: 0.3, hoverOuterRadius: 0.875 }}
          legendStyles={{ flexWrap: 'nowrap', overflow: 'visible' }}
          legendItemStyle={{ width: 'calc(50% - 8px)', justifyContent: 'center' }}
          onItemClick={onItemClick}
        />
      )}
      {!error && !data && (
        <ChartContent>
          <ChartValue style={{ fontSize: '18px', lineHeight: '20px', margin: 'auto' }} color="var(--_primaryTextColor)">
            No data
          </ChartValue>
        </ChartContent>
      )}
      {loading && (
        <AbsLoaderWrapper width="100%" height="100%" zIndex={10}>
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
      {error && <ErrorMessage margin="auto">{error.message || 'Something went wrong'}</ErrorMessage>}
    </ChartItem>
  );
};

export default React.memo(InOutBound);
