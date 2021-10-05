import React from 'react';
import { PanelBarContent, PanelHeader, PanelTabWrapper, PanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { IVPC_PanelDataNode, IVm, IApplication_Group, IVnetNode } from 'lib/models/topology';
import { Tab, Tabs } from '@material-ui/core';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import List from './List';
import { returnArrow } from 'app/components/SVGIcons/arrows';
import IconButton from 'app/components/Buttons/IconButton';
import MetricsTab from './VmTabs/MetricsTab';
import RoutesTab from './VmTabs/RoutesTab';
import PolicyTab from './VmTabs/PolicyTab';

interface IProps {
  dataItem: IVPC_PanelDataNode;
}

const VpcPanel: React.FC<IProps> = (props: IProps) => {
  const [value, setValue] = React.useState(0);
  const [vnet, setVnet] = React.useState<IVnetNode>(null);
  const [selectedVm, setSelectedVm] = React.useState<IVm | null>(null);
  const [listItems, setListItems] = React.useState<(IVm | IApplication_Group)[] | null>(null);
  const classes = TabsStyles();

  React.useEffect(() => {
    if (props.dataItem && props.dataItem.vnet) {
      const _vmslist: IVm[] = props.dataItem.vnet.vms.filter(it => !it.selectorGroup);
      const _appList: IApplication_Group[] = [];
      if (props.dataItem.vnet.applicationGroups && props.dataItem.vnet.applicationGroups.length) {
        props.dataItem.vnet.applicationGroups.forEach(gr => {
          const _vms: IVm[] = props.dataItem.vnet.vms.filter(it => it.selectorGroup === gr.name || it.selectorGroup === gr.id);
          const _disabled = !_vms || !_vms.length;
          const _expanded = props.dataItem.group && gr.id === props.dataItem.group.id;
          const _obj: IApplication_Group = { ...gr, expanded: _expanded, items: _vms || [], disabled: _disabled };
          _appList.push(_obj);
        });
      }
      const _listItems: (IVm | IApplication_Group)[] = [].concat([..._appList, ..._vmslist]);
      const _selectedVm = props.dataItem.vm ? props.dataItem.vm : null;
      setListItems(_listItems);
      setSelectedVm(_selectedVm);
      setVnet(props.dataItem.vnet);
      setValue(0);
    } else {
      setListItems(null);
      setSelectedVm(null);
      setVnet(null);
      setValue(0);
    }
  }, [props.dataItem]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const onSelectVm = (_item: IVm) => {
    if (selectedVm && selectedVm.id === _item.id) return;
    setValue(0);
    setSelectedVm(_item);
  };

  const onReturn = () => {
    setValue(0);
    setSelectedVm(null);
  };

  if (!vnet) return null;

  return (
    <>
      <PanelHeader direction="row" align="center">
        {selectedVm && <IconButton styles={{ margin: '0 12px 0 0' }} icon={returnArrow} title="Back" onClick={onReturn} />}
        {selectedVm && <PanelTitle maxWidth="calc(100% - 32px)">{selectedVm.name ? selectedVm.name : selectedVm.extId}</PanelTitle>}
        {!selectedVm && (
          <PanelTitle margin="0 0 0 8px" maxWidth="calc(100% - 32px)">
            {props.dataItem.vnet.name ? props.dataItem.vnet.name : props.dataItem.vnet.extId}
          </PanelTitle>
        )}
      </PanelHeader>
      {selectedVm && (
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
            <Tab label="Metrics" classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tab} />
            <Tab label="Routes" classes={{ selected: classes.tabSelected }} {...TabComponentProps(1)} className={classes.tab} />
            <Tab label="Policy" classes={{ selected: classes.tabSelected }} {...TabComponentProps(2)} className={classes.tab} />
          </Tabs>
        </PanelTabWrapper>
      )}
      <OverflowContainer>
        {!selectedVm && listItems && listItems.length && (
          <PanelBarContent>
            <List dataItems={listItems} onSelectVm={onSelectVm} />
          </PanelBarContent>
        )}
        {selectedVm && (
          <>
            <TabPanel value={value} index={0}>
              <MetricsTab dataItem={selectedVm} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <RoutesTab dataItem={vnet} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PolicyTab dataItem={selectedVm} />
            </TabPanel>
          </>
        )}
      </OverflowContainer>
    </>
  );
};

export default React.memo(VpcPanel);
