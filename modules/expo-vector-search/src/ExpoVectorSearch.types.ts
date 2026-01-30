export type Vector = Float32Array;

export type DistanceMetric = 'cos' | 'l2sq' | 'ip' | 'hamming' | 'jaccard';

export type SearchResult = {
  key: number;
  distance: number;
};
