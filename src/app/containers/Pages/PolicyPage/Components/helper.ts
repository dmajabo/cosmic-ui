import { ISegmentSegmentP, SegmentApplicationSegMatchScope, SegmentSegmentType } from 'lib/api/ApiModels/Policy/Segment';
import { jsonClone } from 'lib/helpers/cloneHelper';

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

const onValidateGroup = (_s: ISegmentSegmentP): boolean => {
  if (!_s) {
    return false;
  }
  if (!_s.name || !_s.segType) {
    return false;
  }
  return true;
};

export { createNewSegment, onValidateGroup, changeSegmentType };
