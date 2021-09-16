export interface IExpresionRow {
  expr: string;
  join: string | null;
  isValid: boolean;
  errorMessage: string;
}

export interface ISplitedReg {
  keyReg: RegExp;
  operatorReg: RegExp;
  valueReg: RegExp;
  joinReg: RegExp;
}
