export interface ISegmentComplete {
  step_1: boolean;
  step_2: boolean;
}

export const FORM_STEPS: string[] = ['step_1', 'step_2'];

export const DEFAULT_SEGMENTS_COLORS_SCHEMA: string[][] = [
  ['#EF9A9A', '#EF5350', '#F44336', '#D32F2F', '#C62828', '#B71C1C'],
  ['#F48FB1', '#EC407A', '#E91E63', '#C2185B', '#AD1457', '#880E4F'],
  ['#CE93D8', '#AB47BC', '#9C27B0', '#7B1FA2', '#6A1B9A', '#4A148C'],
  ['#B39DDB', '#7E57C2', '#673AB7', '#512DA8', '#283593', '#1A237E'],
  ['#9FA8DA', '#5C6BC0', '#3F51B5', '#303F9F', '#283593', '#1A237E'],
  ['#81D4FA', '#29B6F6', '#03A9F4', '#0288D1', '#0277BD', '#01579B'],
  ['#80DEEA', '#26C6DA', '#00BCD4', '#0097A7', '#00838F', '#006064'],
  ['#80CBC4', '#26A69A', '#009688', '#00796B', '#00695C', '#004D40'],
  ['#C5E1A5', '#9CCC65', '#8BC34A', '#689F38', '#558B2F', '#33691E'],
];
