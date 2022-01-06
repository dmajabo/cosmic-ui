import React from 'react';
import { PanelHeader, PanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { CloudLoadBalancerTypeP, INetworkLoadBalancer, INetworkVM, INnetworkInternetGateway } from 'lib/api/ApiModels/Topology/apiModels';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';
import SelectedItemPanel from './SelectedItemPanel';
import ExpandGroup from 'app/components/Basic/ExpandGroup';
import { AppLoaderBalancerIcon, InternetGatawayIcon, NetLoaderBalancerIcon, VmIcon } from 'app/components/SVGIcons/topologyIcons/TopoMapV2Icons/VnetPanelIcons/vnetPanelIcons';
import VmItem from './List/VmItem';
import ChildrenCount from './ChildrenCount';
import { DEFAULT_VNET_EXPAND_FIELDS, IVnetFields } from './models';
import { jsonClone } from 'lib/helpers/cloneHelper';
import BalanceItem from './List/BalanceItem';
import InternetGetAwayItem from './List/InternetGetAwayItem';

interface IProps {
  dataItem: INetworkVNetNode;
}

const VpcPanel: React.FC<IProps> = (props: IProps) => {
  const [vnet, setVnet] = React.useState<INetworkVNetNode>(null);
  const [selectedSubItem, setSelectedSubItem] = React.useState<INetworkVM | null>(null);
  const [vms, setVms] = React.useState<INetworkVM[]>([]);
  const [netLoaderBalancerList, setNetLoaderBalancerList] = React.useState<INetworkLoadBalancer[]>([]);
  const [appLoaderBalancerList, setAppLoaderBalancerList] = React.useState<INetworkLoadBalancer[]>([]);
  const [internetGatAway, setInternetGetAway] = React.useState<INnetworkInternetGateway>(null);
  const [expandStateObj, setExpandStateObj] = React.useState<IVnetFields>(jsonClone(DEFAULT_VNET_EXPAND_FIELDS));
  React.useEffect(() => {
    if (!vnet || (props.dataItem && props.dataItem.id !== vnet.id)) {
      const _obj = getFilteredBalancerByType(props.dataItem.loadBalancers);
      setVms(props.dataItem.vms);
      setNetLoaderBalancerList(_obj.net);
      setAppLoaderBalancerList(_obj.app);
      setInternetGetAway(props.dataItem.internetGateway);
      setSelectedSubItem(null);
      const _expObj: IVnetFields = jsonClone(DEFAULT_VNET_EXPAND_FIELDS);
      setExpandStateObj(_expObj);
      setVnet(props.dataItem);
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
    if (selectedSubItem && selectedSubItem.id === _item.id) return;
    setSelectedSubItem(_item);
  };

  const onReturn = () => {
    setSelectedSubItem(null);
  };

  const onToogleGroup = (fieldId: string, state: boolean) => {
    const _obj: IVnetFields = { ...expandStateObj };
    _obj[fieldId].expand = state;
    setExpandStateObj(_obj);
  };

  if (!vnet) return null;

  if (selectedSubItem) {
    return <SelectedItemPanel vnetExtId={props.dataItem.extId} dataItem={selectedSubItem} onReturnBack={onReturn} />;
  }

  return (
    <>
      <PanelHeader direction="row" align="center">
        <PanelTitle margin="0" maxWidth="calc(100% - 32px)">
          {props.dataItem.name ? props.dataItem.name : props.dataItem.extId}
        </PanelTitle>
      </PanelHeader>
      <OverflowContainer>
        <ExpandGroup
          id={expandStateObj.vms.id}
          expand={expandStateObj.vms.expand}
          onToogleExpand={onToogleGroup}
          headerChildren={<ChildrenCount count={vms.length} />}
          disabled={!vms.length}
          arrowStyles={!vms.length ? null : { margin: '0' }}
          maxGroupHeight="none"
          icon={VmIcon}
          label="Virtual Machines"
          styles={{ margin: '0 0 20px 0' }}
        >
          {vms && vms.length ? vms.map(it => <VmItem key={`vmLIstItem${it.id}`} dataItem={it} onClick={onSelectVm} />) : null}
        </ExpandGroup>
        <ExpandGroup
          id={expandStateObj.internetGatAway.id}
          expand={expandStateObj.internetGatAway.expand}
          headerChildren={<ChildrenCount count={internetGatAway ? 1 : 0} />}
          disabled={!internetGatAway}
          onToogleExpand={onToogleGroup}
          maxGroupHeight="none"
          icon={InternetGatawayIcon}
          label="Internet Gateway"
          arrowStyles={!internetGatAway ? null : { margin: '0' }}
          styles={{ margin: '0 0 20px 0' }}
        >
          <InternetGetAwayItem dataItem={internetGatAway} />
        </ExpandGroup>
        <ExpandGroup
          id={expandStateObj.netLoadBalancer.id}
          expand={expandStateObj.netLoadBalancer.expand}
          onToogleExpand={onToogleGroup}
          headerChildren={<ChildrenCount count={netLoaderBalancerList.length} />}
          maxGroupHeight="none"
          icon={NetLoaderBalancerIcon}
          label="Network Load Balancers"
          disabled={!netLoaderBalancerList.length}
          styles={{ margin: '0 0 20px 0' }}
          arrowStyles={!netLoaderBalancerList.length ? null : { margin: '0' }}
        >
          {netLoaderBalancerList && netLoaderBalancerList.length
            ? netLoaderBalancerList.map(it => <BalanceItem key={`netLB${it.id}`} icon={NetLoaderBalancerIcon} dataItem={it} onClick={() => {}} />)
            : null}
        </ExpandGroup>
        <ExpandGroup
          id={expandStateObj.appLoadBalancer.id}
          expand={expandStateObj.appLoadBalancer.expand}
          onToogleExpand={onToogleGroup}
          headerChildren={<ChildrenCount count={appLoaderBalancerList.length} />}
          disabled={!appLoaderBalancerList.length}
          maxGroupHeight="none"
          icon={AppLoaderBalancerIcon}
          label="Application Load Balancers"
          arrowStyles={!appLoaderBalancerList.length ? null : { margin: '0' }}
        >
          {appLoaderBalancerList && appLoaderBalancerList.length
            ? appLoaderBalancerList.map(it => <BalanceItem key={`appLB${it.id}`} icon={AppLoaderBalancerIcon} dataItem={it} onClick={() => {}} />)
            : null}
        </ExpandGroup>
      </OverflowContainer>
    </>
  );
};

export default React.memo(VpcPanel);
