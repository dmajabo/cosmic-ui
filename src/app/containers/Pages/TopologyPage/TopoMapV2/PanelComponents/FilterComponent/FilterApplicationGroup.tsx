import { FilterGroupItem, GroupItemIcon, GroupItemLabel, ItemWrapper } from 'app/components/Basic/FilterComponents/styles';
import SimpleCheckbox from 'app/components/Inputs/Checkbox/SimpleCheckbox';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';
import { IMapped_Application } from 'lib/hooks/Topology/models';
import React from 'react';

interface Props {
  data: IMapped_Application[];
  iconStyles?: Object;
  onClick: (node: IMapped_Application, index: number, selected: boolean) => void;
}

const FilterApplicationGroup: React.FC<Props> = (props: Props) => {
  const onClick = (node: IMapped_Application, index: number) => {
    props.onClick(node, index, !node.selected);
  };
  return (
    <>
      {props.data.map((app, index) => {
        return (
          <FilterGroupItem key={`filteroption${app.extId}`}>
            <ItemWrapper onClick={() => onClick(app, index)}>
              <SimpleCheckbox isChecked={app.selected} wrapStyles={{ margin: '0 10px 0 0' }} readOnly inputStyles={{ pointerEvents: 'none' }} />
              <GroupItemIcon style={props.iconStyles}>{logoIcon()} </GroupItemIcon>
              <GroupItemLabel maxWidth="calc(100% - 58px)">{app && app.dataItem && app.dataItem.name ? app.dataItem.name.toUpperCase() : app.dataItem.name}</GroupItemLabel>
            </ItemWrapper>
          </FilterGroupItem>
        );
      })}
    </>
  );
};

export default React.memo(FilterApplicationGroup);
