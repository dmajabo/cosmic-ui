export interface ITab<T> {
  id: T;
  index: number;
  label: string;
  disabled?: boolean;
}
