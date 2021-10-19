interface AwsRegion {
  readonly name: string;
  readonly code: string;
}

interface AwsPolicy {
  readonly username: string;
  readonly accessKey: string;
  readonly secret: string;
  readonly regions: string[];
}

interface MerakiPolicy {
  readonly apiKey: string;
}

export interface PolicyController {
  readonly name: string;
  readonly description?: string;
  readonly vendor: string;
  readonly awsPol?: AwsPolicy;
  readonly merakiPol?: MerakiPolicy;
}

export interface PostPolicyControllerRequest {
  readonly controller: PolicyController;
}

export interface PostPolicyControllerResponse {}

export interface GetAwsRegionsResponse {
  readonly awsRegions?: AwsRegion[];
}
