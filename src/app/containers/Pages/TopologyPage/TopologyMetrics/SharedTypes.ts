interface Policy {
  readonly name: string;
  readonly description: string;
}

interface MerakiPol {
  readonly apiKey: string;
}

interface Controller {
  readonly policy: Policy;
  readonly vendor: string;
  readonly merakiPol: MerakiPol;
}

export interface GetTopologyRequest {
  readonly controller: Controller;
}

//TODO: Modify the interface
export interface GetTopologyResponse {}

export interface MetricsData {
  readonly time: string;
  readonly value: string;
}

interface KeyedMap {
  readonly key: string;
  readonly ts: MetricsData[];
}

interface Metrics {
  readonly resourceId: string;
  readonly keyedmap: KeyedMap[];
}

export interface GetMetricsResponse {
  readonly metrics: Metrics;
}

export interface MultiLineMetricsData {
  readonly name: string;
  readonly additionalTooltipItemValue?: string;
  readonly metrics: MetricsData[];
}
