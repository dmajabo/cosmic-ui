import { IBaseEntity } from 'lib/models/general';

export enum GroupFilterItems {
  DestinationApplications = 'DestinationApplications',
  DestinationGateway = 'DestinationGateway',
  SourceGateway = 'SourceGateway',
}
export interface IGroupedFilteredItem extends IBaseEntity<GroupFilterItems> {
  items: IAutoCompliteItem[];
  label: string;
}
export interface IAutoCompliteItem extends IBaseEntity<string> {
  label: string;
  selected: boolean;
}

export const trendsfilteredData: IGroupedFilteredItem[] = [
  {
    id: GroupFilterItems.DestinationApplications,
    label: 'Applications',
    items: [
      { id: '1', label: 'The Destination Applications 1', selected: false },
      { id: '2', label: 'G Applications 2', selected: false },
      { id: '3', label: 'The Destination Applications 3', selected: false },
      { id: '4', label: 'G Applications 4', selected: false },
      { id: '5', label: 'The Destination Applications 5', selected: false },
    ],
  },
  {
    id: GroupFilterItems.DestinationGateway,
    label: 'Destination Gateway',
    items: [
      { id: '1', label: 'The Destination Gateway 1', selected: false },
      { id: '2', label: 'The Destination Gateway 2', selected: false },
      { id: '3', label: 'S Gateway 3', selected: false },
      { id: '4', label: 'S Gateway 4', selected: false },
      { id: '5', label: 'S Gateway 5', selected: false },
    ],
  },
  {
    id: GroupFilterItems.SourceGateway,
    label: 'Source Gateway',
    items: [
      { id: '1', label: 'The Source Gateway 1', selected: false },
      { id: '2', label: 'The Source Gateway 2', selected: false },
      { id: '3', label: 'AGateway 3', selected: false },
      { id: '4', label: 'SGateway 4', selected: false },
      { id: '5', label: 'SGateway 5', selected: false },
    ],
  },
];

export const instanceOfObject = <T = any>(object: any, uniqueField: string): object is T => {
  return uniqueField in object;
};
