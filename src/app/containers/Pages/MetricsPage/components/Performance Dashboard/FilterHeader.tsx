import { IconButton, Menu, MenuItem } from '@mui/material';
import { GroupItemLabel } from 'app/components/Basic/FilterComponents/styles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { filterIcon } from 'app/components/SVGIcons/filter';
import { IMapped_Segment } from 'lib/hooks/Topology/models';
import React, { useState } from 'react';
import { PerformanceDashboardStyles } from './PerformanceDashboardStyles';

export interface FilterTagsOption {
  readonly id: string;
  readonly key: string;
  readonly ownerId: string;
  readonly regionCode: string;
  readonly value: string;
  readonly selected: boolean;
  readonly networkIds: string[];
}

interface FilterHeaderProps {
  readonly title: string;
  readonly onItemClick: (index: number, selected: boolean) => void;
  readonly tagOptions?: FilterTagsOption[];
  readonly segmentOptions?: IMapped_Segment[];
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({ title, onItemClick, tagOptions, segmentOptions }) => {
  const classes = PerformanceDashboardStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const onOptionClick = (index: number, selected: boolean) => () => {
    onItemClick(index, !selected);
  };

  return (
    <div className={classes.tableHeaderContainer}>
      <div className={classes.tableHeaderTitle}>{title}</div>
      <div>
        <IconButton aria-controls="test-menu" aria-haspopup="true" onClick={handleClick}>
          {filterIcon}
        </IconButton>
        <Menu id="test-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {tagOptions?.map((option, index) => (
            <MenuItem key={`${option.key}_${option.value}`} onClick={onOptionClick(index, option.selected)}>
              <SimpleCheckbox isChecked={option.selected} wrapStyles={{ margin: '0 10px 0 0' }} readOnly inputStyles={{ pointerEvents: 'none' }} />
              <GroupItemLabel maxWidth="100%">{option.value}</GroupItemLabel>
            </MenuItem>
          )) || null}
          {segmentOptions?.map((option, index) => (
            <MenuItem key={option.id} onClick={onOptionClick(index, option.selected)}>
              <SimpleCheckbox isChecked={option.selected} wrapStyles={{ margin: '0 10px 0 0' }} readOnly inputStyles={{ pointerEvents: 'none' }} />
              <GroupItemLabel maxWidth="100%">{option.dataItem.name}</GroupItemLabel>
            </MenuItem>
          )) || null}
        </Menu>
      </div>
    </div>
  );
};
