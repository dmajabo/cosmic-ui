import * as d3 from 'd3';
import { INetworkLoadBalancer, CloudLoadBalancerTypeP } from 'lib/api/ApiModels/Topology/apiModels';
import { INetworkVNetNode, ITopoRegionNode } from 'lib/hooks/Topology/models';
import { IPosition } from 'lib/models/general';
import { NODES_CONSTANTS } from '../../../../model';

export const buildVnetTooltip = (e: React.BaseSyntheticEvent<MouseEvent>, region: ITopoRegionNode, vnet: INetworkVNetNode, containerId: string, coord: IPosition) => {
  if (!e || !e.target) return;
  const fo = d3.select(`#vnetTooltipFOContainer${containerId}`);
  const container = fo.select(`#vnetTooltipContainer${containerId}`);
  container.interrupt();
  container.selectAll('*').remove();
  const posY = Number(fo.attr('data-y'));
  fo.attr('width', '328px')
    .attr('height', '288px')
    .attr('x', coord.x + NODES_CONSTANTS.NETWORK_VNET.collapse.r * 2 + NODES_CONSTANTS.REGION.expanded.contentPadding + 10)
    .attr('y', posY + coord.y);
  const vnetName = container.append('div').classed('textOverflowEllips', true);
  vnetName.style('width', '100%').style('margin', '0 0 10px 0').style('font-weight', 500).style('font-size', '16px').style('line-height', '21px').style('color', 'var(--_primaryTextColor)');
  vnetName.text(vnet.name || vnet.extId);
  buildTooltipSubTitle(container, 'Account', region.dataItem.name, '0 0 8px 0');
  buildTooltipSubTitle(container, 'Region', region.dataItem.name, '0 0 20px 0');
  const _nlb = getFilteredBalancerByType(vnet.loadBalancers);
  buildTooltipContentRow(container, getIcon('virtualmachine'), 'Virtual Machines', vnet.vms.length);
  const _igcount = vnet.internetGateway ? 1 : 0;
  buildTooltipContentRow(container, getIcon('internalGetaway'), 'Internet Gateway', _igcount);
  buildTooltipContentRow(container, getIcon('nbalancer'), 'Network Load Balancers', _nlb.net.length);
  buildTooltipContentRow(container, getIcon('abalancer'), 'Application Load Balancers', _nlb.app.length);
  container.transition().duration(500).style('opacity', 1);
};

const buildTooltipSubTitle = (node: any, label: string, value: string, margin: string) => {
  const _row = node.append('div').style('width', '100%').style('margin', margin).style('font-size', '12px').style('line-height', '16px');
  _row.append('span').style('display', 'inline-block').style('font-weight', 500).style('color', 'var(--_primaryTextColor)').style('margin', '0 4px 0 0').text(`${label}:`);
  _row.append('span').style('display', 'inline-block').style('font-weight', 'normal').style('color', 'var(--_disabledTextColor)').text(value);
};

const buildTooltipContentRow = (node: any, icon: any, label: string, count?: string | number) => {
  const _row = node
    .append('div')
    .style('width', '100%')
    .style('height', '40px')
    .style('display', 'flex')
    .style('flex-shrink', 0)
    .style('padding', '10px 12px')
    .style('align-items', 'center')
    .style('border', '1px solid var(--_rowBorder)');
  _row.append('span').style('display', 'inline-block').style('width', '20px').style('height', '20px').style('margin', 'auto 10px auto 0').html(icon);
  _row
    .append('span')
    .classed('textOverflowEllips', true)
    .style('display', 'inline-block')
    .style('max-width', '100%')
    .style('font-weight', 500)
    .style('font-size', '12px')
    .style('line-height', '20px')
    .style('margin', 'auto 0')
    .style('color', 'var(--_primaryTextColor)')
    .text(label);
  _row
    .append('span')
    .style('display', 'inline-block')
    .style('width', 'auto')
    .style('height', '20px')
    .style('min-width', '34px')
    .style('font-weight', 500)
    .style('font-size', '12px')
    .style('line-height', '16px')
    .style('margin', 'auto 0 auto 8px')
    .style('color', 'var(--_primaryWhiteColor)')
    .style('background', 'var(--_pButtonBg)')
    .style('text-align', 'center')
    .style('padding', '2px 10px')
    .style('border-radius', '20px')
    .text(count);
};

const getIcon = (type: string) => {
  if (type === 'abalancer') {
    return `<svg width="20" height="20" style="vertical-align: top;" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0372 14.3236H15.0143V13.334H14.0372V14.3236ZM11.1459 14.3236H12.1355V13.334H11.1459V14.3236ZM7.86467 14.3236H8.85426V13.334H7.86467V14.3236ZM4.98551 14.3236H5.93759V13.334H4.98551V14.3236ZM7.50009 7.0319H12.5001V4.58398H7.50009V7.0319ZM15.4309 12.5007H14.7918V11.0944C14.7918 10.864 14.6051 10.6777 14.3751 10.6777H13.3334V9.27148C13.3334 9.04107 13.1468 8.85482 12.9168 8.85482H10.4168V7.86523H12.9168C13.1468 7.86523 13.3334 7.67898 13.3334 7.44857V4.16732C13.3334 3.9369 13.1468 3.75065 12.9168 3.75065H7.08342C6.85301 3.75065 6.66676 3.9369 6.66676 4.16732V7.44857C6.66676 7.67898 6.85301 7.86523 7.08342 7.86523H9.58342V8.85482H7.08342C6.85301 8.85482 6.66676 9.04107 6.66676 9.27148V10.6777H5.62509C5.39467 10.6777 5.20842 10.864 5.20842 11.0944V12.5007H4.56842C4.33842 12.5007 4.15176 12.6869 4.15176 12.9173V14.7402C4.15176 14.9707 4.33842 15.1569 4.56842 15.1569H6.35426C6.58426 15.1569 6.77092 14.9707 6.77092 14.7402V12.9173C6.77092 12.6869 6.58426 12.5007 6.35426 12.5007H6.04176V11.5111H7.76051V12.5007H7.44801C7.21759 12.5007 7.03134 12.6869 7.03134 12.9173V14.7402C7.03134 14.9707 7.21759 15.1569 7.44801 15.1569H9.27092C9.50092 15.1569 9.68759 14.9707 9.68759 14.7402V12.9173C9.68759 12.6869 9.50092 12.5007 9.27092 12.5007H8.59384V11.0944C8.59384 10.864 8.40717 10.6777 8.17717 10.6777H7.50009V9.68815H12.5001V10.6777H11.823C11.5926 10.6777 11.4063 10.864 11.4063 11.0944V12.5007H10.7293C10.4988 12.5007 10.3126 12.6869 10.3126 12.9173V14.7402C10.3126 14.9707 10.4988 15.1569 10.7293 15.1569H12.5522C12.7822 15.1569 12.9688 14.9707 12.9688 14.7402V12.9173C12.9688 12.6869 12.7822 12.5007 12.5522 12.5007H12.2397V11.5111H13.9584V12.5007H13.6205C13.3901 12.5007 13.2038 12.6869 13.2038 12.9173V14.7402C13.2038 14.9707 13.3901 15.1569 13.6205 15.1569H15.4309C15.6609 15.1569 15.8476 14.9707 15.8476 14.7402V12.9173C15.8476 12.6869 15.6609 12.5007 15.4309 12.5007ZM10.0001 18.334C5.40467 18.334 1.66634 14.5957 1.66634 10.0007C1.66634 5.40565 5.40467 1.66732 10.0001 1.66732C14.5951 1.66732 18.3334 5.40565 18.3334 10.0007C18.3334 14.5957 14.5951 18.334 10.0001 18.334ZM10.0001 0.833984C4.94509 0.833984 0.833008 4.94607 0.833008 10.0007C0.833008 15.0552 4.94509 19.1673 10.0001 19.1673C15.0543 19.1673 19.1668 15.0552 19.1668 10.0007C19.1668 4.94607 15.0543 0.833984 10.0001 0.833984Z" fill="#4D27AA"/>
    </svg>
    `;
  }
  if (type === 'virtualmachine') {
    return `<svg width="20" height="20" style="vertical-align: top;" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.54913 8.61H3.74475V9.36H1.54913C1.1085 9.36 0.75 9.0015 0.75 8.56087V1.54913C0.75 1.1085 1.1085 0.75 1.54913 0.75H8.56087C9.0015 0.75 9.36 1.1085 9.36 1.54913V4.0725H8.61V1.54913C8.61 1.52213 8.58825 1.5 8.56087 1.5H1.54913C1.52213 1.5 1.5 1.52213 1.5 1.54913V8.56087C1.5 8.58788 1.52213 8.61 1.54913 8.61ZM5.15138 12.54H7.97962V13.29H5.15138C4.71113 13.29 4.35263 12.9315 4.35263 12.4912V5.47875C4.35263 5.0385 4.71113 4.68 5.15138 4.68H12.1635C12.6037 4.68 12.9626 5.0385 12.9626 5.47875V8.0025H12.2126V5.47875C12.2126 5.45175 12.1905 5.43 12.1635 5.43H5.15138C5.12438 5.43 5.10262 5.45175 5.10262 5.47875V12.4912C5.10262 12.5182 5.12438 12.54 5.15138 12.54ZM16.4437 16.47L9.36 16.4437V9.40912C9.36 9.38212 9.38212 9.36 9.40912 9.36H16.4209C16.4479 9.36 16.47 9.38212 16.47 9.40912L16.4437 16.47ZM16.4209 8.61H9.40912C8.9685 8.61 8.61 8.9685 8.61 9.40912V16.4437C8.61 16.8716 8.95837 17.22 9.38625 17.22H16.4437C16.8716 17.22 17.22 16.8716 17.22 16.4437V9.40912C17.22 8.9685 16.8615 8.61 16.4209 8.61Z" fill="#D45B07"/>
    </svg>
    `;
  }
  if (type === 'internalGetaway') {
    return `<svg width="20" height="20" style="vertical-align: top;" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 16.4824H16.4824V1.5H1.5V16.4824ZM16.8574 0.75H1.125C0.918 0.75 0.75 0.917625 0.75 1.125V16.8574C0.75 17.0647 0.918 17.2324 1.125 17.2324H16.8574C17.0647 17.2324 17.2324 17.0647 17.2324 16.8574V1.125C17.2324 0.917625 17.0647 0.75 16.8574 0.75Z" fill="#D45B07"/>
    </svg>`;
  }
  if (type === 'nbalancer') {
    return `<svg width="20" height="20" style="vertical-align: top;" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0005 18.3352C5.40509 18.3352 1.66634 14.5965 1.66634 10.0011C1.66634 5.40607 5.40509 1.66732 10.0005 1.66732C14.5955 1.66732 18.3343 5.40607 18.3343 10.0011C18.3343 14.5965 14.5955 18.3352 10.0005 18.3352ZM10.0005 0.833984C4.94551 0.833984 0.833008 4.94607 0.833008 10.0011C0.833008 15.0561 4.94551 19.1686 10.0005 19.1686C15.0555 19.1686 19.1676 15.0561 19.1676 10.0011C19.1676 4.94607 15.0555 0.833984 10.0005 0.833984ZM12.118 9.70648C12.2809 9.8694 12.2809 10.1327 12.118 10.2957L10.8918 11.5232L10.3026 10.934L10.8184 10.4177H7.81259V9.5844H10.8184L10.3026 9.06815L10.8918 8.47898L12.118 9.70648ZM13.3338 14.689H14.688V13.3348H13.3338V14.689ZM15.1047 12.5015H12.9172C12.6868 12.5015 12.5005 12.6877 12.5005 12.9182V15.1057C12.5005 15.3361 12.6868 15.5223 12.9172 15.5223H15.1047C15.3351 15.5223 15.5213 15.3361 15.5213 15.1057V12.9182C15.5213 12.6877 15.3351 12.5015 15.1047 12.5015ZM7.36092 7.8094L10.4005 6.20523L9.74759 6.02815L9.96551 5.22398L11.6401 5.67773C11.8622 5.73815 11.993 5.96648 11.933 6.18898L11.4793 7.8644L10.6751 7.64649L10.8784 6.89524L7.75009 8.5469L7.36092 7.8094ZM13.3338 6.66773H14.688V5.31357H13.3338V6.66773ZM15.1047 4.48023H12.9172C12.6868 4.48023 12.5005 4.66648 12.5005 4.8969V7.0844C12.5005 7.31482 12.6868 7.50107 12.9172 7.50107H15.1047C15.3351 7.50107 15.5213 7.31482 15.5213 7.0844V4.8969C15.5213 4.66648 15.3351 4.48023 15.1047 4.48023ZM3.47717 11.3952H6.26468V8.60774H3.47717V11.3952ZM6.68134 7.77398H3.06051C2.83009 7.77398 2.64384 7.96065 2.64384 8.19065V11.8119C2.64384 12.0419 2.83009 12.2286 3.06051 12.2286H6.68134C6.91176 12.2286 7.09801 12.0419 7.09801 11.8119V8.19065C7.09801 7.96065 6.91176 7.77398 6.68134 7.77398ZM11.933 13.8132C11.993 14.0357 11.8622 14.264 11.6401 14.3244L9.96551 14.7786L9.74759 13.9744L10.4009 13.7973L7.36092 12.1932L7.75009 11.4557L10.8784 13.1069L10.6751 12.3557L11.4793 12.1377L11.933 13.8132ZM13.3338 10.6781H14.688V9.32398H13.3338V10.6781ZM15.1047 8.49065H12.9172C12.6868 8.49065 12.5005 8.6769 12.5005 8.90732V11.0948C12.5005 11.3252 12.6868 11.5115 12.9172 11.5115H15.1047C15.3351 11.5115 15.5213 11.3252 15.5213 11.0948V8.90732C15.5213 8.6769 15.3351 8.49065 15.1047 8.49065Z"
        fill="#4D27AA"
      />
    </svg>`;
  }
  return null;
};

export const removeVnetTooltip = (containerId: string) => {
  const fo = d3.select(`#vnetTooltipFOContainer${containerId}`);
  const container = fo.select(`#vnetTooltipContainer${containerId}`);
  container.interrupt();
  container
    .transition()
    .duration(500)
    .style('opacity', 0)
    .on('end', () => {
      container.selectAll(`*`).remove();
      fo.attr('width', '0').attr('height', '0').attr('x', null).attr('y', null);
    });
};

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
