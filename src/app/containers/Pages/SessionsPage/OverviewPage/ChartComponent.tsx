import React from 'react';
import { ChartWrapper } from '../../Shared/styles';
// import SankeyChart from 'app/components/Charts/SankeyChart';
import { useGet } from 'lib/api/http/useAxiosHook';
import { ISankeyRes } from 'lib/api/ApiModels/Sessions/apiModel';
import { SessionsApi } from 'lib/api/ApiModels/Sessions/endpoints';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
// import Highcharts from 'highcharts';
// import HighchartsSankey from 'highcharts/modules/sankey';
// import HighchartsReact from 'highcharts-react-official';
interface IProps {}

const ChartComponent: React.FC<IProps> = (props: IProps) => {
  const { response, loading, error, onGet } = useGet<ISankeyRes>();
  // const [data, setData] = React.useState<ISankeyRes>(null);
  // const [dataHigh, setHighData] = React.useState<any>(null);
  React.useEffect(() => {
    onTryToLoadData();
  }, []);

  React.useEffect(() => {
    if (response && response.sankey) {
      // setData(response);
      // const _data = [];
      // const _names = new Set();
      // debugger;
      // response.sankey.links.forEach(link => {
      //   const _s = response.sankey.nodes.find(it => it.node === link.source);
      //   const _t = response.sankey.nodes.find(it => it.node === link.target);
      //   if (_names.has(`${_t.node}${_s.node}`)) return;
      //   const _item = [_s.name, _t.name, link.value];
      //   _data.push(_item);
      //   _names.add(`${_s.node}${_t.node}`);
      // });
      // setHighData(_data);
    }
  }, [response]);

  const onTryToLoadData = async () => {
    await onGet(SessionsApi.getSankeyData());
  };

  // const chartOptions = {
  //   chart: {
  //     type: 'sankey',
  //   },
  //   title: null,
  //   // tooltip: {
  //   //   valueSuffix: ` ${dataValueSuffix}`,
  //   // },
  //   plotOptions: {
  //     sankey: {
  //       dataLabels: {
  //         enabled: true,
  //       },
  //       colorByPoint: true,
  //     },
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   legend: false,
  //   series: [
  //     {
  //       keys: ['from', 'to', 'weight'],
  //       data: dataHigh,
  //       type: 'sankey',
  //     },
  //   ],
  // };

  return (
    <>
      <ChartWrapper>
        {loading && (
          <AbsLoaderWrapper width="100%" height="100%" top="50px">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {error && !loading && <>{error.message}</>}
        {/* {data && data.sankey && <SankeyChart data={data.sankey} />} */}
      </ChartWrapper>
      {/* <ChartWrapper>
        {loading && (
          <AbsLoaderWrapper width="100%" height="100%" top="50px">
            <LoadingIndicator margin="auto" />
          </AbsLoaderWrapper>
        )}
        {dataHigh && <HighchartsReact highcharts={HighchartsSankey(Highcharts)} options={chartOptions} />}
      </ChartWrapper> */}
    </>
  );
};

export default React.memo(ChartComponent);
