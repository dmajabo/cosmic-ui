import React from 'react';
import { CloudLoadBalancerTypeP, INetworkLoadBalancer, INetworkVM, INnetworkInternetGateway } from 'lib/api/ApiModels/Topology/apiModels';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';
import ExpandGroup from 'app/components/Basic/ExpandGroup';
import { AppLoaderBalancerIcon, InternetGatawayIcon, NetLoaderBalancerIcon, VmIcon } from 'app/components/SVGIcons/topologyIcons/TopoMapV2Icons/VnetPanelIcons/vnetPanelIcons';
import VmItem from '../List/VmItem';
import ChildrenCount from '../ChildrenCount';
import BalanceItem from '../List/BalanceItem';
import InternetGetAwayItem from '../List/InternetGetAwayItem';
import { IVnetFields } from '../models';

interface IProps {
  dataItem: INetworkVNetNode;
  expandStateObj: IVnetFields;
  onSelectedVm: (item: INetworkVM) => void;
  onToogleExpandState: (fieldId: string, state: boolean) => void;
}

const InventoryTab: React.FC<IProps> = (props: IProps) => {
  const [vms, setVms] = React.useState<INetworkVM[]>([]);
  const [netLoaderBalancerList, setNetLoaderBalancerList] = React.useState<INetworkLoadBalancer[]>([]);
  const [appLoaderBalancerList, setAppLoaderBalancerList] = React.useState<INetworkLoadBalancer[]>([]);
  const [internetGatAway, setInternetGetAway] = React.useState<INnetworkInternetGateway>(null);

  React.useEffect(() => {
    if (props.dataItem) {
      const _obj = getFilteredBalancerByType(props.dataItem.loadBalancers);
      setVms(props.dataItem.vms);
      setNetLoaderBalancerList(_obj.net);
      setAppLoaderBalancerList(_obj.app);
      setInternetGetAway(props.dataItem.internetGateway);
    }
  }, [props.dataItem]);

  const getFilteredBalancerByType = (data: INetworkLoadBalancer[]) => {
    if (!data || !data.length) return { net: [], app: [] };
    const _nat: INetworkLoadBalancer[] = [];
    const _app: INetworkLoadBalancer[] = [];
    data.forEach(it => {
      if (it.type === CloudLoadBalancerTypeP.NETWORK) {
        _nat.push(it);
        return;
      }
      _app.push(it);
    });
    return { net: _nat, app: _app };
  };

  const onSelectVm = (_item: INetworkVM) => {
    props.onSelectedVm(_item);
  };

  const onToogleExpandState = (id: string, state: boolean) => {
    props.onToogleExpandState(id, state);
  };

  return (
    <>
      <ExpandGroup
        id={props.expandStateObj.internetGatAway.id}
        expand={props.expandStateObj.internetGatAway.expand && !!internetGatAway}
        headerChildren={<ChildrenCount count={internetGatAway ? 1 : 0} />}
        disabled={!internetGatAway}
        onToogleExpand={onToogleExpandState}
        maxGroupHeight="none"
        icon={InternetGatawayIcon}
        label="Internet Gateway"
        styles={{ margin: '0 0 4px 0' }}
      >
        {internetGatAway && <InternetGetAwayItem dataItem={internetGatAway} />}
      </ExpandGroup>
      <ExpandGroup
        id={props.expandStateObj.netLoadBalancer.id}
        expand={props.expandStateObj.netLoadBalancer.expand && !!(netLoaderBalancerList && netLoaderBalancerList.length)}
        onToogleExpand={onToogleExpandState}
        headerChildren={<ChildrenCount count={netLoaderBalancerList.length} />}
        maxGroupHeight="none"
        icon={NetLoaderBalancerIcon}
        label="Network Load Balancers"
        disabled={!netLoaderBalancerList.length}
        styles={{ margin: '0 0 4px 0' }}
      >
        {netLoaderBalancerList && netLoaderBalancerList.length
          ? netLoaderBalancerList.map(it => <BalanceItem key={`netLB${it.extId}`} icon={NetLoaderBalancerIcon} dataItem={it} onClick={() => {}} />)
          : null}
      </ExpandGroup>
      <ExpandGroup
        id={props.expandStateObj.appLoadBalancer.id}
        expand={props.expandStateObj.appLoadBalancer.expand && !!(appLoaderBalancerList && appLoaderBalancerList.length)}
        onToogleExpand={onToogleExpandState}
        headerChildren={<ChildrenCount count={appLoaderBalancerList.length} />}
        disabled={!appLoaderBalancerList.length}
        maxGroupHeight="none"
        icon={AppLoaderBalancerIcon}
        label="Application Load Balancers"
      >
        {appLoaderBalancerList && appLoaderBalancerList.length
          ? appLoaderBalancerList.map(it => <BalanceItem key={`appLB${it.extId}`} icon={AppLoaderBalancerIcon} dataItem={it} onClick={() => {}} />)
          : null}
      </ExpandGroup>
      <ExpandGroup
        id={props.expandStateObj.vms.id}
        expand={props.expandStateObj.vms.expand && !!(vms && vms.length)}
        onToogleExpand={onToogleExpandState}
        headerChildren={<ChildrenCount count={vms.length} />}
        disabled={!vms.length}
        maxGroupHeight="none"
        icon={VmIcon}
        label="Virtual Machines"
        styles={{ margin: '0 0 4px 0' }}
      >
        {vms && vms.length ? vms.map(it => <VmItem key={`vmLIstItem${it.extId}`} dataItem={it} onClick={onSelectVm} />) : null}
      </ExpandGroup>
    </>
  );
};

export default React.memo(InventoryTab);
