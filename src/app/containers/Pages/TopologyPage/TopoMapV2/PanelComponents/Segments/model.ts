import { ISelectedListItem } from 'lib/models/general';
import { TopologyGroupTypesAsNumber, TopologyGroupTypesAsString, TopologyGroupTypesLabel } from 'lib/models/topology';

export enum ITopologyGroupFields {
  NAME = 'name',
  DESCRIPTION = 'description',
}

export enum TopologySegementView {
  EMPTY = 'empty',
  EDIT = 'edit',
  ALL = 'all',
}

export const SelectGroupTypes: ISelectedListItem<TopologyGroupTypesAsNumber>[] = [
  { id: TopologyGroupTypesAsString.BRANCH_NETWORKS, value: TopologyGroupTypesAsNumber.BRANCH_NETWORKS, label: TopologyGroupTypesLabel.BRANCH_NETWORKS },
  { id: TopologyGroupTypesAsString.APPLICATION, value: TopologyGroupTypesAsNumber.APPLICATION, label: TopologyGroupTypesLabel.APPLICATION },
];

export enum BrancheNetworksKeysEnum {
  Name = 'Name',
  Model = 'Model',
  Serial = 'Serial',
  Type = 'Type',
  NetworkId = 'NetworkId',
  PublicIp = 'PublicIp',
  Tag = 'Tag',
}

export const BranchNetworksPossibleKeys: ISelectedListItem<BrancheNetworksKeysEnum>[] = [
  { id: BrancheNetworksKeysEnum.Name, value: BrancheNetworksKeysEnum.Name, label: 'Name' },
  { id: BrancheNetworksKeysEnum.Model, value: BrancheNetworksKeysEnum.Model, label: 'Model' },
  { id: BrancheNetworksKeysEnum.Serial, value: BrancheNetworksKeysEnum.Serial, label: 'Serial' },
  { id: BrancheNetworksKeysEnum.Type, value: BrancheNetworksKeysEnum.Type, label: 'Type' },
  { id: BrancheNetworksKeysEnum.NetworkId, value: BrancheNetworksKeysEnum.NetworkId, label: 'Network' },
  { id: BrancheNetworksKeysEnum.PublicIp, value: BrancheNetworksKeysEnum.PublicIp, label: 'Ip' },
  { id: BrancheNetworksKeysEnum.Tag, value: BrancheNetworksKeysEnum.Tag, label: 'Tag' },
];

export enum ApplicationsKeysEnum {
  Name = 'Name',
  ExtId = 'ExtId',
  Tag = 'Tag',
}

export const ApplicationsPossibleKeys: ISelectedListItem<ApplicationsKeysEnum>[] = [
  { id: ApplicationsKeysEnum.Name, value: ApplicationsKeysEnum.Name, label: 'Name' },
  { id: ApplicationsKeysEnum.ExtId, value: ApplicationsKeysEnum.ExtId, label: 'External Identifier' },
  { id: ApplicationsKeysEnum.Tag, value: ApplicationsKeysEnum.Tag, label: 'Tag' },
];

export enum PossibleJoinsEnum {
  AND = '&&',
  OR = '||',
}

export const PossibleJoins: ISelectedListItem<string>[] = [
  { id: 'expresionAnd', value: PossibleJoinsEnum.AND, label: 'And' },
  { id: 'expresionOr', value: PossibleJoinsEnum.OR, label: 'Or' },
];

export enum PossibleOperatorsEnum {
  Equals = '==',
  Contains = '=~',
}

export const PossibleOperators: ISelectedListItem<string>[] = [
  { id: 'expresionEquals', value: PossibleOperatorsEnum.Equals, label: 'Equals' },
  { id: 'expresionContains', value: PossibleOperatorsEnum.Contains, label: 'Contains' },
];
