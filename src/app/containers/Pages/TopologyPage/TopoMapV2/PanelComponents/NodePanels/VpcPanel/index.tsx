import React from 'react';
import { PanelHeader, PanelTabWrapper, PanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { INetworkVNetNode } from 'lib/hooks/Topology/models';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { Tab, Tabs } from '@mui/material';
import TabPanel from 'app/components/Tabs/TabPanel';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import InventoryTab from './Tabs/InventoryTab';
import RoutesTab from './Tabs/RoutesTab';
import PolicyTab from './Tabs/PolicyTab';
import SelectedVmPanel from './SelectedVmPanel';
import { CloudLoadBalancerTypeP, INetworkVM } from 'lib/api/ApiModels/Topology/apiModels';
import { DEFAULT_VNET_EXPAND_FIELDS, IVnetFields } from './models';
import { jsonClone } from 'lib/helpers/cloneHelper';

interface IProps {
  dataItem: INetworkVNetNode;
}

const VpcPanel: React.FC<IProps> = (props: IProps) => {
  const [value, setValue] = React.useState(0);
  const [vnet, setVnet] = React.useState<INetworkVNetNode>(null);
  const [selectedSubItem, setSelectedSubItem] = React.useState<INetworkVM | null>(null);
  const [expandStateObj, setExpandStateObj] = React.useState<IVnetFields>(jsonClone(DEFAULT_VNET_EXPAND_FIELDS));
  // const [policyDisabled, setPolicyDisabled] = React.useState<boolean>(false);
  const classes = TabsStyles();

  React.useEffect(() => {
    if (!vnet || (props.dataItem && props.dataItem.extId !== vnet.extId)) {
      const _obj: IVnetFields = jsonClone(expandStateObj);
      if (_obj.vms.expand && (!props.dataItem.vms || !props.dataItem.vms.length)) {
        _obj.vms.expand = false;
      }
      if (_obj.netLoadBalancer.expand) {
        const open = !!(props.dataItem.loadBalancers && props.dataItem.loadBalancers.length && props.dataItem.loadBalancers.some(it => it.type === CloudLoadBalancerTypeP.NETWORK));
        _obj.netLoadBalancer.expand = open;
      }
      if (_obj.appLoadBalancer.expand) {
        const open = !!(props.dataItem.loadBalancers && props.dataItem.loadBalancers.length && props.dataItem.loadBalancers.some(it => it.type === CloudLoadBalancerTypeP.APPLICATION));
        _obj.appLoadBalancer.expand = open;
      }
      if (_obj.internetGatAway.expand && !props.dataItem.internetGateway) {
        _obj.internetGatAway.expand = false;
      }
      setExpandStateObj(_obj);
      setSelectedSubItem(null);
      setVnet(props.dataItem);
    }
  }, [props.dataItem]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const onSelectVm = (_item: INetworkVM) => {
    if (selectedSubItem && selectedSubItem.extId === _item.extId) return;
    setSelectedSubItem(_item);
  };

  const onToogleExpandState = (fieldId: string, state: boolean) => {
    const _obj: IVnetFields = jsonClone(expandStateObj);
    _obj[fieldId].expand = state;
    setExpandStateObj(_obj);
  };

  const onReturn = () => {
    setSelectedSubItem(null);
  };

  if (!props.dataItem) return null;

  return (
    <>
      <PanelHeader margin="0 0 10px 0" direction="row" align="center">
        <PanelTitle margin="0" maxWidth="calc(100% - 32px)">
          VPC: {props.dataItem.name ? props.dataItem.name : props.dataItem.extId}
        </PanelTitle>
      </PanelHeader>
      {selectedSubItem && <SelectedVmPanel vnetExtId={props.dataItem.extId} dataItem={selectedSubItem} onReturnBack={onReturn} />}
      {!selectedSubItem && (
        <>
          <PanelTabWrapper>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabs}
              TabIndicatorProps={{
                style: {
                  background: 'var(--_hoverButtonBg)',
                  boxShadow: '0px 4px 7px rgba(67, 127, 236, 0.15)',
                  borderRadius: '100px',
                },
              }}
            >
              {/* <Tab disableRipple label="Metrics" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} /> */}
              <Tab disableRipple label="Routes" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} />
              <Tab disableRipple label="Policy" classes={{ selected: classes.tabSelected }} {...TabComponentProps(1)} className={classes.tab} />
              <Tab disableRipple label="Inventory" classes={{ selected: classes.tabSelected }} {...TabComponentProps(2)} className={classes.tab} />
            </Tabs>
          </PanelTabWrapper>

          <OverflowContainer>
            <TabPanel value={value} index={0}>
              <RoutesTab dataItem={props.dataItem} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PolicyTab dataItem={props.dataItem} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <InventoryTab dataItem={props.dataItem} expandStateObj={expandStateObj} onSelectedVm={onSelectVm} onToogleExpandState={onToogleExpandState} />
            </TabPanel>
          </OverflowContainer>
        </>
      )}
    </>
  );
};

export default React.memo(VpcPanel);
