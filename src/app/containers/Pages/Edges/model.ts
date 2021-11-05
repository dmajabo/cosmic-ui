export interface IEdgeGroup {
  name: string;
  type: string;
}

export interface IEdgePolicy {
  source: string;
  destination: string;
  action: string;
}

export interface IEdgeModel {
  id?: string;
  name: string;
  price?: number;
  connection: string[];
  sites: IEdgeGroup;
  apps: IEdgeGroup;
  policies: IEdgePolicy[] | null;
}
