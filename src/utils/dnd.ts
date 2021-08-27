import React from 'react';

const THRESHOLD = 0.5;

export const isOverHalf = (e: React.DragEvent<HTMLElement>): boolean => {
  const { offsetTop, scrollHeight } = e.currentTarget;
  const overPercent = (e.clientY - offsetTop) / scrollHeight;

  return overPercent > THRESHOLD;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findById = (arr: any[], targetId: string): number => {
  return arr.findIndex(todo => todo.id === targetId);
};

export const mergeArray = <T>(
  arr: T[],
  from: number,
  to: number,
  newState: T = arr[from]
): T[] => {
  const front = arr.filter((_, idx) => {
    if (idx !== from && idx <= to) {
      return true;
    }
  });

  const back = arr.filter((_, idx) => {
    if (idx !== from && idx > to) {
      return true;
    }
  });

  return front.concat(newState, back);
};
