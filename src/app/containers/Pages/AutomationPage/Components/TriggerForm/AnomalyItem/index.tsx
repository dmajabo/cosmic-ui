import React from 'react';
import { ITriggerAnomaly } from 'lib/models/Automation/trigger';
import { DataItemWrapper } from '../styles/DataItemStyles';
import SettingsButton from 'app/components/Buttons/SettingsButton';
import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
import { editIcon } from 'app/components/SVGIcons/edit';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import Dropdown from 'app/components/Inputs/Dropdown';

interface Props {
  dataItem: ITriggerAnomaly;
  index: number;
  onUpdateItem: (index: number, item: ITriggerAnomaly) => void;
  onDelete: (index: number) => void;
}
const itemsAnomaly: string[] = ['Rule test1', 'Rule test2', 'Rule test3'];
const AnomalyItem: React.FC<Props> = (props: Props) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(null);
  const onEdit = () => {};
  const onDelete = () => {
    props.onDelete(props.index);
  };

  const onSelect = (item: string) => {
    setSelectedValue(item);
  };
  return (
    <DataItemWrapper>
      <Dropdown values={itemsAnomaly} selectedValue={selectedValue} onSelectValue={onSelect} placeholder="Choose Anomaly type" />
      <SettingsButton id={`settingsAnomalyButton${props.index}`} width="24px" height="40px" hoverIconColor="var(--_hoverButtonBg)">
        <PopupContent>
          <PopupItem label="Edit" icon={editIcon} onClick={onEdit} />
          <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon()} onClick={onDelete} />
        </PopupContent>
      </SettingsButton>
    </DataItemWrapper>
  );
};
export default React.memo(AnomalyItem);
