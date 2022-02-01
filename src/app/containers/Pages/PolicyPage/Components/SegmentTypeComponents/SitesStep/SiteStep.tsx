import React from 'react';
import { ModalLabel, ModalRow } from 'app/containers/Pages/Edges/Editor/Components/styles';
import { ISegmentSiteSegmentMatchRuleP, SegmentSegmentType, SegmentSiteSegmentMatchKey } from 'lib/api/ApiModels/Policy/Segment';
import RegionRule from './RegionRule';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { addIcon } from 'app/components/SVGIcons/addIcon';
import * as helper from '../../helper';
import { RulesContainer } from '../../styles';
import MatSelect from 'app/components/Inputs/MatSelect';
import { ValueLabel } from 'app/components/Inputs/MatSelect/styles';
import DevicesTable from './DevicesTable';
interface Props {
  matchRules: ISegmentSiteSegmentMatchRuleP[];
  selectedMatchKey: SegmentSiteSegmentMatchKey;
  onChangeMatchKey: (type: SegmentSegmentType, v: SegmentSiteSegmentMatchKey) => void;
  onUpdateSiteRegionRule: (rule: ISegmentSiteSegmentMatchRuleP, index?: number) => void;
  onRemoveSiteRegiomnRule: (rule: ISegmentSiteSegmentMatchRuleP, index: number) => void;
  onSelectChange: (type: SegmentSegmentType, rule: ISegmentSiteSegmentMatchRuleP) => void;
  onSelectAll: (type: SegmentSegmentType, rules: ISegmentSiteSegmentMatchRuleP[]) => void;
}

const SiteStep: React.FC<Props> = (props: Props) => {
  const [disabledCreate, setDisabledCreate] = React.useState<boolean>(props.matchRules.length ? true : false);

  React.useEffect(() => {
    if (!props.matchRules || !props.matchRules.length) {
      setDisabledCreate(false);
    } else {
      const allValid = helper.checkSiteRegionRules(props.matchRules);
      setDisabledCreate(!allValid);
    }
  }, [props.matchRules]);
  const onCreateRule = () => {
    setDisabledCreate(true);
    const _r: ISegmentSiteSegmentMatchRuleP = helper.onCreateRegionRule();
    props.onUpdateSiteRegionRule(_r);
  };

  const onUpdateRule = (rule: ISegmentSiteSegmentMatchRuleP, index: number) => {
    props.onUpdateSiteRegionRule(rule, index);
  };

  const onRemoveRule = (rule: ISegmentSiteSegmentMatchRuleP, index: number) => {
    props.onRemoveSiteRegiomnRule(rule, index);
  };

  const onChangeMatchKey = (v: SegmentSiteSegmentMatchKey) => {
    props.onChangeMatchKey(SegmentSegmentType.SITE, v);
  };

  return (
    <>
      <ModalRow margin="0 0 20px 0">
        <MatSelect
          id="siteMatchKeyType"
          label="Key"
          value={props.selectedMatchKey}
          options={[
            SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK,
            SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_MODEL,
            SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_SERIAL_NUM,
            SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_REGION_NAME,
          ]}
          styles={{ height: '72px', minHeight: '72px', margin: '0' }}
          selectStyles={{ height: '50px', width: '100%' }}
          selectClaassName="withLabel"
          onChange={onChangeMatchKey}
          renderValue={(v: SegmentSiteSegmentMatchKey) => {
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK) return <ValueLabel>On-Prem Network</ValueLabel>;
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_MODEL) return <ValueLabel>Model</ValueLabel>;
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_SERIAL_NUM) return <ValueLabel>Serial number</ValueLabel>;
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_REGION_NAME) return <ValueLabel>Region Name</ValueLabel>;
            return <ValueLabel>{v}</ValueLabel>;
          }}
          renderOption={(v: SegmentSiteSegmentMatchKey) => {
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK) return 'On-Prem Network';
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_MODEL) return 'Model';
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_SERIAL_NUM) return 'Serial number';
            if (v === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_REGION_NAME) return <ValueLabel>Region Name</ValueLabel>;
            return v;
          }}
        />
      </ModalRow>
      <ModalRow margin="0px 0 10px 0">
        {props.selectedMatchKey === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_REGION_NAME && <ModalLabel>Region Rules</ModalLabel>}
        {props.selectedMatchKey !== SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_REGION_NAME && <ModalLabel>DEVICES</ModalLabel>}
      </ModalRow>
      {props.selectedMatchKey === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_REGION_NAME && (
        <RulesContainer>
          {props.matchRules && props.matchRules.length && props.matchRules.find(it => it.matchKey === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_REGION_NAME) ? (
            props.matchRules.map((it, index) => {
              if (it.matchKey !== SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_REGION_NAME) return null;
              return (
                <ModalRow margin="0 0 20px 0">
                  <RegionRule key={`extMatchRule${it.uiId}`} data={it} index={index} onChange={onUpdateRule} onRemoveRule={onRemoveRule} />
                </ModalRow>
              );
            })
          ) : (
            <ModalRow margin="40px auto 40px auto">There are no region rules yet. To create rule click the button bellow.</ModalRow>
          )}
          <ModalRow margin="0">
            <SecondaryButton
              icon={addIcon}
              disabled={disabledCreate}
              onClick={onCreateRule}
              label="Add rule"
              styles={{
                margin: props.matchRules && props.matchRules.length && props.matchRules.find(it => it.matchKey === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_REGION_NAME) ? '0 0 0 auto' : '0 auto',
              }}
            />
          </ModalRow>
        </RulesContainer>
      )}
      {props.selectedMatchKey !== SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_REGION_NAME && (
        <DevicesTable matchRules={props.matchRules} selectedMatchKey={props.selectedMatchKey} onSelectChange={props.onSelectChange} onSelectAll={props.onSelectAll} />
      )}
    </>
  );
};

export default React.memo(SiteStep);
