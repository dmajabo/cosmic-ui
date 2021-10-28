import { RootState } from './RootState';

export type { RootState };

export interface EdgeBoxProps {
  readonly img: string;
  readonly title: string;
  readonly edgeName: string;
  readonly content?: string;
  readonly onConnect: () => void;
  readonly onUpdate: () => void;
  readonly isConnected: boolean;
}
