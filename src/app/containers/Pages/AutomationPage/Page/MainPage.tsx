import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { TabsStyles } from 'app/components/Tabs/TabsStyles';
import { TabComponentProps } from 'app/components/Tabs/TabComponentProps';
import { ActionPart, ActionRowStyles, PageWrapperStyles, TabsWrapperStyles } from '../../Shared/styles';
import TabPanel from 'app/components/Tabs/TabPanel';
import { AUTOMATIONS_TABS } from 'lib/hooks/Automation/models';
import { useAutomationDataContext } from 'lib/hooks/Automation/useAutomationDataContext';
import Search from 'app/components/Inputs/Search';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
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

  const handleSearchChange = (_value: string | null) => {
    automation.onChangeSearchQuery(_value);
  };

  const onCreateNewAutomation = () => {
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
      <ActionRowStyles height="40px">
        <ActionPart width="50%" maxWidth="440px" minWidth="200px" margin="0 auto 0 0">
          <Search styles={{ width: '100%' }} searchQuery={automation.searchQuery} onChange={handleSearchChange} />
        </ActionPart>
        <ActionPart width="50%" margin="0 0 0 auto" justifyContent="flex-end">
          <PrimaryButton label="Create new" icon={addIcon} onClick={onCreateNewAutomation} />
        </ActionPart>
      </ActionRowStyles>
      <TabPanel value={automation.selectedTab.index} index={AUTOMATIONS_TABS[0].index}>
        <AutomationTable />
      </TabPanel>
      <TabPanel value={automation.selectedTab.index} index={AUTOMATIONS_TABS[1].index}>
        <TriggersTable />
      </TabPanel>
    </PageWrapperStyles>
  );
};

export default React.memo(MainPage);
