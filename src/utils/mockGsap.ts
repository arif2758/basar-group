/* eslint-disable @typescript-eslint/no-explicit-any */

const createChainableTimeline = () => {
  const tl: any = {
    to: () => tl,
    fromTo: () => tl,
    from: () => tl,
    set: () => tl,
    play: () => tl,
    reverse: () => tl,
    pause: () => tl,
    restart: () => tl,
    kill: () => {},
  };
  return tl;
};

export interface GsapInstance {
  to: (...args: any[]) => any;
  fromTo: (...args: any[]) => any;
  from: (...args: any[]) => any;
  set: (...args: any[]) => any;
  delayedCall: (...args: any[]) => any;
  registerPlugin: (...args: any[]) => any;
  utils: {
    toArray<T = any>(...args: any[]): T[];
  };
  timeline: (...args: any[]) => any;
}

export const gsap: GsapInstance = {
  to: () => createChainableTimeline(),
  fromTo: () => createChainableTimeline(),
  from: () => createChainableTimeline(),
  set: () => {},
  delayedCall: () => {},
  registerPlugin: () => {},
  utils: {
    toArray: <T = any>(...args: any[]): T[] => [] as T[],
  },
  timeline: () => createChainableTimeline(),
};

export namespace gsap {
  export namespace core {
    export type Tween = any;
    export type Timeline = any;
  }
}

export const useGSAP = (callback: (...args: any[]) => void, ...args: any[]) => {
  // GSAP animations replaced with native CSS
};

export const ScrollTrigger: any = {
  create: () => ({
    kill: () => {},
  }),
  getAll: () => [],
  refresh: () => {},
};

export const Observer: any = {};
