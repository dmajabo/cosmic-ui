import { RootState } from './RootState';

export type { RootState };

export interface EdgeBoxProps {
  readonly img: string;
  readonly title: string;
  readonly content: string;
  readonly onClick: () => void;
  isConnected: boolean;
}
