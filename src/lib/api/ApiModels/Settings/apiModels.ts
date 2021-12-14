import { IBaseEntity } from 'lib/models/general';

export enum ACCESS_SECTIONS_PERMISION_VALUE {
  READ_WRITE = 'Write',
  READ = 'READ',
  NONE = 'NONE',
}

export interface IProfile {
  name: string;
  description: string;
  dashboard: ACCESS_SECTIONS_PERMISION_VALUE | null;
  topology: ACCESS_SECTIONS_PERMISION_VALUE | null;
  network: ACCESS_SECTIONS_PERMISION_VALUE | null;
  performance_dashboard: ACCESS_SECTIONS_PERMISION_VALUE | null;
  sessions: ACCESS_SECTIONS_PERMISION_VALUE | null;
  automation: ACCESS_SECTIONS_PERMISION_VALUE | null;
  analytics: ACCESS_SECTIONS_PERMISION_VALUE | null;
  settings: ACCESS_SECTIONS_PERMISION_VALUE | null;
}
export interface IAdminsUser extends IBaseEntity<string> {
  id: string;
  name: string;
  description: string;
  profile: IProfile;
  apiAccess: string;
}

export interface IAuditLogsRes {
  count: string | number;
  auditLogs: INetworkAuditLog[];
}

export interface INetworkAuditLog extends IBaseEntity<string> {
  reqBody: string;
  tenantId: string;
  userName: string;
  userEmail: string;
  reqType: string;
  reqUrl: string;
  userIP: string;
  respStatusCode: number;
  serviceName: string;
  timestamp: string;
}
