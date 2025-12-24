export interface Point {
  x: number;
  y: number;
  lat: number;
  lon: number;
  isLand: boolean;
  utcOffset: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface TimeZoneInfo {
  offset: number;
  label: string;
}
