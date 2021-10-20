interface AwsRegion {
  readonly name: string;
  readonly code: string;
}

interface AwsFlowLog {
  readonly enable: boolean;
}

interface MerakiFlowLog {
  readonly enable_syslog: boolean;
}

interface AwsPolicy {
  readonly username: string;
  readonly accessKey: string;
  readonly secret: string;
  readonly regions: string[];
  readonly flowlog_pol: AwsFlowLog;
}

interface MerakiPolicy {
  readonly apiKey: string;
  readonly flowlog_pol: MerakiFlowLog;
}

export interface PolicyController {
  readonly id?: string;
  readonly name: string;
  readonly description?: string;
  readonly vendor: string;
  readonly awsPol?: AwsPolicy;
  readonly merakiPol?: MerakiPolicy;
}

export interface PostPolicyControllerRequest {
  readonly controller: PolicyController;
}

export interface GetControllerListResponse {
  readonly controllers: PolicyController[];
}

export interface PostPolicyControllerResponse {}

export interface DeletePolicyControllerResponse {
  readonly id?: string;
}

export interface GetAwsRegionsResponse {
  readonly awsRegions: AwsRegion[];
}
