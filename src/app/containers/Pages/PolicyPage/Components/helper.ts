import {
  ISegmentApplicationSegMatchRuleP,
  ISegmentExternalSegMatchRuleP,
  ISegmentNetworkSegMatchRuleP,
  ISegmentSegmentP,
  ISegmentSiteSegmentMatchRuleP,
  SegmentApplicationSegMatchKey,
  SegmentApplicationSegMatchScope,
  SegmentExternalSegMatchKey,
  SegmentNetworkSegMatchKey,
  SegmentSegmentType,
  SegmentSiteSegmentMatchKey,
} from 'lib/api/ApiModels/Policy/Segment';
import { INetworkDevice, INetworkTag, INetworkVM, INetworkVNetwork } from 'lib/api/ApiModels/Topology/apiModels';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { DEFAULT_SEGMENTS_COLORS_SCHEMA, ISegmentComplete } from './models';
import { Validator } from 'ip-num/Validator';
import uuid from 'react-uuid';

const createNewSegment = (): ISegmentSegmentP => {
  const _col = Math.floor(Math.random() * DEFAULT_SEGMENTS_COLORS_SCHEMA[0].length);
  const _row = Math.floor(Math.random() * DEFAULT_SEGMENTS_COLORS_SCHEMA.length);
  const randomColor = DEFAULT_SEGMENTS_COLORS_SCHEMA[_row][_col] || '#000000';
  return {
    id: '',
    name: '',
    description: '',
    segType: null,
    networkSegPol: null,
    appSegPol: null,
    extSegPol: null,
    serviceSegPol: null,
    paasSegPol: null,
    siteSegPol: null,
    color: randomColor,
  };
};

const changeSegmentType = (segment: ISegmentSegmentP, type: SegmentSegmentType): ISegmentSegmentP => {
  const _s: ISegmentSegmentP = jsonClone(segment);
  _s.segType = type;
  if (type === SegmentSegmentType.NETWORK && !_s.networkSegPol) {
    _s.networkSegPol = {
      matchRules: [],
    };
  }
  if (type === SegmentSegmentType.APPLICATION && !_s.appSegPol) {
    _s.appSegPol = {
      matchScope: SegmentApplicationSegMatchScope.APP_SEG_MATCH_SCOPE_VM,
      matchRules: [],
    };
  }
  if (type === SegmentSegmentType.SITE && !_s.siteSegPol) {
    _s.siteSegPol = {
      matchRules: [],
    };
  }
  if (type === SegmentSegmentType.EXTERNAL && !_s.extSegPol) {
    _s.extSegPol = {
      matchRules: [],
    };
  }
  return _s;
};

const onCreateExtRule = (): ISegmentExternalSegMatchRuleP => {
  return {
    matchKey: SegmentExternalSegMatchKey.EXT_SEG_MATCH_KEY_IP_PREFIXES,
    matchValue: null,
    uiId: uuid(),
  };
};

const updateSegmentDataToEdit = (item: ISegmentSegmentP): ISegmentSegmentP => {
  if (!item.segType || item.segType !== SegmentSegmentType.EXTERNAL) return item;
  if (!item.extSegPol.matchRules || !item.extSegPol.matchRules.length) return item;
  const _s: ISegmentSegmentP = jsonClone(item);
  _s.extSegPol.matchRules.forEach(it => {
    it.uiId = uuid();
  });
  return _s;
};

const prepareNewSegmentForSave = (segment: ISegmentSegmentP): ISegmentSegmentP => {
  const _s: ISegmentSegmentP = jsonClone(segment);
  if (_s.segType === SegmentSegmentType.NETWORK) {
    _s.appSegPol = null;
    _s.extSegPol = null;
    _s.paasSegPol = null;
    _s.serviceSegPol = null;
    _s.siteSegPol = null;
  }
  if (_s.segType === SegmentSegmentType.APPLICATION) {
    _s.networkSegPol = null;
    _s.extSegPol = null;
    _s.paasSegPol = null;
    _s.serviceSegPol = null;
    _s.siteSegPol = null;
  }
  if (_s.segType === SegmentSegmentType.SITE) {
    _s.networkSegPol = null;
    _s.extSegPol = null;
    _s.paasSegPol = null;
    _s.serviceSegPol = null;
    _s.appSegPol = null;
  }
  if (_s.segType === SegmentSegmentType.EXTERNAL) {
    _s.networkSegPol = null;
    _s.siteSegPol = null;
    _s.paasSegPol = null;
    _s.serviceSegPol = null;
    _s.appSegPol = null;
    _s.extSegPol.matchRules.forEach(rule => {
      delete rule.uiId;
    });
  }
  return _s;
};

const updateMatchRule = (
  segment: ISegmentSegmentP,
  rule: ISegmentSiteSegmentMatchRuleP | ISegmentApplicationSegMatchRuleP | ISegmentNetworkSegMatchRuleP | ISegmentExternalSegMatchRuleP,
  index?: number,
): ISegmentSegmentP => {
  const _s: ISegmentSegmentP = jsonClone(segment);
  if (_s.segType === SegmentSegmentType.NETWORK) {
    const _arr: ISegmentNetworkSegMatchRuleP[] = segment.networkSegPol.matchRules.slice();
    const _r = rule as ISegmentNetworkSegMatchRuleP;
    const index = _arr.findIndex(it => it.matchKey === _r.matchKey && it.matchValuePrimary === _r.matchValuePrimary && it.matchValueSecondary === _r.matchValueSecondary);
    if (index !== -1) {
      _arr.splice(index, 1);
    } else {
      _arr.push(rule as ISegmentNetworkSegMatchRuleP);
    }
    _s.networkSegPol = { matchRules: _arr };
  }
  if (_s.segType === SegmentSegmentType.APPLICATION) {
    const _arr: ISegmentApplicationSegMatchRuleP[] = segment.appSegPol.matchRules.slice();
    const _r = rule as ISegmentApplicationSegMatchRuleP;
    const index = _arr.findIndex(it => it.matchKey === _r.matchKey && it.matchValuePrimary === _r.matchValuePrimary && it.matchValueSecondary === _r.matchValueSecondary);
    if (index !== -1) {
      _arr.splice(index, 1);
    } else {
      _arr.push(rule as ISegmentApplicationSegMatchRuleP);
    }
    _s.appSegPol = { matchScope: segment.appSegPol.matchScope, matchRules: _arr };
  }
  if (_s.segType === SegmentSegmentType.SITE) {
    const _arr: ISegmentSiteSegmentMatchRuleP[] = segment.siteSegPol.matchRules.slice();
    const _r = rule as ISegmentSiteSegmentMatchRuleP;
    const index = _arr.findIndex(it => it.matchKey === _r.matchKey && it.matchValuePrimary === _r.matchValuePrimary);
    if (index !== -1) {
      _arr.splice(index, 1);
    } else {
      _arr.push(rule as ISegmentSiteSegmentMatchRuleP);
    }
    _s.siteSegPol = { matchRules: _arr };
  }
  if (_s.segType === SegmentSegmentType.EXTERNAL) {
    const _arr: ISegmentExternalSegMatchRuleP[] = segment.extSegPol.matchRules.slice();
    if (!index && index !== 0) {
      _arr.push(rule as ISegmentExternalSegMatchRuleP);
    } else {
      _arr.splice(index, 1, rule as ISegmentExternalSegMatchRuleP);
    }
    _s.extSegPol = { matchRules: _arr };
  }
  return _s;
};

const removeMatchRule = (
  segment: ISegmentSegmentP,
  index: number,
  rule?: ISegmentSiteSegmentMatchRuleP | ISegmentApplicationSegMatchRuleP | ISegmentNetworkSegMatchRuleP | ISegmentExternalSegMatchRuleP,
): ISegmentSegmentP => {
  const _s: ISegmentSegmentP = jsonClone(segment);
  if (_s.segType === SegmentSegmentType.EXTERNAL) {
    const _arr: ISegmentExternalSegMatchRuleP[] = segment.extSegPol.matchRules.slice();
    _arr.splice(index, 1);
    _s.extSegPol = { matchRules: _arr };
  }
  return _s;
};

const updateMatchRules = (segment: ISegmentSegmentP, rules: (ISegmentSiteSegmentMatchRuleP | ISegmentApplicationSegMatchRuleP | ISegmentNetworkSegMatchRuleP)[]): ISegmentSegmentP => {
  const _s: ISegmentSegmentP = jsonClone(segment);
  if (_s.segType === SegmentSegmentType.NETWORK) {
    updateNetworkMatchRules(_s, rules as ISegmentNetworkSegMatchRuleP[]);
  }
  if (_s.segType === SegmentSegmentType.APPLICATION) {
    updateAppMatchRules(_s, rules as ISegmentApplicationSegMatchRuleP[]);
  }
  if (_s.segType === SegmentSegmentType.SITE) {
    updateSitesMatchRules(_s, rules as ISegmentSiteSegmentMatchRuleP[]);
  }
  return _s;
};

const updateNetworkMatchRules = (_s: ISegmentSegmentP, rules: ISegmentNetworkSegMatchRuleP[]) => {
  if (!_s.networkSegPol.matchRules || !_s.networkSegPol.matchRules.length) {
    _s.networkSegPol = {
      matchRules: rules,
    };
  } else {
    const _all: ISegmentNetworkSegMatchRuleP[] = _s.networkSegPol.matchRules.slice();
    const SetRules = new Map();
    _all.forEach(it => {
      SetRules.set(`${it.matchKey}${it.matchValuePrimary}${it.matchValueSecondary ? it.matchValueSecondary : ''}`, it);
    });
    const current = _all.filter(rule =>
      rules.find(item => item.matchKey === rule.matchKey && item.matchValuePrimary === rule.matchValuePrimary && item.matchValueSecondary === rule.matchValueSecondary),
    );

    if (current.length === rules.length) {
      rules.forEach(it => {
        SetRules.delete(`${it.matchKey}${it.matchValuePrimary}${it.matchValueSecondary ? it.matchValueSecondary : ''}`);
      });
    } else {
      rules.forEach(it => {
        SetRules.set(`${it.matchKey}${it.matchValuePrimary}${it.matchValueSecondary ? it.matchValueSecondary : ''}`, it);
      });
    }
    const _arr = Array.from(SetRules, ([name, value]) => value);
    _s.networkSegPol = { matchRules: _arr };
  }
};

const updateAppMatchRules = (_s: ISegmentSegmentP, rules: ISegmentApplicationSegMatchRuleP[]) => {
  if (!_s.appSegPol.matchRules || !_s.appSegPol.matchRules.length) {
    _s.appSegPol = {
      matchScope: _s.appSegPol.matchScope,
      matchRules: rules,
    };
  } else {
    const _all: ISegmentApplicationSegMatchRuleP[] = _s.appSegPol.matchRules.slice();
    const SetRules = new Map();
    _all.forEach(it => {
      SetRules.set(`${it.matchKey}${it.matchValuePrimary}${it.matchValueSecondary ? it.matchValueSecondary : ''}`, it);
    });
    const current = _all.filter(rule =>
      rules.find(item => item.matchKey === rule.matchKey && item.matchValuePrimary === rule.matchValuePrimary && item.matchValueSecondary === rule.matchValueSecondary),
    );

    if (current.length === rules.length) {
      rules.forEach(it => {
        SetRules.delete(`${it.matchKey}${it.matchValuePrimary}${it.matchValueSecondary ? it.matchValueSecondary : ''}`);
      });
    } else {
      rules.forEach(it => {
        SetRules.set(`${it.matchKey}${it.matchValuePrimary}${it.matchValueSecondary ? it.matchValueSecondary : ''}`, it);
      });
    }
    const _arr = Array.from(SetRules, ([name, value]) => value);
    _s.appSegPol = { matchScope: _s.appSegPol.matchScope, matchRules: _arr };
  }
};

const updateSitesMatchRules = (_s: ISegmentSegmentP, rules: ISegmentSiteSegmentMatchRuleP[]) => {
  if (!_s.siteSegPol.matchRules || !_s.siteSegPol.matchRules.length) {
    _s.siteSegPol = { matchRules: rules };
  } else {
    const _all: ISegmentSiteSegmentMatchRuleP[] = _s.siteSegPol.matchRules.slice();
    const SetRules = new Map();
    _all.forEach(it => {
      SetRules.set(`${it.matchKey}${it.matchValuePrimary}`, it);
    });
    const current = _all.filter(rule => rules.find(item => item.matchKey === rule.matchKey && item.matchValuePrimary === rule.matchValuePrimary));

    if (current.length === rules.length) {
      rules.forEach(it => {
        SetRules.delete(`${it.matchKey}${it.matchValuePrimary}`);
      });
    } else {
      rules.forEach(it => {
        SetRules.set(`${it.matchKey}${it.matchValuePrimary}`, it);
      });
    }
    const _arr = Array.from(SetRules, ([name, value]) => value);
    _s.siteSegPol = { matchRules: _arr };
  }
  return _s;
};

const onValidateSegment = (_s: ISegmentSegmentP): ISegmentComplete => {
  const _obj: ISegmentComplete = { step_1: false, step_2: false };
  if (!_s) return _obj;
  if (!_s.name || !_s.segType || !_s.color) {
    _obj.step_1 = false;
  } else {
    _obj.step_1 = true;
  }
  if (_s.segType && _s.segType === SegmentSegmentType.NETWORK) {
    if (!_s.networkSegPol || (_s.networkSegPol && (!_s.networkSegPol.matchRules || !_s.networkSegPol.matchRules.length))) {
      _obj.step_2 = false;
    } else {
      _obj.step_2 = true;
    }
  }
  if (_s.segType && _s.segType === SegmentSegmentType.APPLICATION) {
    if (!_s.appSegPol || (_s.appSegPol && (!_s.appSegPol.matchScope || !_s.appSegPol.matchRules || !_s.appSegPol.matchRules.length))) {
      _obj.step_2 = false;
    } else {
      _obj.step_2 = true;
    }
  }
  if (_s.segType && _s.segType === SegmentSegmentType.SITE) {
    if (!_s.siteSegPol || (_s.siteSegPol && (!_s.siteSegPol.matchRules || !_s.siteSegPol.matchRules.length))) {
      _obj.step_2 = false;
    } else {
      _obj.step_2 = true;
    }
  }
  if (_s.segType && _s.segType === SegmentSegmentType.EXTERNAL) {
    if (!_s.extSegPol || (_s.extSegPol && (!_s.extSegPol.matchRules || !_s.extSegPol.matchRules.length || !checkExtRules(_s.extSegPol.matchRules)))) {
      _obj.step_2 = false;
    } else {
      _obj.step_2 = true;
    }
  }
  return _obj;
};

const checkExtRules = (items: ISegmentExternalSegMatchRuleP[]): boolean => {
  let valid = true;
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (!element.matchValue) {
      valid = false;
      break;
    }
    const _obj: [boolean, string[]] = Validator.isValidIPv4CidrNotation(element.matchValue);
    if (!_obj[0]) {
      valid = false;
      break;
    }
  }
  return valid;
};

const getVmsFieldFromRuleKey = (key: SegmentApplicationSegMatchKey): string => {
  if (key === SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG) return 'tags';
  return 'tags';
};

const getSelectedTagFromVms = (vms: INetworkVM[], rule: ISegmentApplicationSegMatchRuleP): INetworkTag => {
  if (!vms || !vms.length) return null;
  let tag = null;
  for (let i = 0; i < vms.length; i++) {
    if (!vms[i].tags || !vms[i].tags.length) continue;
    const _tag = getSelectedTagFromVm(vms[i], rule);
    if (_tag) {
      tag = _tag;
      break;
    }
  }
  return tag;
};

const getSelectedTagFromVm = (vm: INetworkVM, rule: ISegmentApplicationSegMatchRuleP): INetworkTag => {
  let tag = null;
  for (let i = 0; i < vm.tags.length; i++) {
    const _tag = vm.tags[i];
    if (_tag.key === rule.matchValuePrimary && _tag.value === rule.matchValueSecondary) {
      tag = _tag;
      break;
    }
  }
  return tag;
};

const getSitesFieldFromRuleKey = (key: SegmentSiteSegmentMatchKey): string => {
  if (key === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK) return 'networkId';
  if (key === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_SERIAL_NUM) return 'serial';
  if (key === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_MODEL) return 'model';
  return 'networkId';
};

const getSitesFieldValueFromRuleKey = (key: SegmentSiteSegmentMatchKey, item: INetworkDevice): string => {
  if (key === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_NETWORK) return item.networkId;
  if (key === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_SERIAL_NUM) return item.serial;
  if (key === SegmentSiteSegmentMatchKey.SITE_SEG_MATCH_KEY_MODEL) return item.model;
  return item.networkId;
};

const getVisibleVnetData = (data: INetworkVNetwork[], metchKey: SegmentNetworkSegMatchKey) => {
  if (!data || !data.length) return [];
  if (metchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID) {
    return data;
  }
  if (metchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_TAG) {
    const _arr = new Map();
    data.forEach(it => {
      if (it.tags && it.tags.length) {
        it.tags.forEach(tag => {
          if (tag.key && tag.value && !_arr.has(`${tag.key}${tag.value}`)) {
            const _item: INetworkTag = tag.id ? { ...tag } : { ...tag, id: `${tag.key}${tag.value}` };
            _arr.set(`${tag.key}${tag.value}`, _item);
          }
        });
      }
    });
    return Array.from(_arr, ([name, value]) => value);
  }
  return data;
};

const getSelectedTagFromVpcs = (items: INetworkVNetwork[], rule: ISegmentNetworkSegMatchRuleP): INetworkTag => {
  if (!items || !items.length) return null;
  let tag = null;
  for (let i = 0; i < items.length; i++) {
    if (!items[i].tags || !items[i].tags.length) continue;
    const _tag = getSelectedTagFromVpc(items[i], rule);
    if (_tag) {
      tag = _tag;
      break;
    }
  }
  return tag;
};

const getSelectedTagFromVpc = (vm: INetworkVNetwork, rule: ISegmentNetworkSegMatchRuleP): INetworkTag => {
  let tag = null;
  for (let i = 0; i < vm.tags.length; i++) {
    const _tag = vm.tags[i];
    if (_tag.key === rule.matchValuePrimary && _tag.value === rule.matchValueSecondary) {
      tag = _tag;
      break;
    }
  }
  return tag;
};

export {
  createNewSegment,
  onValidateSegment,
  changeSegmentType,
  removeMatchRule,
  updateMatchRule,
  updateMatchRules,
  prepareNewSegmentForSave,
  getSelectedTagFromVms,
  getVmsFieldFromRuleKey,
  getSitesFieldFromRuleKey,
  getSitesFieldValueFromRuleKey,
  getVisibleVnetData,
  getSelectedTagFromVpcs,
  onCreateExtRule,
  checkExtRules,
  updateSegmentDataToEdit,
};
