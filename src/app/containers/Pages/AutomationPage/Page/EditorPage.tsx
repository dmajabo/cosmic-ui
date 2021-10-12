import React from 'react';
import { AutomationBreadCrumbItemsType } from 'lib/hooks/Breadcrumb/models';
import { EditorPageWrapperStyles } from '../styles/styles';
import NewAutomation from './NewAutomation';

interface IProps {
  editorPage: AutomationBreadCrumbItemsType;
}

const EditorPage: React.FC<IProps> = (props: IProps) => {
  return <EditorPageWrapperStyles>{props.editorPage === AutomationBreadCrumbItemsType.NEW && <NewAutomation />}</EditorPageWrapperStyles>;
};

export default React.memo(EditorPage);
