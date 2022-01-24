import React from 'react';
import { NodeTooltipBg, NodeTooltipWrapper, HeaderNameRow, SubHeaderRow, SubHeaderTitleLabel, SubHeaderTitleValue, FieldCount, FieldIcon, FieldName, FieldRow } from './style';
import { ITopoRegionNode, INetworkVNetNode } from 'lib/hooks/Topology/models';
import { CloudLoadBalancerTypeP, INetworkLoadBalancer } from 'lib/api/ApiModels/Topology/apiModels';
import { InternetGatawayIcon, NetLoaderBalancerIcon, AppLoaderBalancerIcon, VmIcon } from 'app/components/SVGIcons/topologyIcons/TopoMapV2Icons/VnetPanelIcons/vnetPanelIcons';

interface Props {
  id: string;
  region: ITopoRegionNode;
  vnet: INetworkVNetNode;
  x: number | string;
  y: number | string;
  minWidth?: string;
}

const HtmlVpcTooltip: React.FC<Props> = (props: Props) => {
  const [natLoaderBalancer, setNatLoadBalancer] = React.useState<INetworkLoadBalancer[]>([]);
  const [appLoaderBalancer, setAppLoadBalancer] = React.useState<INetworkLoadBalancer[]>([]);

  React.useEffect(() => {
    if (!props.vnet.loadBalancers || !props.vnet.loadBalancers.length) return;
    const _nat: INetworkLoadBalancer[] = [];
    const _app: INetworkLoadBalancer[] = [];
    props.vnet.loadBalancers.forEach(it => {
      if (it.type === CloudLoadBalancerTypeP.NETWORK) {
        _nat.push(it);
        return;
      }
      _app.push(it);
    });
    setNatLoadBalancer(_nat);
    setAppLoadBalancer(_app);
  }, []);

  return (
    <NodeTooltipWrapper id={props.id} x={props.x} y={props.y} width="1" height="1">
      <NodeTooltipBg className="container" minWidth={props.minWidth} transform="none">
        <HeaderNameRow className="textOverflowEllips">VPC: {props.vnet.name || props.vnet.extId}</HeaderNameRow>
        <SubHeaderRow margin="0 0 8px 0" className="textOverflowEllips">
          <SubHeaderTitleLabel>Account</SubHeaderTitleLabel>
          <SubHeaderTitleValue>{props.region.dataItem.name}</SubHeaderTitleValue>
        </SubHeaderRow>
        <SubHeaderRow margin={props.vnet.segmentId ? '0 0 8px 0' : null} className="textOverflowEllips">
          <SubHeaderTitleLabel>Region</SubHeaderTitleLabel>
          <SubHeaderTitleValue>{props.region.dataItem.name}</SubHeaderTitleValue>
        </SubHeaderRow>
        {props.vnet.segmentId && (
          <SubHeaderRow className="textOverflowEllips">
            <SubHeaderTitleLabel>Segment</SubHeaderTitleLabel>
            <SubHeaderTitleValue>{props.vnet.segmentName}</SubHeaderTitleValue>
          </SubHeaderRow>
        )}
        <FieldRow>
          <FieldIcon>{InternetGatawayIcon}</FieldIcon>
          <FieldName>Internet Gateway</FieldName>
          <FieldCount>{props.vnet.internetGateway ? 1 : 0}</FieldCount>
        </FieldRow>
        <FieldRow>
          <FieldIcon>{NetLoaderBalancerIcon}</FieldIcon>
          <FieldName>Network Load Balancers</FieldName>
          <FieldCount>{natLoaderBalancer.length}</FieldCount>
        </FieldRow>
        <FieldRow>
          <FieldIcon>{AppLoaderBalancerIcon}</FieldIcon>
          <FieldName>Application Load Balancers</FieldName>
          <FieldCount>{appLoaderBalancer.length}</FieldCount>
        </FieldRow>
        <FieldRow>
          <FieldIcon>{VmIcon}</FieldIcon>
          <FieldName>Virtual Machines</FieldName>
          <FieldCount>{props.vnet.vms.length}</FieldCount>
        </FieldRow>
      </NodeTooltipBg>
    </NodeTooltipWrapper>
  );
};
export default React.memo(HtmlVpcTooltip);
