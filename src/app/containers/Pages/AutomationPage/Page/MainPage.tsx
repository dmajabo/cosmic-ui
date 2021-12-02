import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import { PageWrapperStyles, TabsWrapperStyles } from '../../Shared/styles';
import TabPanel from 'app/components/Tabs/TabPanel';
import { AUTOMATIONS_TABS } from 'lib/hooks/Automation/models';
import { useAutomationDataContext } from 'lib/hooks/Automation/useAutomationDataContext';

import { useBreadCrumbDataContext } from 'lib/hooks/Breadcrumb/useBreadcrumbDataContext';
import { AutomationBreadCrumbItemsType } from 'lib/hooks/Breadcrumb/models';
import EditorPage from './EditorPage';
import AutomationTable from '../Components/AutomationTable';
import TriggersTable from '../Components/TriggersTable';
import { ITrigger } from 'lib/models/Automation/trigger';

interface IProps {}

const MainPage: React.FC<IProps> = (props: IProps) => {
  const { automation } = useAutomationDataContext();
  const { breadcrumb } = useBreadCrumbDataContext();
  const [editorPage, setEditorPage] = React.useState<AutomationBreadCrumbItemsType>(null);
  const classes = TabsStyles();

  // TO DO
  React.useEffect(() => {
    const _triggers: ITrigger[] = [];
    for (let i = 0; i < 10; i++) {
      const _obj: ITrigger = {
        id: 'testTrigger' + i,
        name: 'testTrigger' + i,
        anomaly: [],
        rules: [],
        createdDate: new Date(2021, 9, 31 - i).toString(),
      };
      _triggers.push(_obj);
    }
    automation.onSetTriggers(_triggers);
  }, []);

  React.useEffect(() => {
    if (editorPage && !breadcrumb.automationsBreadCrumbItems.length) {
      setEditorPage(null);
      return;
    }
    if (!editorPage && breadcrumb.automationsBreadCrumbItems.length) {
      setEditorPage(breadcrumb.automationsBreadCrumbItems[breadcrumb.automationsBreadCrumbItems.length - 1]);
    }
  }, [breadcrumb.automationsBreadCrumbItems]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    automation.onChangeSelectedTab(newValue);
  };

  const onCreateNewAutomation = () => {
    breadcrumb.onGoToAutomation(AutomationBreadCrumbItemsType.NEW);
  };

  const onCreateNewTrigger = () => {
    breadcrumb.onGoToAutomation(AutomationBreadCrumbItemsType.NEW);
  };

  if (editorPage) {
    return <EditorPage editorPage={editorPage} />;
  }

  return (
    <PageWrapperStyles>
      <TabsWrapperStyles>
        <Tabs
          value={automation.selectedTab.index}
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
          {AUTOMATIONS_TABS.map(it => (
            <Tab key={`automationKey${it.id}`} label={it.label} classes={{ selected: classes.tabSelected }} {...TabComponentProps(0)} className={classes.tabBigSize} />
          ))}
        </Tabs>
      </TabsWrapperStyles>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: automation.selectedTab.index === AUTOMATIONS_TABS[0].index ? '1 1 100%' : '0' }}
        value={automation.selectedTab.index}
        index={AUTOMATIONS_TABS[0].index}
      >
        <AutomationTable onCreateNew={onCreateNewAutomation} />
      </TabPanel>
      <TabPanel
        styles={{ display: 'flex', flexDirection: 'column', flex: automation.selectedTab.index === AUTOMATIONS_TABS[1].index ? '1 1 100%' : '0' }}
        value={automation.selectedTab.index}
        index={AUTOMATIONS_TABS[1].index}
      >
        <TriggersTable onCreateNew={onCreateNewTrigger} />
      </TabPanel>
    </PageWrapperStyles>
  );
};

export default React.memo(MainPage);
