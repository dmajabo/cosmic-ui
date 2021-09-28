import React from 'react';
import { PanelBarContent, PanelHeader, PanelTabWrapper, PanelTitle } from '../../styles';
import OverflowContainer from 'app/components/Basic/OverflowContainer/styles';
import { IAppGroup_PanelDataNode, IVm } from 'lib/models/topology';
import { Tab, Tabs } from '@material-ui/core';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import TabPanel from 'app/components/Tabs/TabPanel';
import VmList from './VmList';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { applicationGroupIcon } from 'app/components/SVGIcons/topologyIcons/applicationGroup';
import { returnArrow } from 'app/components/SVGIcons/arrows';
import IconButton from 'app/components/Buttons/IconButton';
import MetricsTab from '../VmPanel/MetricsTab';
import RoutesTab from '../VmPanel/RoutesTab';
import PolicyTab from '../VmPanel/PolicyTab';

interface IProps {
  dataItem: IAppGroup_PanelDataNode;
}

const ApplicationGroupPanel: React.FC<IProps> = (props: IProps) => {
  const [value, setValue] = React.useState(0);
  const [selectedVm, setSelectedVm] = React.useState<IVm | null>(null);
  const [vms, setVms] = React.useState<IVm[] | null>(null);
  const classes = TabsStyles();

  React.useEffect(() => {
    if (props.dataItem && props.dataItem.vnet && props.dataItem.vnet.vms && props.dataItem.vnet.vms.length) {
      const _listItems: IVm[] = props.dataItem.vnet.vms.filter(it => it.selectorGroup === props.dataItem.group.name || it.selectorGroup === props.dataItem.group.id);
      setVms(_listItems);
    } else {
      setVms(null);
    }
    setSelectedVm(null);
    setValue(0);
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

  return (
    <>
      {selectedVm && (
        <>
          <PanelHeader direction="row" align="center">
            <IconButton styles={{ margin: '0 12px 0 0' }} icon={returnArrow} title="Back" onClick={onReturn} />
            <PanelTitle maxWidth="calc(100% - 32px)">{selectedVm.name ? selectedVm.name : selectedVm.extId}</PanelTitle>
          </PanelHeader>
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
        </>
      )}
      {!selectedVm && (
        <PanelHeader align="center">
          <IconWrapper icon={applicationGroupIcon} width="24px" height="24px" styles={{ cursor: 'default' }} />
          <PanelTitle margin="0 0 0 8px" maxWidth="calc(100% - 32px)">
            {props.dataItem.group.name ? props.dataItem.group.name : props.dataItem.group.id}
          </PanelTitle>
        </PanelHeader>
      )}
      <OverflowContainer>
        {!selectedVm && vms && vms.length && (
          <PanelBarContent>
            <VmList group={props.dataItem.group} dataItems={vms} onSelectVm={onSelectVm} />
          </PanelBarContent>
        )}
        {selectedVm && (
          <>
            <TabPanel value={value} index={0}>
              <MetricsTab dataItem={selectedVm} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <RoutesTab dataItem={props.dataItem.vnet} />
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

export default React.memo(ApplicationGroupPanel);
