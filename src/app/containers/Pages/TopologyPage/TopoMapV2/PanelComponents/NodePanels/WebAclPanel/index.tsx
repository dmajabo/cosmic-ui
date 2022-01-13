import React from 'react';
import { PanelHeader, PanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { CloudLoadBalancerTypeP, INetworkLoadBalancer } from 'lib/api/ApiModels/Topology/apiModels';
import { INetworkWebAclNode } from 'lib/hooks/Topology/models';
import ExpandGroup from 'app/components/Basic/ExpandGroup';
import { AppLoaderBalancerIcon, NetLoaderBalancerIcon } from 'app/components/SVGIcons/topologyIcons/TopoMapV2Icons/VnetPanelIcons/vnetPanelIcons';
import ChildrenCount from './ChildrenCount';
import { DEFAULT_WEB_ACL_EXPAND_FIELDS, IVnetFields } from './models';
import { jsonClone } from 'lib/helpers/cloneHelper';
import BalanceItem from './List/BalanceItem';

interface IProps {
  dataItem: INetworkWebAclNode;
}

const WebAclPanel: React.FC<IProps> = (props: IProps) => {
  const [webAcl, setWebAcl] = React.useState<INetworkWebAclNode>(null);
  const [netLoaderBalancerList, setNetLoaderBalancerList] = React.useState<INetworkLoadBalancer[]>([]);
  const [appLoaderBalancerList, setAppLoaderBalancerList] = React.useState<INetworkLoadBalancer[]>([]);
  const [expandStateObj, setExpandStateObj] = React.useState<IVnetFields>(jsonClone(DEFAULT_WEB_ACL_EXPAND_FIELDS));
  React.useEffect(() => {
    if (!webAcl || (props.dataItem && props.dataItem.id !== webAcl.id)) {
      const _obj = getFilteredBalancerByType(props.dataItem.loadBalancers);
      setNetLoaderBalancerList(_obj.net);
      setAppLoaderBalancerList(_obj.app);
      const _expObj: IVnetFields = jsonClone(DEFAULT_WEB_ACL_EXPAND_FIELDS);
      setExpandStateObj(_expObj);
      setWebAcl(props.dataItem);
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

  const onToogleGroup = (fieldId: string, state: boolean) => {
    const _obj: IVnetFields = { ...expandStateObj };
    _obj[fieldId].expand = state;
    setExpandStateObj(_obj);
  };

  if (!webAcl) return null;

  return (
    <>
      <PanelHeader direction="row" align="center">
        <PanelTitle margin="0" maxWidth="calc(100% - 32px)">
          {props.dataItem.name ? props.dataItem.name : props.dataItem.extId}
        </PanelTitle>
      </PanelHeader>
      <OverflowContainer>
        <ExpandGroup
          id={expandStateObj.netLoadBalancer.id}
          expand={expandStateObj.netLoadBalancer.expand}
          onToogleExpand={onToogleGroup}
          headerChildren={<ChildrenCount count={netLoaderBalancerList.length} />}
          maxGroupHeight="none"
          icon={NetLoaderBalancerIcon}
          label="Network Load Balancers"
          disabled={!netLoaderBalancerList.length}
          styles={{ margin: '0 0 4px 0' }}
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

export default React.memo(WebAclPanel);
