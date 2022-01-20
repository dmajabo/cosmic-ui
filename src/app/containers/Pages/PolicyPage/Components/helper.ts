import {
  ISegmentApplicationSegMatchRuleP,
  ISegmentNetworkSegMatchRuleP,
  ISegmentSegmentP,
  SegmentApplicationSegMatchKey,
  SegmentApplicationSegMatchScope,
  SegmentNetworkSegMatchKey,
  SegmentSegmentType,
} from 'lib/api/ApiModels/Policy/Segment';
import { INetworkVM, INetworkDevice, INetworkVNetwork } from 'lib/api/ApiModels/Topology/apiModels';
import { jsonClone } from 'lib/helpers/cloneHelper';
import { ISegmentComplete } from './models';

const createNewSegment = (): ISegmentSegmentP => ({
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
  color: '',
});

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
    _s.siteSegPol = {};
  }
  return _s;
};

const prepareNewSegment = (segment: ISegmentSegmentP): ISegmentSegmentP => {
  const _s: ISegmentSegmentP = jsonClone(segment);
  if (_s.segType === SegmentSegmentType.NETWORK) {
    _s.appSegPol = null;
    _s.extSegPol = null;
    _s.paasSegPol = null;
    _s.serviceSegPol = null;
    _s.siteSegPol = null;
  }
  if (_s.segType === SegmentSegmentType.APPLICATION && !_s.appSegPol) {
    _s.networkSegPol = null;
    _s.extSegPol = null;
    _s.paasSegPol = null;
    _s.serviceSegPol = null;
    _s.siteSegPol = null;
  }
  if (_s.segType === SegmentSegmentType.SITE && !_s.siteSegPol) {
    _s.networkSegPol = null;
    _s.extSegPol = null;
    _s.paasSegPol = null;
    _s.serviceSegPol = null;
    _s.appSegPol = null;
  }
  return _s;
};

const updateMatchRule = (segment: ISegmentSegmentP, item: INetworkVM | INetworkDevice | INetworkVNetwork): ISegmentSegmentP => {
  const _s: ISegmentSegmentP = jsonClone(segment);
  if (_s.segType === SegmentSegmentType.NETWORK) {
    const _arr: ISegmentNetworkSegMatchRuleP[] = segment.networkSegPol.matchRules.slice();
    const index = _arr.findIndex(it => it.matchKey === SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID && it.matchValuePrimary === item.extId);
    if (index !== -1) {
      _arr.splice(index, 1);
    } else {
      const _rule = {
        matchKey: SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID,
        matchValuePrimary: item.extId,
        matchValueSecondary: null,
      };
      _arr.push(_rule);
    }
    _s.networkSegPol = {
      matchRules: _arr,
    };
  }
  if (_s.segType === SegmentSegmentType.APPLICATION) {
    const _arr: ISegmentApplicationSegMatchRuleP[] = segment.appSegPol.matchRules.slice();
    const index = _arr.findIndex(it => it.matchKey === SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG && it.matchValuePrimary === item.extId);
    if (index !== -1) {
      _arr.splice(index, 1);
    } else {
      const _rule = {
        matchKey: SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG,
        matchValuePrimary: item.extId,
        matchValueSecondary: null,
      };
      _arr.push(_rule);
    }
    _s.appSegPol = {
      matchScope: SegmentApplicationSegMatchScope.APP_SEG_MATCH_SCOPE_VM,
      matchRules: _arr,
    };
  }
  if (_s.segType === SegmentSegmentType.SITE) {
    _s.siteSegPol = {};
  }
  return _s;
};

const updateMatchRules = (segment: ISegmentSegmentP, items: (INetworkVM | INetworkDevice | INetworkVNetwork)[]): ISegmentSegmentP => {
  const _s: ISegmentSegmentP = jsonClone(segment);
  if (_s.segType === SegmentSegmentType.NETWORK) {
    const _rules: ISegmentNetworkSegMatchRuleP[] = segment.networkSegPol.matchRules.slice();
    const SetRules = new Set<string>(_rules.map(it => it.matchValuePrimary));
    const idsArr = _rules.filter(rule => items.find(item => item.extId === rule.matchValuePrimary));
    if (idsArr.length === items.length) {
      items.forEach(it => {
        SetRules.delete(it.extId);
      });
    }
    if (idsArr.length !== items.length) {
      items.forEach(it => {
        SetRules.add(it.extId);
      });
    }
    _s.networkSegPol = {
      matchRules: [],
    };
    SetRules.forEach(v => {
      _s.networkSegPol.matchRules.push({
        matchKey: SegmentNetworkSegMatchKey.KEY_VNETWORK_EXTID,
        matchValuePrimary: v,
        matchValueSecondary: null,
      });
    });
  }
  if (_s.segType === SegmentSegmentType.APPLICATION) {
    const _rules: ISegmentApplicationSegMatchRuleP[] = segment.appSegPol.matchRules.slice();
    const SetRules = new Set<string>(_rules.map(it => it.matchValuePrimary));
    const idsArr = _rules.filter(rule => items.find(item => item.extId === rule.matchValuePrimary));
    if (idsArr.length === items.length) {
      items.forEach(it => {
        SetRules.delete(it.extId);
      });
    }
    if (idsArr.length !== items.length) {
      items.forEach(it => {
        SetRules.add(it.extId);
      });
    }
    _s.appSegPol = {
      matchScope: SegmentApplicationSegMatchScope.APP_SEG_MATCH_SCOPE_VM,
      matchRules: [],
    };
    SetRules.forEach(v => {
      _s.appSegPol.matchRules.push({
        matchKey: SegmentApplicationSegMatchKey.APP_SEG_MATCH_KEY_TAG,
        matchValuePrimary: v,
        matchValueSecondary: null,
      });
    });
  }
  if (_s.segType === SegmentSegmentType.SITE) {
    _s.siteSegPol = {};
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
    if (!_s.siteSegPol) {
      _obj.step_2 = false;
    } else {
      _obj.step_2 = true;
    }
  }
  return _obj;
};

export { createNewSegment, onValidateSegment, changeSegmentType, updateMatchRule, updateMatchRules, prepareNewSegment };
