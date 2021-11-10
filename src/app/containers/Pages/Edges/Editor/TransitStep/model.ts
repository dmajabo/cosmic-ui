import { IAwsRegion } from 'lib/api/ApiModels/Accounts/apiModel';

export interface Feature {
  readonly type: string;
  readonly id: string;
  readonly geometry: {
    readonly type: string;
    readonly name: string;
    readonly coordinates: [number, number];
  };
  readonly properties: {
    readonly title: string;
    readonly description: string;
    readonly region: IAwsRegion;
  };
}

export interface GeoJSON {
  readonly type: string;
  readonly features: Feature[];
}
