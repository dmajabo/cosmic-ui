import { IBaseEntity } from 'lib/models/general';
import { IBaseTotalCount, IBasePages } from '../generalApiModel';

export enum SegmentSegmentType {
  NONE = 'NONE',
  SITE = 'SITE', // old Network Branch
  APPLICATION = 'APPLICATION', // color vm
  NETWORK = 'NETWORK', // color for vps
  EXTERNAL = 'EXTERNAL',
  SERVICE = 'SERVICE',
  PAAS = 'PAAS',
}

export enum SegmentExternalSegMatchKey {
  EXT_SEG_MATCH_KEY_IP_PREFIXES = 'EXT_SEG_MATCH_KEY_IP_PREFIXES',
}

export interface ISegmentExternalSegMatchRuleP {
  matchKey: SegmentExternalSegMatchKey;
  matchValue: string;
  uiId?: string;
}

export interface ISegmentExternalSegmentP {
  matchRules: ISegmentExternalSegMatchRuleP[];
}

export enum SegmentApplicationSegMatchScope {
  APP_SEG_MATCH_SCOPE_VM = 'APP_SEG_MATCH_SCOPE_VM',
}

export enum SegmentApplicationSegMatchKey {
  APP_SEG_MATCH_KEY_TAG = 'APP_SEG_MATCH_KEY_TAG',
}

export interface ISegmentApplicationSegMatchRuleP {
  matchKey: SegmentApplicationSegMatchKey;
  matchValuePrimary: string; // tag key
  matchValueSecondary: string; // tag value
}
export interface ISegmentApplicatonSegmentP {
  matchScope: SegmentApplicationSegMatchScope;
  matchRules: ISegmentApplicationSegMatchRuleP[];
}
export enum SegmentNetworkSegMatchKey {
  KEY_VNETWORK_EXTID = 'KEY_VNETWORK_EXTID', // "default": "KEY_VNETWORK_EXTID",
  KEY_VNETWORK_TAG = 'KEY_VNETWORK_TAG',
}
export interface ISegmentNetworkSegMatchRuleP {
  matchKey: SegmentNetworkSegMatchKey;
  matchValuePrimary: string; // KEY_VNETWORK_EXTID ? extId : KEY_VNETWORK_TAG === TAG_KEy
  matchValueSecondary: string; // KEY_VNETWORK_EXTID ? null : KEY_VNETWORK_TAG === TAG_VALUE
}
export interface ISegmentNetworkSegmentP {
  matchRules: ISegmentNetworkSegMatchRuleP[];
}

export interface ISegmentServiceSegmentP {
  // "title": "Policy for Service like FWs, LBs etc"
}
export interface ISegmentPaasSegementP {
  // "title": "Policy for Cloud Natve Paas Services"
}

export enum SegmentSiteSegmentMatchKey {
  SITE_SEG_MATCH_KEY_NETWORK = 'SITE_SEG_MATCH_KEY_NETWORK',
  SITE_SEG_MATCH_KEY_MODEL = 'SITE_SEG_MATCH_KEY_MODEL',
  SITE_SEG_MATCH_KEY_SERIAL_NUM = 'SITE_SEG_MATCH_KEY_SERIAL_NUM',
}

export interface ISegmentSiteSegmentMatchRuleP {
  matchKey: SegmentSiteSegmentMatchKey; //  "default": "SITE_SEG_MATCH_KEY_NETWORK",
  matchValuePrimary: string;
}
export interface ISegmentSiteSegmentP {
  matchRules: ISegmentSiteSegmentMatchRuleP[];
}

export interface ISegmentSegmentP extends IBaseEntity<string> {
  name: string;
  description: string;
  segType: SegmentSegmentType;
  networkSegPol: ISegmentNetworkSegmentP;
  appSegPol: ISegmentApplicatonSegmentP;
  extSegPol: ISegmentExternalSegmentP;
  serviceSegPol: ISegmentServiceSegmentP;
  paasSegPol: ISegmentPaasSegementP;
  siteSegPol: ISegmentSiteSegmentP;
  color: string;

  extId?: string; // on ui
}
export interface IPolicysvcListSegmentPsResponse extends IBaseTotalCount, IBasePages {
  segments: ISegmentSegmentP[];
}
