'use client'

export const catchAsync = (fn: any) =>
  function(...args : any[]) {
    return fn(...args).catch((err: any) => {
      console.error(err);
    });
  };
