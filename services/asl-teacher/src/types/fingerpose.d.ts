declare module 'fingerpose' {
  export class GestureDescription {
    constructor(name: string);
    addCurl(finger: any, curl: any, contrib: number): void;
    addDirection(finger: any, direction: any, contrib: number): void;
  }
  export const Finger: {
    Thumb: number;
    Index: number;
    Middle: number;
    Ring: number;
    Pinky: number;
  };
  export const FingerCurl: {
    NoCurl: number;
    HalfCurl: number;
    FullCurl: number;
  };
  export const FingerDirection: {
    VerticalUp: number;
    VerticalDown: number;
    HorizontalLeft: number;
    HorizontalRight: number;
    DiagonalUpRight: number;
    DiagonalUpLeft: number;
    DiagonalDownRight: number;
    DiagonalDownLeft: number;
  };
}
