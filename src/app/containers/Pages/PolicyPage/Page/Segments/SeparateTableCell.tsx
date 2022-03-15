import React from 'react';
import { ISegmentSegmentP, SegmentNetworkSegMatchKey, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import { ValuesStyle, VpcIconStyled } from '../Inventory/Layer7/styles';
import uniqueId from 'lodash/uniqueId';
import { VpcIcon } from 'app/components/SVGIcons/pagesIcons/vpc';

interface Props {
  dataItem: ISegmentSegmentP;
}

const SeparateTableCell: React.FC<Props> = ({ dataItem }) => {
  if (dataItem.segType === SegmentSegmentType.APPLICATION && dataItem.appSegPol && dataItem.appSegPol.matchRules && dataItem.appSegPol.matchRules.length) {
    const _str = dataItem.appSegPol.matchRules.map(it => <ValuesStyle key={uniqueId()}>{`${it.matchValuePrimary}: ${it.matchValueSecondary}`}</ValuesStyle>);
    return <div>{_str}</div>;
  }
  if (dataItem.segType === SegmentSegmentType.SITE && dataItem.siteSegPol && dataItem.siteSegPol.matchRules && dataItem.siteSegPol.matchRules.length) {
    const _str = dataItem.siteSegPol.matchRules.map(it => <ValuesStyle key={uniqueId()}>{it.matchValuePrimary}</ValuesStyle>);
    return <div>{_str}</div>;
  }
  if (dataItem.segType === SegmentSegmentType.NETWORK && dataItem.networkSegPol && dataItem.networkSegPol.matchRules && dataItem.networkSegPol.matchRules.length) {
    const _str = dataItem.networkSegPol.matchRules.map(it => {
      if (it.matchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID) {
        return (
          <ValuesStyle key={uniqueId()} style={{ paddingLeft: '3px' }}>
            <VpcIconStyled>
              <VpcIcon />
            </VpcIconStyled>
            {it.matchValuePrimary}
          </ValuesStyle>
        );
      }
      return <ValuesStyle key={uniqueId()}>{`${it.matchValuePrimary}: ${it.matchValueSecondary}`}</ValuesStyle>;
    });
    return <div>{_str}</div>;
  }
  if (dataItem.segType === SegmentSegmentType.EXTERNAL && dataItem.extSegPol && dataItem.extSegPol.matchRules && dataItem.extSegPol.matchRules.length) {
    const _str = dataItem.extSegPol.matchRules.map(it => <ValuesStyle key={uniqueId()}>{it.matchValue}</ValuesStyle>);
    return <div>{_str}</div>;
  }
  return null;
};

export default React.memo(SeparateTableCell);
