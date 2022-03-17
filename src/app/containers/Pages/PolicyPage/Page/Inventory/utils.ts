import { ResourceType } from './model';

export function getAmazonConsoleUrl(region: string, resourceType: ResourceType, value: string): string {
  const HTTPS = 'https://';
  const POST_REGION_URL = '.console.aws.amazon.com/vpc/home?region=';

  switch (resourceType) {
    case ResourceType.TransitGateway:
      return `${HTTPS}${region}${POST_REGION_URL}${region}#TransitGatewayDetails:transitGatewayId=${value}`;
    case ResourceType.VPC:
      return `${HTTPS}${region}${POST_REGION_URL}${region}#VpcDetails:VpcId=${value}`;
    case ResourceType.SecurityGroup:
      return `${HTTPS}${region}${POST_REGION_URL}${region}#SecurityGroup:groupId=${value}`;
    case ResourceType.RouteTable:
      return `${HTTPS}${region}${POST_REGION_URL}${region}#RouteTableDetails:RouteTableId=${value}`;
    case ResourceType.TgwRouteTable:
      return `${HTTPS}${region}${POST_REGION_URL}${region}#TransitGatewayRouteTableDetails:transitGatewayRouteTableId=${value}`;
  }
}
